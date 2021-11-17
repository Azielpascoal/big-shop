import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  ResetPasswordScreen,
} from '../Core/onboarding';
import authManager from '../apis/AuthAPIManager';
import AppStyles from '../AppStyles';
import ShopertinoConfig from '../ShopertinoConfig';

const AuthStack = createStackNavigator();
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        cardShadowEnable: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerShown: false,
      }}
      initialRouteName="Welcome">
      <AuthStack.Screen
        initialParams={{
          appStyles: AppStyles,
          appConfig: ShopertinoConfig,
          authManager: authManager,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Sms" component={SmsAuthenticationScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0, // remove shadow on Android
  },
});

export default AuthStackNavigator;
