import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '../../shop/navigators/DrawerStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import { IMChatScreen } from '../Core/chat';
import React from 'react';
import { DetailPostScreen, ProfileScreen } from '../screens';
import { IMLocalized } from '../Core/localization/IMLocalization';
import { IMNotificationScreen } from '../Core/notifications';
import {
  IMProfileSettingsScreen,
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../Core/profile';
import { IMAllFriendsScreen } from '../Core/socialgraph/friendships';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
        headerBackTitle: IMLocalized('Back'),
      }}
      initialRouteName="NavStack"
      headerMode="float">
      <Stack.Screen
        options={{ headerShown: false }}
        name="NavStack"
        component={BottomTabNavigator}
        //component={Platform.OS === 'ios' ? BottomTabNavigator : DrawerNavigator}
      />

      <Stack.Screen
        options={{ headerBackTitle: IMLocalized('Chat') }}
        name="PersonalChat"
        component={IMChatScreen}
      />
      <Stack.Screen
        options={{
          title: IMLocalized('Post'),
        }}
        name="MainDetailPost"
        component={DetailPostScreen}
      />
      <Stack.Screen name="MainProfile" component={ProfileScreen} />
      <Stack.Screen name="Notification" component={IMNotificationScreen} />
      <Stack.Screen
        name="ProfileSettings"
        component={IMProfileSettingsScreen}
      />
      <Stack.Screen name="EditProfile" component={IMEditProfileScreen} />
      <Stack.Screen name="AppSettings" component={IMUserSettingsScreen} />
      <Stack.Screen name="ContactUs" component={IMContactUsScreen} />
      <Stack.Screen name="AllFriends" component={IMAllFriendsScreen} />
      <Stack.Screen
        name="MainProfilePostDetails"
        component={DetailPostScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
