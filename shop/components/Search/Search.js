import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ProductGrid from '../ProductGrid/ProductGrid';
import ProductDetailModal from '../Modals/ProductDetailModal/ProductDetailModal';
import { TNEmptyStateView } from '../../Core/truly-native';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import styles from './styles';
import AppStyles from '../../AppStyles';

function Search(props) {
  const {
    navigation,
    extraData,
    products,
    onModalCancel,
    onAddToBag,
    onCardPress,
    onFavouritePress,
    wishlist,
    user,
    product,
    shippingMethods,
    isProductDetailVisible,
    appConfig,
  } = props;

  const route = useRoute();

  const emptyStateConfig = {
    title: IMLocalized('No Products'),
    description: IMLocalized(
      'There are no Products for this search result, please try again',
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
        appConfig={appConfig}
        products={products}
        onCardPress={onCardPress}
        itemContainerStyle={{ alignItems: 'center' }}
        extraData={extraData}
        ListEmptyComponent={renderEmptyList()}
      />
      <ProductDetailModal
        onFavouritePress={onFavouritePress}
        item={product}
        wishlist={wishlist}
        user={user}
        shippingMethods={shippingMethods}
        visible={isProductDetailVisible}
        onAddToBag={onAddToBag}
        onCancelPress={onModalCancel}
        appConfig={appConfig}
        navigation={navigation}
        orderAPIManager={route.params.orderAPIManager}
      />
    </View>
  );
}

Search.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
  SearchScreen: PropTypes.array,
  navigation: PropTypes.func,
  extraData: PropTypes.object,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  onModalCancel: PropTypes.func,
  onAddToBag: PropTypes.func,
  onCardPress: PropTypes.func,
  onFavouritePress: PropTypes.func,
  product: PropTypes.func,
  isProductDetailVisible: PropTypes.bool,
};

export default Search;
