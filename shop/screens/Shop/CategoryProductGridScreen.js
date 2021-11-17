import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { ProductGrid, ProductDetailModal } from '../../components';
import styles from './styles';
import AppStyles from '../../AppStyles';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../Core/truly-native';

class CategoryProductGridScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route } = props;
    props.navigation.setOptions({
      headerBackTitle: IMLocalized('Shop'),
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? IMLocalized('Cartegory Grid')
          : route.params.title,
      headerTintColor: currentTheme.fontColor,

      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
    });
    this.state = {
      isProductDetailVisible: false,
      product: {},
      categoryProducts: [],
    };

    this.appConfig = props.route.params.appConfig;
    this.categoryProducts = route.params.products;
    this.categoryId = route.params.categoryId;
    this.emptyStateConfig = {
      title: IMLocalized('Empty Category'),
      description: IMLocalized(
        'There are no products for this category. Please check back later',
      ),
      buttonName: IMLocalized('Go back'),
      onPress: () => this.props.navigation.goBack(),
    };
  }

  componentDidMount() {
    if (this.categoryProducts && this.categoryProducts.length) {
      this.setState({ categoryProducts: this.categoryProducts });
    } else {
      this.getCategoryProducts(this.categoryId);
    }
  }

  getCategoryProducts = (categoryId) => {
    const categoryProducts = this.props.allProducts.filter((product) => {
      if (product.categories && typeof product.categories === 'object') {
        return product.categories.find((id) => {
          return id === categoryId;
        });
      }
    });

    this.setState({ categoryProducts });
  };

  onCardPress = (item) => {
    this.setState({
      isProductDetailVisible: !this.state.isProductDetailVisible,
      product: item,
    });
  };

  onAddToBag = () => {
    this.setState({ isProductDetailVisible: false });
  };

  renderEmptyList = () => {
    return (
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView
          appStyles={AppStyles}
          emptyStateConfig={this.emptyStateConfig}
        />
      </View>
    );
  };

  render() {
    const { extraData } = this.props;

    return (
      <View style={styles.container}>
        <ProductGrid
          products={this.state.categoryProducts}
          onCardPress={this.onCardPress}
          itemContainerStyle={{ alignItems: 'center' }}
          extraData={extraData}
          appConfig={this.appConfig}
          ListEmptyComponent={this.renderEmptyList()}
        />
        <ProductDetailModal
          shippingMethods={this.props.shippingMethods}
          item={this.state.product}
          visible={this.state.isProductDetailVisible}
          wishlist={this.props.wishlist}
          user={this.props.user}
          onAddToBag={this.onAddToBag}
          onCancelPress={() =>
            this.setState({
              isProductDetailVisible: !this.state.isProductDetailVisible,
            })
          }
          appConfig={this.appConfig}
          navigation={this.props.navigation}
          orderAPIManager={this.props.route.params.orderAPIManager}
        />
      </View>
    );
  }
}

CategoryProductGridScreen.propTypes = {
  title: PropTypes.string,
  CategoryProductGridScreen: PropTypes.array,
  navigation: PropTypes.object,
  extraData: PropTypes.object,
  allProducts: PropTypes.array,
  user: PropTypes.object,
  wishlist: PropTypes.array,
  shippingMethods: PropTypes.array,
};

const mapStateToProps = ({ products, app, checkout }) => {
  return {
    allProducts: products.allProducts,
    user: app.user,
    wishlist: products.wishlist,
    shippingMethods: checkout.shippingMethods,
  };
};

export default connect(mapStateToProps)(CategoryProductGridScreen);
