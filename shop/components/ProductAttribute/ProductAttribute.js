import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function ProductAttribute(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    index,
    containerStyle,
    option,
    attributeName,
    selectedAttribute,
    onPress,
  } = props;

  const isSelected =
    index === selectedAttribute[attributeName]?.index &&
    attributeName === selectedAttribute[attributeName]?.attributeName &&
    option === selectedAttribute[attributeName]?.option;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isSelected
          ? [styles.sizeOptionBox, styles.selectedSizeOptionBox, containerStyle]
          : [styles.sizeOptionBox, containerStyle]
      }>
      <Text
        style={isSelected ? [styles.size, styles.selectedSize] : styles.size}>
        {option}
      </Text>
    </TouchableOpacity>
  );
}

ProductAttribute.propTypes = {
  index: PropTypes.number,
  onPress: PropTypes.func,
  containerStyle: PropTypes.any,
};

export default ProductAttribute;
