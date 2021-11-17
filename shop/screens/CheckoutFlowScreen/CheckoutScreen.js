import React, { Component } from 'react';
import { View, Platform, StatusBar, AppState } from 'react-native';
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe';
import Loading from 'react-native-loader-overlay';
import PropTypes from 'prop-types';
import { Header, CheckOutDetails, FooterButton } from '../../components';
import { resetCheckout } from '../../redux';
import AppStyles from '../../AppStyles';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route, navigation } = props;
    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
      headerBackTitle: IMLocalized('Shopping Bag'),
      headerTintColor: currentTheme.fontColor,
    });
    this.state = {
      appState: AppState.currentState,
      isNativePayPossible: false,
    };
    this.appConfig = route.params.appConfig;
    this.orderAPIManager = new route.params.orderAPIManager(
      props,
      this.appConfig,
    );
    this.isStripeCheckoutEnabled = !this.appConfig.isStripeCheckoutEnabled;
  }

  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    const isDeviceSupported = await stripe.deviceSupportsNativePay();

    if (isDeviceSupported) {
      this.setState({
        isNativePayPossible: true,
      });
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.orderAPIManager.handleAppStateChange &&
        this.orderAPIManager.handleAppStateChange();
    }
    this.setState({ appState: nextAppState });
  };

  onFooterPress = async () => {
    this.loading = Loading.show(AppStyles.loadingModal);
    const { selectedPaymentMethod, shippingMethods } = this.props;
    const items = [
      {
        label: 'Shopertino, Inc',
        amount: `${this.props.totalPrice}`,
      },
    ];
    const options = {
      requiredBillingAddressFields: ['all'],
      billing_address_required: true,
      total_price: `${this.props.totalPrice}`,
      currency_code: 'USD',
      shipping_countries: ['US', 'CA'], //android
      line_items: [
        {
          currency_code: 'USD',
          description: 'Pay Shopertino, Inc',
          unit_price: `${this.props.totalPrice}`,
          total_price: `${this.props.totalPrice}`,
          // total_price: "0.1",
          // unit_price: `0.1`,
          quantity: '1',
        },
      ],
      shippingMethods,
    };

    await this.orderAPIManager.startCheckout(
      selectedPaymentMethod,
      items,
      options,
      this.loading,
    );
  };

  render() {
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.colorSet[colorScheme];
    const { selectedPaymentMethod } = this.props;
    const canNativePay =
      selectedPaymentMethod.isNativePaymentMethod &&
      this.state.isNativePayPossible;
    const altFooterButtonTitle = this.isStripeCheckoutEnabled
      ? 'Countinue checkout'
      : 'Place Order';
    const paymentNotPossibleTitle = this.isStripeCheckoutEnabled
      ? 'Countinue checkout'
      : "Can't accept payment method";
    const footerButtonTitle = canNativePay
      ? altFooterButtonTitle
      : paymentNotPossibleTitle;

    return (
      <View style={{ flex: 1, backgroundColor: currentTheme.backgroundColor }}>
        <Header
          headerContainerStyle={{ borderBottomWidth: 0 }}
          headerStyle={{ fontFamily: AppStyles.fontFamily.boldFont }}
          title={'Checkout'}
        />
        <CheckOutDetails
          appConfig={this.appConfig}
          totalPrice={this.props.totalPrice}
          selectedShippingMethod={this.props.selectedShippingMethod}
          title={'Shipping Adress'}
          cardNumbersEnding={this.props.cardNumbersEnding}
          isShippinngAddress={true}
          selectedPaymentMethod={this.props.selectedPaymentMethod}
          isStripeCheckoutEnabled={this.isStripeCheckoutEnabled}
        />
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <FooterButton
            disabled={
              selectedPaymentMethod.isNativePaymentMethod
                ? !canNativePay
                : false
            }
            footerContainerStyle={{
              backgroundColor: currentTheme.mainThemeForegroundColor,
            }}
            footerTitleStyle={{ color: 'white' }}
            onPress={this.onFooterPress}
            title={
              selectedPaymentMethod.isNativePaymentMethod
                ? footerButtonTitle
                : altFooterButtonTitle
            }
          />
        </View>
      </View>
    );
  }
}

CheckoutScreen.propTypes = {
  totalPrice: PropTypes.any,
  orderHistory: PropTypes.array,
  cardNumbersEnding: PropTypes.array,
  currentOrderId: PropTypes.string,
  selectedShippingMethod: PropTypes.object,
  selectedPaymentMethod: PropTypes.object,
  shoppingBag: PropTypes.array,
  navigation: PropTypes.object,
  shippingMethods: PropTypes.array,
  stripeCustomer: PropTypes.string,
  user: PropTypes.object,
  setOrderHistory: PropTypes.func,
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
    stripeCustomer: app.stripeCustomer,
    user: app.user,
  };
};

export default connect(mapStateToProps, { resetCheckout })(CheckoutScreen);
