import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Search } from '../../components';
import SearchBar from 'react-native-search-box';
import { setWishlist, searchByKeyText } from '../../redux/';
import AppConfig from '../../ShopertinoConfig';
import { View } from 'react-native';
import styles from './styles';
import { Appearance } from 'react-native-appearance';
import AppStyles from '../../AppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.colorSet[colorScheme];
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.searchBarContainer}>
          <SearchBar
            backgroundColor={'transparent'}
            cancelTitle={IMLocalized('Cancel')}
            onChangeText={(text) => {
              props.searchByKeyText(text);
            }}
            cancelButtonTextStyle={[
              styles.cancelButtonText,
              {
                color: currentTheme.mainSubtextColor,
              },
            ]}
            onCancel={(text) => {
              props.searchByKeyText('');
            }}
            inputBorderRadius={9}
            inputStyle={styles.searchInput}
          />
        </View>
      ),
    });
    this.state = {
      isProductDetailVisible: false,
      product: {},
    };
    this.appConfig = props.route.params.appConfig;
  }

  onCardPress = (item) => {
    this.setState({
      product: item,
      isProductDetailVisible: !this.state.isProductDetailVisible,
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

  render() {
    return (
      <Search
        products={this.props.searchResultProducts}
        shippingMethods={this.props.shippingMethods}
        onModalCancel={this.onModalCancel}
        onAddToBag={this.onAddToBag}
        onCardPress={this.onCardPress}
        wishlist={this.props.wishlist}
        user={this.props.user}
        product={this.state.product}
        isProductDetailVisible={this.state.isProductDetailVisible}
        appConfig={this.appConfig}
        navigation={this.props.navigation}
      />
    );
  }
}

SearchScreen.propTypes = {
  navigation: PropTypes.object,
  searchResultProducts: PropTypes.array,
  shippingMethods: PropTypes.array,
  wishlist: PropTypes.array,
  user: PropTypes.object,
  setWishlist: PropTypes.func,
};

const mapStateToProps = ({ products, checkout, app }) => {
  return {
    searchResultProducts: products.searchResultProducts,
    shippingMethods: checkout.shippingMethods,
    user: app.user,
    stripeCustomer: app.stripeCustomer,
    wishlist: products.wishlist,
  };
};

export default connect(mapStateToProps, {
  setWishlist,
  searchByKeyText,
})(SearchScreen);
