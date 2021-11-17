import React from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';

function CardInputFields(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const {
    title,
    cardInputContainerStyle,
    cardInputTitleStyle,
    iconSource,
    cardNumberPlaceholder,
    onCardNumberChange,
    cardNumberValue,
    cardDatePlaceholder,
    cardDateValue,
    onCardDateChange,
    cvcPlaceholder,
    cvcValue,
    onCvcChange,
    cardNumberMaxLength,
    dateMaxLength,
    cvcMaxLength,
  } = props;

  return (
    <View style={[styles.fieldsContainer, cardInputContainerStyle]}>
      <Text style={[styles.fieldsTitle, cardInputTitleStyle]}>{title}</Text>
      <View style={styles.inputFieldContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={iconSource}
            resizeMode="contain"
            style={styles.inputFieldIcon}
          />
        </View>
        <View style={styles.cardNumberContainer}>
          <TextInput
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            maxLength={cardNumberMaxLength}
            style={styles.cardNumber}
            editable={true}
            placeholderTextColor={AppStyles.colorSet[colorScheme].hairlineColor}
            placeholder={cardNumberPlaceholder}
            value={cardNumberValue}
            onChangeText={onCardNumberChange}
          />
        </View>
        <View style={styles.cardDateContainer}>
          <TextInput
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            maxLength={dateMaxLength}
            style={styles.cardDate}
            editable={true}
            placeholderTextColor={AppStyles.colorSet[colorScheme].hairlineColor}
            placeholder={cardDatePlaceholder}
            value={cardDateValue}
            onChangeText={onCardDateChange}
          />
        </View>
        <View style={styles.cvcContainer}>
          <TextInput
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            maxLength={cvcMaxLength}
            style={styles.cvc}
            editable={true}
            placeholderTextColor={AppStyles.colorSet[colorScheme].hairlineColor}
            placeholder={cvcPlaceholder}
            value={cvcValue}
            onChangeText={onCvcChange}
          />
        </View>
      </View>
    </View>
  );
}

CardInputFields.propTypes = {
  title: PropTypes.string.isRequired,
  cardInputContainerStyle: PropTypes.any,
  cardInputTitleStyle: PropTypes.any,
  iconSource: PropTypes.any,
  cardNumberPlaceholder: PropTypes.string,
  onCardNumberChange: PropTypes.func,
  cardNumberValue: PropTypes.string,
  cardDatePlaceholder: PropTypes.string,
  cardDateValue: PropTypes.string,
  onCardDateChange: PropTypes.func,
  cvcPlaceholder: PropTypes.string,
  cvcValue: PropTypes.string,
  onCvcChange: PropTypes.func,
  cardNumberMaxLength: PropTypes.number,
  dateMaxLength: PropTypes.number,
  cvcMaxLength: PropTypes.number,
};

export default CardInputFields;
