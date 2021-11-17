import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Home, ShoppingBagButton, MenuButton } from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import {
  setUserData,
  setCategories,
  setWishlist,
  setShippingAddress,
  setProducts,
  loadOrderHistory,
} from '../../redux';
//import { setCategories } from '../../redux/reducers/products';
import AppConfig from '../../ShopertinoConfig';
import { Appearance } from 'react-native-appearance';
import AppStyles from '../../AppStyles';
import { StatusBar } from 'react-native';
import { IMLocalized } from '../../Core/localization/IMLocalization';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldUpdate: false,
      isProductDetailVisible: false,
      product: {},
    };
    this.appConfig = props.route.params.appConfig;
    this.dataAPIManager = new DataAPIManager(AppConfig);
  }

  componentDidMount() {
    this.loadData();
    this.setShippingAddress();
  }

  componentDidUpdate() {
    if (this.state.shouldUpdate === false && this.props.allProducts.length) {
      this.setState({
        shouldUpdate: true,
      });
    }
  }

  componentWillUnmount() {
    this.dataAPIManager.unsubscribe && this.dataAPIManager.unsubscribe();
  }

  loadData = async () => {
    this.dataAPIManager.loadShopData(({ products, categories }) => {
      if (products) {
        this.loadProducts(products);
      }

      if (categories) {
        this.loadCategories(categories);
      }
    });

    this.dataAPIManager.setWishlistState(this.props);
  };

  updateUserData = async (updatedUser) => {
    if (updatedUser.success) {
      await this.props.setUserData({
        user: {
          ...updatedUser.data,
          stripeCustomer: this.props.stripeCustomer,
        },
      });
    }
  };

  setShippingAddress = () => {
    if (this.props.user.shippingAddress) {
      this.props.setShippingAddress(this.props.user.shippingAddress);
    } else if (this.props.user.shipping) {
      this.props.setShippingAddress(this.props.user.shipping);
    }
  };

  onCardPress = (item) => {
    this.setState({
      product: item,
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  onCategoryPress = (item) => {
    this.props.navigation.navigate('CategoryProductGrid', {
      title: item.name,
      categoryId: item.id,
      products: item.products,
      appConfig: this.appConfig,
    });
  };

  onAddToBag = () => {
    this.setState({ isProductDetailVisible: false });
  };

  onModalCancel = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  loadProducts = (products) => {
    this.props.setProducts(products);
  };

  loadCategories = (categories) => {
    this.props.setCategories(categories);
    console.log('---------------->', categories);
  };

  render() {
    return (
      <Home
        categories={this.props.categories}
        newArrivals={this.props.allProducts}
        featured={this.props.allProducts}
        bestSellers={this.props.allProducts}
        navigation={this.props.navigation}
        shippingMethods={this.props.shippingMethods}
        onCardPress={this.onCardPress}
        wishlist={this.props.wishlist}
        user={this.props.user}
        onCategoryPress={this.onCategoryPress}
        onAddToBag={this.onAddToBag}
        product={this.state.product}
        isProductDetailVisible={this.state.isProductDetailVisible}
        onModalCancelPress={this.onModalCancel}
        appConfig={this.appConfig}
      />
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
  allProducts: PropTypes.array,
  shippingMethods: PropTypes.array,
  user: PropTypes.object,
  stripeCustomer: PropTypes.string,
  wishlist: PropTypes.array,
  setUserData: PropTypes.func,
  setCategories: PropTypes.func,
  setWishlist: PropTypes.func,
  setShippingAddress: PropTypes.func,
  setProducts: PropTypes.func,
};

const mapStateToProps = ({ products, checkout, app }) => {
  return {
    categories: products.categories,
    allProducts: products.allProducts,
    shippingMethods: checkout.shippingMethods,
    user: app.user,
    stripeCustomer: app.stripeCustomer,
    wishlist: products.wishlist,
  };
};

export default connect(mapStateToProps, {
  setUserData,
  setCategories,
  setWishlist,
  setShippingAddress,
  setProducts,
  loadOrderHistory,
})(HomeScreen);
