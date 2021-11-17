import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function FooterButton(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    title,
    onPress,
    disabled,
    footerTitleStyle,
    footerContainerStyle,
    iconSource,
    iconStyle,
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.footerContainer, footerContainerStyle]}>
      {iconSource && <Image style={iconStyle} source={iconSource} />}
      <Text style={[styles.footerTitle, footerTitleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

FooterButton.propTypes = {
  title: PropTypes.string.isRequired,
  footerContainerStyle: PropTypes.object,
  footerTitleStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  iconSource: PropTypes.any,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FooterButton;
