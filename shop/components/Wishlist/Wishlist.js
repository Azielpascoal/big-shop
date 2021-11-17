import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import ProductGrid from '../ProductGrid/ProductGrid';
import ProductDetailModal from '../Modals/ProductDetailModal/ProductDetailModal';
import { TNEmptyStateView } from '../../Core/truly-native';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import styles from './styles';
import AppStyles from '../../AppStyles';

function Wishlist(props) {
  const {
    navigation,
    extraData,
    data,
    onCardPress,
    product,
    onAddToBag,
    onModalCancel,
    onFavouritePress,
    wishlist,
    user,
    shippingMethods,
    isProductDetailVisible,
    appConfig,
  } = props;

  const route = useRoute();

  const emptyStateConfig = {
    title: IMLocalized('Empty Wishlist'),
    description: IMLocalized(
      'Your wishlist is empty. Favourite a product from anywhere and see it appear here.',
    ),
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView
          appStyles={AppStyles}
          emptyStateConfig={emptyStateConfig}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ProductGrid
        products={data}
        onCardPress={onCardPress}
        itemContainerStyle={{ alignItems: 'center' }}
        extraData={extraData}
        appConfig={appConfig}
        ListEmptyComponent={renderEmptyList()}
      />
      <ProductDetailModal
        item={product}
        shippingMethods={shippingMethods}
        visible={isProductDetailVisible}
        onFavouritePress={onFavouritePress}
        wishlist={wishlist}
        user={user}
        onAddToBag={onAddToBag}
        onCancelPress={onModalCancel}
        appConfig={appConfig}
        navigation={navigation}
        orderAPIManager={route.params.orderAPIManager}
      />
    </View>
  );
}

Wishlist.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  navigation: PropTypes.func,
  extraData: PropTypes.object,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  onCardPress: PropTypes.func,
  product: PropTypes.object,
  onAddToBag: PropTypes.func,
  onModalCancel: PropTypes.func,
  onFavouritePress: PropTypes.func,
  isProductDetailVisible: PropTypes.bool,
};

export default Wishlist;
