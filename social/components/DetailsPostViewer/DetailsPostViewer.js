import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
// import { useColorScheme } from 'react-native-appearance';
// import FeedMedia from './FeedMedia';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';

function DetailsPostViewer(props) {
  const styles = dynamicStyles(colorScheme);
  return (
    <View style={styles.container}>
      <View></View>
    </View>
  );
}

export default DetailsPostViewer;
