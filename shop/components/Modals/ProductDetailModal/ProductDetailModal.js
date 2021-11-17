import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Share,
  Platform,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Loading from 'react-native-loader-overlay';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import stripe from 'tipsi-stripe';
import { useColorScheme } from 'react-native-appearance';
import Header from './Header';
import ProductOptions from './ProductOptions';
import Favourite from './Favourite';
import FooterButton from '../../FooterButton/FooterButton';
import AppStyles from '../../../AppStyles';
import DataAPIManager from '../../../apis/DataAPIManager';
import deviceStorage from '../../../utils/deviceStorage';
import { updatePricesByQty } from '../../../utils/updatePricesByQty';
import AppConfig from '../../../ShopertinoConfig';
import {
  resetCheckout,
  logout,
  setWishlist,
  updateShoppingBag,
  setProductPricesAndQty,
} from '../../../redux/';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import PaymentRequestAPI from '../../../Core/payment/api';
import dynamicStyles from './styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function ProductDetailModal(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const {
    visible,
    onCancelPress,
    item,
    onAddToBag,
    appConfig,
    setWishlist,
    wishlist,
    user,
  } = props;

  const [selectedItem, setSelectedItem] = useState(item);

  const loading = useRef('');
  const paymentRequestAPI = useRef(new PaymentRequestAPI(appConfig));
  const dataAPIManager = useRef(new DataAPIManager(appConfig));

  useEffect(() => {
    dataAPIManager.current?.setWishlist(user, wishlist);
  }, [wishlist]);

  useEffect(() => {
    console.log('item', item);
    setSelectedItem(item);
  }, [item]);

  const onModalShow = () => {
    const favouritedItems = wishlist.find(
      (wishlistItem) => wishlistItem.id === selectedItem.id,
    );

    if (favouritedItems) {
      selectedItem.isFavourite = true;
      setSelectedItem(favouritedItems);
    }
  };

  const onAttributesSelected = (selectedAttributes) => {
    selectedItem.selectedAttributes = selectedAttributes;
  };

  const onSizeSelected = (index) => {
    selectedItem.selectedSizeIndex = index;
  };

  const onColorSelected = (index) => {
    selectedItem.selectedColorIndex = index;
  };

  const onShare = async () => {
    try {
      await Share.share({
        title: IMLocalized('Shopertino Product'),
        dialogTitle: IMLocalized(`Shopertino Product: ${selectedItem.name}`),
        message: selectedItem.description,
        url: selectedItem.photo,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onFavouritePress = async (item) => {
    item.isFavourite = !item.isFavourite;
    setWishlist(item);
  };

  const addProductToBag = (productItem) => {
    const indexToUpdate = props.shoppingBag.findIndex((shoppingBagProduct) => {
      return shoppingBagProduct.id === productItem.id;
    });

    if (indexToUpdate !== -1) {
      productItem.quantity += 1;
    } else {
      productItem.quantity = 1;
    }

    const newProductPriceByQty = {
      id: productItem.id,
      qty: productItem.quantity,
      totalPrice: Number(productItem.price * productItem.quantity),
    };

    updatePricesByQty(
      newProductPriceByQty,
      props.productPricesByQty,
      (pricesByQty) => {
        props.updateShoppingBag(productItem);
        props.setProductPricesAndQty(pricesByQty);
        onAddToBag(productItem);
      },
    );
  };

  const onLogoutAccepted = async () => {
    await deviceStorage.logoutDeviceStorage();
    dataAPIManager.current.logout && dataAPIManager.current.logout();
    await onCancelPress();
    await props.logout();
    props.navigation.navigate('LoginStack', {
      title: IMLocalized('LoginStack'),
      appConfig: AppConfig,
    });
  };

  const onPay = async () => {
    if (!props.stripeCustomer) {
      Alert.alert(
        IMLocalized('Oops! We are unable to continue this order.'),
        IMLocalized(
          'An unknown error occured and ur account will be logged out. Afterwards, Kindly login and try again.',
        ),
        [
          {
            text: 'Ok',
            onPress: () => onLogoutAccepted(),
          },
        ],
        { cancelable: true },
      );

      return;
    }

    loading.current = Loading.show(AppStyles.loadingModal);
    const items = [
      {
        label: IMLocalized('Shopertino, Inc'),
        amount: `${selectedItem.price}`,
      },
    ];
    const options = {
      requiredBillingAddressFields: ['all'],
      billing_address_required: true,
      total_price: `${selectedItem.price}`,
      currency_code: 'USD',
      shipping_countries: ['US', 'CA'], //android
      line_items: [
        {
          currency_code: 'USD',
          description: IMLocalized('Pay Shopertino, Inc'),
          unit_price: `${selectedItem.price}`,
          total_price: `${selectedItem.price}`,
          quantity: '1',
        },
      ],
      shippingMethods: [...props.shippingMethods],
    };

    try {
      const token = await stripe.paymentRequestWithNativePay(options, items);
      if (token) {
        const source = await paymentRequestAPI.current.addNewPaymentSource(
          props.stripeCustomer,
          token.tokenId,
        );

        const orderAPIManager = new props.orderAPIManager(
          props,
          AppConfig,
          loading.current,
          [selectedItem],
          selectedItem.price,
        );
        await orderAPIManager.startOrder(source.data.response.id);
        stripe.completeNativePayRequest();
      }
    } catch (error) {
      Loading.hide(loading.current);
      stripe.cancelNativePayRequest();
      console.log('native pay error', error);
    }
  };

  return (
    <Modal
      isVisible={visible}
      onModalShow={onModalShow}
      hideModalContentWhileAnimating={true}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      style={styles.modalStyle}
      backdropOpacity={0.5}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}>
      <View style={styles.transparentContainer}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="dark-content" />
        <View style={styles.viewContainer}>
          {selectedItem.details && (
            <Swiper
              loop={false}
              activeDot={<View style={styles.activeDot} />}
              containerStyle={styles.swiperContainer}>
              {selectedItem.details.map((image, index) => (
                <View key={index + ''} style={styles.imageBackgroundContainer}>
                  <Image
                    style={styles.imageBackground}
                    source={{ uri: image }}
                  />
                </View>
              ))}
            </Swiper>
          )}
          <Header
            onCancelPress={onCancelPress}
            headerContainerStyle={styles.headerContainerStyle}
            onSharePress={onShare}
          />
          <ProductOptions
            item={selectedItem}
            onSizeSelected={onSizeSelected}
            onColorSelected={onColorSelected}
            optionContainerStyle={styles.optionContainerStyle}
          />
          <Favourite
            onPress={() => onFavouritePress(selectedItem)}
            isFavourite={selectedItem.isFavourite}
            favouriteContainerStyle={styles.favouriteContainerStyle}
          />
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>{selectedItem.name}</Text>
            <Text
              style={
                styles.price
              }>{`${appConfig.currency}${selectedItem.price}`}</Text>
            <View style={styles.borderLine} />
          </View>
          <View style={styles.footerContainer}>
            <FooterButton
              onPress={() => addProductToBag(selectedItem)}
              footerContainerStyle={styles.addToBagContainerStyle}
              footerTitleStyle={{
                color: 'white',
                fontFamily: AppStyles.fontFamily.regularFont,
              }}
              title={IMLocalized('ADD TO BAG')}
            />
            <View style={styles.buttonSpace} />
            <FooterButton
              onPress={onPay}
              footerContainerStyle={styles.payContainerStyle}
              footerTitleStyle={{
                color: AppStyles.colorSet[colorScheme].mainTextColor,
                fontFamily: AppStyles.fontFamily.regularFont,
              }}
              iconSource={
                Platform.OS === 'ios'
                  ? AppStyles.iconSet.appleFilled
                  : AppStyles.imageSet.googlePayColored
              }
              iconStyle={styles.footerIconStyle}
              title={IMLocalized('Pay')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

ProductDetailModal.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object,
  visible: PropTypes.bool,
  onCancelPress: PropTypes.func,
  onFavouritePress: PropTypes.func,
  onAddToBag: PropTypes.func,
  shippingMethods: PropTypes.array,
};

const mapStateToProps = ({ checkout, products, app }) => {
  return {
    totalPrice: checkout.totalPrice,
    selectedShippingMethod: checkout.selectedShippingMethod,
    shippingMethods: checkout.shippingMethods,
    cardNumbersEnding: checkout.cardNumbersEnding,
    selectedPaymentMethod: checkout.selectedPaymentMethod,
    currentOrderId: checkout.currentOrderId,
    shoppingBag: products.shoppingBag,
    orderHistory: products.orderHistory,
    productPricesByQty: products.productPricesByQty,
    stripeCustomer: app.stripeCustomer,
  };
};

export default connect(mapStateToProps, {
  resetCheckout,
  logout,
  setWishlist,
  updateShoppingBag,
  setProductPricesAndQty,
})(ProductDetailModal);
