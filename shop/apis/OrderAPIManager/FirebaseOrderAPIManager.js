import { Alert } from 'react-native';
import Loading from 'react-native-loader-overlay';
import uuid from 'uuidv4';
import stripe from 'tipsi-stripe';
import { firebaseDataManager } from '../firebase/';
import Order from '../../models/Order';
import PaymentRequestAPI from '../../Core/payment/api';
import { IMLocalized } from '../../Core/localization/IMLocalization';

export default class {
  constructor(props, appConfig, loading, shoppingBag, totalPrice) {
    this.props = props;
    this.loading = loading;
    this.appConfig = appConfig;
    this.shoppingBag = shoppingBag;
    this.totalPrice = totalPrice;
    this.paymentRequestAPI = new PaymentRequestAPI(appConfig);
    this.source;
  }

  handleAppStateChange() {}

  startCheckout = async (selectedPaymentMethod, items, options, loading) => {
    this.loading = loading;
    if (selectedPaymentMethod.isNativePaymentMethod) {
      this.handleNativePaymentMethod(items, options);
      return;
    }

    this.handleNonNativePaymentMethod();
  };

  handleNativePaymentMethod = async (items, options) => {
    try {
      const token = await stripe.paymentRequestWithNativePay(options, items);

      if (token) {
        const source = await this.paymentRequestAPI.addNewPaymentSource(
          this.props.stripeCustomer,
          token.tokenId,
        );

        this.source = source.data.response.id;

        await this.startOrder();
        stripe.completeNativePayRequest();
      } else {
        alert('An error occured, please try again.');
      }
    } catch (error) {
      Loading.hide(this.loading);
      alert(error);
      stripe.cancelNativePayRequest();
    }
  };

  handleNonNativePaymentMethod = async () => {
    this.source = this.props.selectedPaymentMethod.cardId;
    this.startOrder();
  };

  startOrder = async (source) => {
    if (source) {
      this.source = source;
    }
    return await this.createOrder(this.source);
  };

  createOrder = async (source) => {
    const {
      totalPrice: stateTotalPrice,
      selectedShippingMethod,
      selectedPaymentMethod,
      shoppingBag: stateShoppingBag,
      user,
    } = this.props;

    let shoppingBag;
    let totalPrice;

    if (!this.shoppingBag) {
      shoppingBag = stateShoppingBag;
    } else {
      shoppingBag = this.shoppingBag;
    }

    if (!this.totalPrice) {
      totalPrice = stateTotalPrice;
    } else {
      totalPrice = this.totalPrice;
    }

    const order = {
      id: uuid(),
      createdAt: new Date(),
      shopertino_products:
        shoppingBag.length > 0
          ? [...shoppingBag]
          : this.getProductsFromOrderHistory(),
      totalPrice: Number(totalPrice),
      status: IMLocalized('Order Placed'),
      user: user,
      selectedShippingMethod,
      selectedPaymentMethod,
      shippingAddress: user.shippingAddress,
      user_id: user.id,
    };

    this.chargeOrder(order, Number(totalPrice), source);
  };

  chargeOrder = async (order, totalPrice, source) => {
    const { selectedShippingMethod } = this.props;

    try {
      const orderCopy = {
        ...order,
        totalPrice: order.totalPrice - selectedShippingMethod.amount,
      };

      const charge = await this.chargeCustomer(source, totalPrice);

      if (charge.success) {
        Loading.hide(this.loading);
        this.alertOrderPLaced(orderCopy, charge.data.response);
      } else {
        Loading.hide(this.loading);
        alert(IMLocalized('An error occured please try again later.'));
      }
    } catch (error) {
      console.log(error);
      Loading.hide(this.loading);
      alert(error);
    }
  };

  chargeCustomer = async (source, totalPrice) => {
    const charge = await this.paymentRequestAPI.chargeStripeCustomer({
      customer: this.props.stripeCustomer,
      amount: Number(totalPrice) * 100,
      currency: 'usd',
      source,
      uuid: uuid(),
    });

    return charge;
  };

  alertOrderPLaced = (order, charge) => {
    setTimeout(() => {
      Alert.alert(
        IMLocalized('Congratulations!'),
        IMLocalized('Your order has been placed successfully.'),
        [
          {
            text: 'OK',
            onPress: () => this.handleOrderPlaced(order, charge),
          },
        ],
        { cancelable: true },
      );
    }, 1000);
  };

  handleOrderPlaced = async (order, charge) => {
    const { user, shoppingBag: stateShoppingBag } = this.props;

    if (!this.shoppingBag) {
      shoppingBag = stateShoppingBag;
    } else {
      shoppingBag = this.shoppingBag;
    }

    const modelledOrder = new Order(
      order.createdAt,
      order.id,
      order.status,
      Number(order.totalPrice),
      shoppingBag.length > 0
        ? [...shoppingBag]
        : this.getProductsFromOrderHistory(),
      user,
      order.selectedShippingMethod,
      order.selectedPaymentMethod,
      user.shippingAddress,
      user.id,
    );

    await firebaseDataManager.savePaymentCharge(user.id, charge);
    await firebaseDataManager.updateOrders(modelledOrder);
    await this.props.resetCheckout();
    Loading.hide(this.loading);
    this.props.onCancelPress && this.props.onCancelPress();
    this.props.navigation.navigate('Order', { appConfig: this.appConfig });
  };

  getProductsFromOrderHistory = () => {
    const order = this.props.orderHistory.find((product) => {
      return product.id === this.props.currentOrderId;
    });

    if (
      order &&
      order.shopertino_products &&
      order.shopertino_products.length > 0
    ) {
      return order.shopertino_products;
    }
    return [];
  };
}
