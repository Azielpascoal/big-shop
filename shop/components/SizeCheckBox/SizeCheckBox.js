import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function SizeCheckBox(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { size, index, containerStyle, selectedIndex, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        index === selectedIndex
          ? [styles.sizeOptionBox, styles.selectedSizeOptionBox, containerStyle]
          : [styles.sizeOptionBox, containerStyle]
      }>
      <Text
        style={
          index === selectedIndex
            ? [styles.size, styles.selectedSize]
            : styles.size
        }>
        {size}
      </Text>
    </TouchableOpacity>
  );
}

SizeCheckBox.propTypes = {
  size: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  selectedIndex: PropTypes.number,
  containerStyle: PropTypes.any,
};

export default SizeCheckBox;
