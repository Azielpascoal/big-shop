import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Order } from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import {
  loadOrderHistory,
  updateShoppingBag,
  setSubtotalPrice,
  setSelectedShippingMethod,
  setSelectedPaymentMethod,
  setCurrentOrderId,
  setProductPricesAndQty,
} from '../../redux/';
import { updatePricesByQty } from '../../utils/updatePricesByQty';
import AppConfig from '../../ShopertinoConfig';

class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.appConfig = props.route.params.appConfig;
    this.dataAPIManager = new DataAPIManager(this.appConfig);
  }

  componentDidMount() {
    this.loadOrder();
  }

  componentWillUnmount() {
    this.dataAPIManager.unsubscribe && this.dataAPIManager.unsubscribe();
  }

  loadOrder = () => {
    this.setState({ isLoading: true });
    this.dataAPIManager.loadOrder(this.props.user, (data) => {
      data && this.setOrderHistory(data);
      this.setState({ isLoading: false });
    });
  };

  setOrderHistory = (orders) => {
    this.props.loadOrderHistory(orders);
    this.setState({ isLoading: false });
  };

  onReOrder = (order) => {
    const { navigation } = this.props;

    this.addToShoppingBag(order.shopertino_products);
    this.props.setSubtotalPrice(order.totalPrice);
    this.props.setCurrentOrderId(order.id);

    this.props.setSelectedShippingMethod(order.selectedShippingMethod);
    this.props.setSelectedPaymentMethod(order.selectedPaymentMethod);

    navigation.navigate('Bag', { appConfig: this.appConfig });
  };

  addToShoppingBag = (products) => {
    products.forEach((product) => {
      const newProductPriceByQty = {
        id: product.id,
        qty: product.quantity,
        totalPrice: Number(product.price * product.quantity),
      };

      updatePricesByQty(
        newProductPriceByQty,
        this.props.productPricesByQty,
        (pricesByQty) => {
          this.props.setProductPricesAndQty(pricesByQty);
          this.props.updateShoppingBag(product);
        },
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Order
          isLoading={this.state.isLoading}
          orderHistory={this.props.orderHistory}
          navigation={this.props.navigation}
          onReOrder={this.onReOrder}
          appConfig={this.appConfig}
        />
      </View>
    );
  }
}

OrdersScreen.propTypes = {
  navigation: PropTypes.object,
  orderHistory: PropTypes.array,
  user: PropTypes.object,
  loadOrderHistory: PropTypes.func,
  setSubtotalPrice: PropTypes.func,
  setSelectedShippingMethod: PropTypes.func,
  setSelectedPaymentMethod: PropTypes.func,
  setCurrentOrderId: PropTypes.func,
};

const mapStateToProps = ({ products, app }) => {
  return {
    categories: products.categories,
    allProducts: products.allProducts,
    orderHistory: products.orderHistory,
    user: app.user,
    productPricesByQty: products.productPricesByQty,
  };
};

export default connect(mapStateToProps, {
  loadOrderHistory,
  updateShoppingBag,
  setSubtotalPrice,
  setSelectedShippingMethod,
  setSelectedPaymentMethod,
  setCurrentOrderId,
  setProductPricesAndQty,
})(OrdersScreen);
