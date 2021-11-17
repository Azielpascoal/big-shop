import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function CheckOutDetails(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    containerStyle,
    selectedShippingMethod,
    totalPrice,
    selectedPaymentMethod,
    appConfig,
  } = props;
  const paymentValue = {
    key: 'Apple Pay',
    apple: 'Apple Pay',
    google: 'Google Pay',
  };
  const payment = {
    key: 'Payment',
    title: 'Payment',
    value: selectedPaymentMethod.isNativePaymentMethod
      ? paymentValue[selectedPaymentMethod.key]
      : `${selectedPaymentMethod.brand} ${selectedPaymentMethod.last4}`,
  };
  const shipping = {
    key: 'Shipping',
    title: 'Shipping',
    value: selectedShippingMethod.label,
  };
  const total = {
    key: 'Total',
    title: 'Total',
    value: `${appConfig.currency}${totalPrice}`,
  };
  const checkoutDetail = [payment, shipping, total];

  const renderCheckOutDetails = ({ index, item, checkoutDetail }) => {
    if (props.isStripeCheckoutEnabled && item.title === 'Payment') {
      return null;
    }

    if (
      props.selectedPaymentMethod.isNativePaymentMethod &&
      item.title === 'Shipping'
    ) {
      return null;
    }
    return (
      <View
        key={item.key}
        style={[
          styles.checkOutItemContainer,
          {
            borderBottomWidth: index === checkoutDetail.length - 1 ? 0 : 0.5,
          },
        ]}>
        <View style={styles.checkOutTitleContainer}>
          <Text style={styles.checkOutTitle}>{item.title}</Text>
        </View>
        <View style={styles.checkOutValueContainer}>
          <Text style={styles.checkOutValue}>{item.value}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.checkOutDetailContainer, containerStyle]}>
      {checkoutDetail.map((item, index) =>
        renderCheckOutDetails({ item, index, checkoutDetail }),
      )}
    </View>
  );
}

CheckOutDetails.propTypes = {
  selectedShippingMethod: PropTypes.object,
  selectedPaymentMethod: PropTypes.object,
  containerStyle: PropTypes.any,
  totalPrice: PropTypes.any,
};

export default CheckOutDetails;
