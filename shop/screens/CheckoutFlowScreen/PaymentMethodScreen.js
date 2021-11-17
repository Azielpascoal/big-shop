import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import stripe from 'tipsi-stripe';
import {
  Header,
  ProcedureImage,
  PaymentOptions,
  HeaderButton,
} from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import {
  updatePaymentMethods,
  setShippingMethods,
  removePaymentMethod,
} from '../../redux';
import AppStyles from '../../AppStyles';
import AppConfig from '../../ShopertinoConfig';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import PaymentRequestAPI from '../../Core/payment/api';

const options = {
  requiredBillingAddressFields: 'full',
  prefilledInformation: {
    billingAddress: {
      name: 'Marya Ken',
      line1: 'Canary Place',
      line2: '3',
      city: 'Macon',
      state: 'Georgia',
      country: 'US',
      postalCode: '31217',
    },
  },
};

class PaymentMethodScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route, navigation } = props;
    navigation.setOptions({
      headerTintColor: currentTheme.fontColor,
      cardStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
      },
      title: '',
      headerLeft: () => (
        <HeaderButton
          onPress={() => {
            navigation.goBack();
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={IMLocalized('Cancel')}
        />
      ),
      headerRight: () => (
        <HeaderButton
          onPress={() => {
            navigation.replace('ShippingAddress', {
              appConfig: route.params.appConfig,
            });
          }}
          buttonContainerStyle={{ marginRight: 10 }}
          title={IMLocalized('Next')}
        />
      ),
    });
    this.state = {
      cardNumberValue: '',
      apiToUse: '',
    };
    this.paymentMethods = [];
    this.paymentRequestAPI = new PaymentRequestAPI(AppConfig);
    this.dataAPIManager = new DataAPIManager(AppConfig);
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.dataAPIManager.unsubscribe && this.dataAPIManager.unsubscribe();
  }

  loadData = () => {
    this.dataAPIManager.loadPaymentMethod(
      this.props.user,
      ({ paymentMethods, shippingMethods }) => {
        if (paymentMethods) {
          this.paymentMethods = paymentMethods;
          this.setPaymentMethods(paymentMethods);
        }

        if (shippingMethods?.length > 1) {
          this.props.setShippingMethods(methods);
        }
      },
    );
  };

  setPaymentMethods = (methods) => {
    this.props.updatePaymentMethods(methods);
  };

  onAddNewCard = async () => {
    if (this.props.paymentMethods.length > 4) {
      Alert.alert(
        IMLocalized('Card Limit Exceeded'),
        IMLocalized('Kindly delete a card to add a new payment method.'),
        [
          {
            text: 'Cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      try {
        const token = await stripe.paymentRequestWithCardForm(options);

        if (token) {
          const source = await this.paymentRequestAPI.addNewPaymentSource(
            this.props.stripeCustomer,
            token.tokenId,
          );

          this.onUpdatePaymentMethod(token, source);
        }
      } catch (err) {
        console.log(err);
        // alert("an error occured while trying to add card, please try again.");
        alert(err);
      }
    }
  };

  onUpdatePaymentMethod = (token, source) => {
    this.dataAPIManager.onUpdatePaymentMethod(
      this.props,
      token,
      source,
      this.paymentMethods,
    );
  };

  onPaymentMethodLongPress = (method) => {
    Alert.alert(
      IMLocalized('Remove card'),
      IMLocalized('This card will be removed from payment methods.'),
      [
        {
          text: IMLocalized('Remove'),
          onPress: () => this.removeFromPaymentMethods(method),
          style: 'destructive',
        },
        {
          text: IMLocalized('Cancel'),
        },
      ],
      { cancelable: true },
    );
  };

  removeFromPaymentMethods = async (method) => {
    try {
      const result = await this.paymentRequestAPI.deletePaymentSource(
        this.props.stripeCustomer,
        method.cardId,
      );

      if (result.data?.response?.deleted) {
        this.onRemoveFromPaymentMethods(method);
      }

      if (result?.stripeError?.data?.error?.startsWith('No such source')) {
        this.onRemoveFromPaymentMethods(method);
      }
    } catch (error) {
      console.log(error);
      alert('An error occured. try again later');
    }
  };

  onRemoveFromPaymentMethods = (method) => {
    this.dataAPIManager.onRemoveFromPaymentMethods(
      method,
      this.props.user,
      this.paymentMethods,
      (data) => {
        if (data) {
          this.props.removePaymentMethod(data);
        }
      },
    );
  };

  render() {
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.colorSet[colorScheme];

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: currentTheme.backgroundColor }}>
        <Header title={IMLocalized('Payment Method')} />
        <ProcedureImage source={AppStyles.imageSet.creditCard} />
        <PaymentOptions
          onPaymentMethodLongPress={this.onPaymentMethodLongPress}
          onAddNewCard={this.onAddNewCard}
          navigation={this.props.navigation}
          cardNumbersEnding={this.props.cardNumbersEnding}
          paymentMethods={this.props.paymentMethods}
        />
      </KeyboardAwareScrollView>
    );
  }
}

PaymentMethodScreen.propTypes = {
  cardNumbersEnding: PropTypes.array,
  navigation: PropTypes.object,
  paymentMethods: PropTypes.array,
  user: PropTypes.object,
  stripeCustomer: PropTypes.string,
  setShippingMethods: PropTypes.func,
  updatePaymentMethods: PropTypes.func,
};

const mapStateToProps = ({ checkout, app }) => {
  return {
    totalPrice: checkout.totalPrice,
    shippingMethod: checkout.shippingMethod,
    cardNumbersEnding: checkout.cardNumbersEnding,
    paymentMethods: checkout.paymentMethods,
    user: app.user,
    stripeCustomer: app.stripeCustomer,
  };
};

export default connect(mapStateToProps, {
  setShippingMethods,
  updatePaymentMethods,
  removePaymentMethod,
})(PaymentMethodScreen);
