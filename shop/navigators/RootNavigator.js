import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
//import { Transition } from 'react-native-reanimated';
import AppStyles from '../AppStyles';
//import { LoadScreen, WalkthroughScreen } from '../Core/onboarding';
import MainStack from './MainStackNavigator';
import LoginStack from './AuthStackNavigator';
import ShopertinoConfig from '../ShopertinoConfig';

const Root = createStackNavigator();
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainStack">
      {/* <Root.Screen
        initialParams={{
          appStyles: AppStyles,
          appConfig: ShopertinoConfig,
        }}
        name="LoadScreen"
        component={LoadScreen}
      /> */}
      {/* <Root.Screen name="Walkthrough" component={WalkthroughScreen} />
      <Root.Screen name="LoginStack" component={LoginStack} /> */}
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
/* export const RootNavigator = customCreateSwitchNavigator(
  {
    LoadScreen: LoadScreen,
    Walkthrough: WalkthroughScreen,
    LoginStack: LoginStack,
    MainStack: MainStack,
  },
  {
    initialRouteName: 'LoadScreen',
    initialRouteParams: ,
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={400} interpolation="easeIn" />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
); */

export default RootNavigator;
