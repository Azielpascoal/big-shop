import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppStyles from '../AppStyles';
import MainStack from '../../social/navigators/shopStacknavigator';
import ShopertinoConfig from '../ShopertinoConfig';

const Root = createStackNavigator();
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainStack">
      <Root.Screen
        name="MainStack"
        component={MainStack}
        initialParams={{
          appStyles: AppStyles,
          appConfig: ShopertinoConfig,
        }}
      />
    </Root.Navigator>
  );
};

export default RootNavigator;
