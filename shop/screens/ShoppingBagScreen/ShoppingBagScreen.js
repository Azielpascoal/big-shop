import React, { Component } from 'react';
import { Alert, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ShoppingBag } from '../../components';
import { updatePricesByQty } from '../../utils/updatePricesByQty';
import AppStyles from '../../AppStyles';
import {
  setProductPricesAndQty,
  removeFromShoppingBag,
  removeProductPricesBYQty,
  updateShoppingBag,
  setSubtotalPrice,
  setWishlist,
  logout,
} from '../../redux/';
import DataAPIManager from '../../apis/DataAPIManager';
import deviceStorage from '../../utils/deviceStorage';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';

class ShoppingBagScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    props.navigation.setOptions({
      title: IMLocalized('Shopping Bag'),
      headerTintColor: currentTheme.fontColor,
      headerBackTitle: IMLocalized('Shop'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
    });
    this.appConfig = props.route.params.appConfig;
    this.dataAPIManager = new DataAPIManager(this.appConfig);
  }

  onQtyChange = (newProductPriceByQty, product) => {
    updatePricesByQty(
      newProductPriceByQty,
      this.props.productPricesByQty,
      (pricesByQty) => {
        this.props.setProductPricesAndQty(pricesByQty);

        product.quantity = newProductPriceByQty.qty;

        this.props.updateShoppingBag(product);
      },
    );
  };

  onLongPress = (item) => {
    Alert.alert(
      IMLocalized('Remove from cart'),
      IMLocalized('This product will be removed from cart.'),
      [
        {
          text: IMLocalized('Remove'),
          onPress: () => this.removeFromShoppingBag(item),
          style: 'destructive',
        },
        {
          text: IMLocalized('Cancel'),
        },
      ],
      { cancelable: true },
    );
  };

  removeFromShoppingBag = (item) => {
    this.props.removeProductPricesBYQty(item.id);
    this.props.removeFromShoppingBag(item);
  };

  onColorSelected = ({ item, index }) => {
    item.selectedColorIndex = index;

    this.props.updateShoppingBag(item);
  };

  onSizeSelected = ({ item, index }) => {
    item.selectedSizeIndex = index;
    this.props.updateShoppingBag(item);
  };

  onAttributesSelected = (item, selectedAttributes) => {
    item.selectedAttributes = selectedAttributes;
    this.props.updateShoppingBag(item);
  };

  onContinuePress = async () => {
    this.dataAPIManager.onShoppingBagContinuePress(
      this.props,
      this.appConfig,
      this.onLogoutAccepted,
    );
  };

  onLogoutAccepted = async () => {
    await deviceStorage.logoutDeviceStorage();
    this.dataAPIManager?.logout();
    this.props.logout();
    this.props.navigation.navigate('LoginStack', {
      title: IMLocalized('LoginStack'),
      appConfig: this.appConfig,
    });
  };

  render() {
    return (
      <ShoppingBag
        shoppingBag={this.props.shoppingBag}
        productPricesByQty={this.props.productPricesByQty}
        totalShoppinBagPrice={this.props.totalShoppinBagPrice}
        removeFromShoppingBag={this.removeFromShoppingBag}
        onContinuePress={this.onContinuePress}
        onColorSelected={this.onColorSelected}
        onSizeSelected={this.onSizeSelected}
        onQtyChange={this.onQtyChange}
        onAttributesSelected={this.onAttributesSelected}
        onLongPress={this.onLongPress}
        appConfig={this.appConfig}
      />
    );
  }
}

ShoppingBagScreen.propTypes = {
  navigation: PropTypes.object,
  shoppingBag: PropTypes.array,
  productPricesByQty: PropTypes.array,
  totalShoppinBagPrice: PropTypes.number,
  setProductPricesAndQty: PropTypes.func,
  removeFromShoppingBag: PropTypes.func,
  removeProductPricesBYQty: PropTypes.func,
  updateShoppingBag: PropTypes.func,
  setSubtotalPrice: PropTypes.func,
};

const mapStateToProps = ({ products, app }) => {
  return {
    shoppingBag: products.shoppingBag,
    productPricesByQty: products.productPricesByQty,
    totalShoppinBagPrice: products.totalShoppinBagPrice,
    stripeCustomer: app.stripeCustomer,
  };
};

export default connect(mapStateToProps, {
  setProductPricesAndQty,
  removeFromShoppingBag,
  removeProductPricesBYQty,
  updateShoppingBag,
  setSubtotalPrice,
  setWishlist,
  logout,
})(ShoppingBagScreen);
