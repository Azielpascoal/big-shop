import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import AppConfig from '../../ShopertinoConfig';

function ProductCard(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const { cardConainerStyle, onPress, item, appConfig } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.productCardConainer, cardConainerStyle]}>
      <View style={styles.productCardImageConainer}>
        <Image style={styles.productCardImage} source={{ uri: item.photo }} />
      </View>
      <Text
        style={
          styles.productCardPrice
        }>{`${AppConfig.currency}${item.price}`}</Text>
      <Text style={styles.productCardDescription} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

ProductCard.propTypes = {
  cardConainerStyle: PropTypes.object,
  item: PropTypes.object,
  onPress: PropTypes.func,
};

export default ProductCard;
