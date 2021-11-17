import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function HeaderButton(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { title, buttonContainerStyle, buttonStyle, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, buttonContainerStyle]}>
      <Text style={[styles.button, buttonStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

HeaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonContainerStyle: PropTypes.any,
  buttonStyle: PropTypes.any,
  onPress: PropTypes.func,
};

export default HeaderButton;
