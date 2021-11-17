import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Shop } from '../../components';

class ShopScreen extends Component {
  constructor(props) {
    super(props);
    this.appConfig = props.route.params.appConfig;
  }

  render() {
    return (
      <Shop
        categories={this.props.categories}
        navigation={this.props.navigation}
        appConfig={this.appConfig}
      />
    );
  }
}

ShopScreen.propTypes = {
  navigation: PropTypes.object,
  categories: PropTypes.array,
};

const mapStateToProps = ({ products }) => {
  return {
    categories: products.categories,
  };
};

export default connect(mapStateToProps)(ShopScreen);
