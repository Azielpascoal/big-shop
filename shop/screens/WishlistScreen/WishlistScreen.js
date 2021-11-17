import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Wishlist } from '../../components';
import { setWishlist } from '../../redux/';
import AppConfig from '../../ShopertinoConfig';

class WishlistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductDetailVisible: false,
      product: {},
    };
    this.appConfig = props.route.params.appConfig;
  }

  onAddToBag = () => {
    this.setState({ isProductDetailVisible: false });
  };

  onCardPress = (item) => {
    this.setState({
      product: item,
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  onModalCancel = () => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
    });
  };

  render() {
    return (
      <Wishlist
        data={this.props.wishlist}
        shippingMethods={this.props.shippingMethods}
        onCardPress={this.onCardPress}
        product={this.state.product}
        onAddToBag={this.onAddToBag}
        onModalCancel={this.onModalCancel}
        wishlist={this.props.wishlist}
        user={this.props.user}
        isProductDetailVisible={this.state.isProductDetailVisible}
        appConfig={this.appConfig}
        navigation={this.props.navigation}
      />
    );
  }
}

WishlistScreen.propTypes = {
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
  setWishlist: PropTypes.func,
};

const mapStateToProps = ({ products, app, checkout }) => {
  return {
    user: app.user,
    wishlist: products.wishlist,
    shippingMethods: checkout.shippingMethods,
    stripeCustomer: app.stripeCustomer,
  };
};

export default connect(mapStateToProps, {
  setWishlist,
})(WishlistScreen);
