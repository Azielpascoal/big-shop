import React from 'react';
import stripe from 'tipsi-stripe';
import RootNavigator from '../navigators/RootNavigator';
import AppConfig from '../ShopertinoConfig';
import { NavigationContainer } from '@react-navigation/native';

stripe.setOptions({
  publishableKey: AppConfig.stripeConfig.PUBLISHABLE_KEY,
  merchantId: AppConfig.stripeConfig.MERCHANT_ID,
  androidPayMode: AppConfig.stripeConfig.ANDROID_PAYMENT_MODE,
});

const AppContainer = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
