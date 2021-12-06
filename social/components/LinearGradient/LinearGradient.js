import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function LinearGradientColor(props) {
  return (
    <LinearGradient
      colors={['#4e54c8', '#8f94fb']}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 0.6 }}
      locations={[0, 0.5, 0.6]}
      style={props.styles}
    />
  );
}

export default LinearGradientColor;
