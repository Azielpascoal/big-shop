import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ShoppingBagScreen,
  CategoryProductGridScreen,
  SettingsScreen,
  ContactUsScreen,
  EditProfileScreen,
  ShippingAddressScreen,
  ShippingMethodScreen,
  PaymentMethodScreen,
  AddACardScreen,
  CheckoutScreen,
} from '../../shop/screens';
import DrawerStackNavigator from '../../shop/navigators/DrawerStackNavigator';
import FirebaseOrderAPIManager from '../../shop/apis/OrderAPIManager/FirebaseOrderAPIManager';
import { IMLocalized } from '../../shop/Core/localization/IMLocalization';
import AppStyles from '../../shop/AppStyles';

const MainStack = createStackNavigator();
const ShopStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Drawer" headerMode="float">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Drawer"
        component={DrawerStackNavigator}
      />
      <MainStack.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
        }}
        name="CategoryProductGrid"
        component={CategoryProductGridScreen}
      />
      <MainStack.Screen name="Settings" component={SettingsScreen} />
      <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
      <MainStack.Screen name="Contact" component={ContactUsScreen} />
      <MainStack.Screen
        name="ShippingAddress"
        component={ShippingAddressScreen}
      />
      <MainStack.Screen
        name="ShippingMethod"
        component={ShippingMethodScreen}
      />
      <MainStack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <MainStack.Screen name="AddACard" component={AddACardScreen} />
      <MainStack.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
        }}
        name="Checkout"
        component={CheckoutScreen}
      />
      <MainStack.Screen name="Bag" component={ShoppingBagScreen} />
    </MainStack.Navigator>
  );
};
export default ShopStackNavigator;
