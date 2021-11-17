import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  InnerFeedNavigator,
  InnerChatSearchNavigator,
  InnerFriendsSearchNavigator,
  InnerDiscoverNavigator,
  InnerProfileNavigator,
} from './InnerStackNavigators';
//shop imports
import shopNavigator from './shopStacknavigator';

//
import { TabBarBuilder } from '../Core/ui';
import InstagramCloneConfig from '../InstagramCloneConfig';
import AppStyles from '../AppStyles';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={({ state, route, navigation }) => (
        <TabBarBuilder
          tabIcons={InstagramCloneConfig.tabIcons}
          appStyles={AppStyles}
          route={route}
          state={state}
          navigation={navigation}
        />
      )}
      initialRouteName="Feed">
      <BottomTab.Screen name="Feed" component={InnerFeedNavigator} />
      <BottomTab.Screen name="Discover" component={InnerDiscoverNavigator} />
      <BottomTab.Screen name="Chat" component={InnerChatSearchNavigator} />
      <BottomTab.Screen
        name="Friends"
        component={InnerFriendsSearchNavigator}
      />
      {/* <BottomTab.Screen name="Profile" component={InnerProfileNavigator} /> */}
      <BottomTab.Screen name="ShopHome" component={shopNavigator} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
