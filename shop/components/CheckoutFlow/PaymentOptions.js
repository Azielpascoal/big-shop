import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import { setSelectedPaymentMethod } from '../../redux/';
import { IMLocalized } from '../../Core/localization/IMLocalization';

function PaymentOptions(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { paymentMethods, onAddNewCard } = props;

  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0);

  useEffect(() => {
    props.setSelectedPaymentMethod(props.paymentMethods[0]);
  }, []);

  const onPaymentMethodPress = (index, item) => {
    setSelectedMethodIndex(index);
    props.setSelectedPaymentMethod(item);
  };

  const renderMethodFields = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => onPaymentMethodPress(index, item)}
        onLongPress={() => {
          index != 0 && props.onPaymentMethodLongPress(item);
        }}
        style={[
          styles.shippingMethodContainer,
          {
            borderBottomWidth:
              index === props.paymentMethods.length - 1 ? 0 : 0.5,
          },
        ]}
        key={index + ''}>
        <View style={styles.paymentOptionIconContainer}>
          <Image
            source={item.iconSource}
            resizeMode="contain"
            style={styles.paymentOptionIcon}
          />
        </View>
        <View style={styles.optionDetailContainer}>
          <Text style={styles.optionTitle}>{item.title}</Text>
        </View>
        <View style={styles.methodIconContainer}>
          {selectedMethodIndex === index && (
            <Image
              source={AppStyles.iconSet.tick}
              resizeMode="contain"
              style={styles.shippingAddressIcon}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.shippingDetailsContainer}>
        <View style={styles.shippingItemsContainer}>
          {paymentMethods.map((item, index) =>
            renderMethodFields({ item, index }),
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={onAddNewCard}
        style={styles.addNewCardContainer}>
        <View style={styles.addNewCardIconContainer}>
          <Image
            source={AppStyles.iconSet.plus}
            resizeMode="contain"
            style={styles.addCardIcon}
          />
        </View>
        <View style={styles.addNewCardTitleContainer}>
          <Text style={styles.addNewCardTitle}>
            {IMLocalized('Add New Card...')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

PaymentOptions.propTypes = {
  paymentMethods: PropTypes.array,
  navigation: PropTypes.object,
  onAddNewCard: PropTypes.func,
  onPaymentMethodLongPress: PropTypes.func,
  setSelectedPaymentMethod: PropTypes.func,
};

export default connect(null, { setSelectedPaymentMethod })(PaymentOptions);
