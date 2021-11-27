import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  InnerFeedNavigator,
  InnerChatSearchNavigator,
  InnerFriendsSearchNavigator,
  InnerDiscoverNavigator,
  InnerProfileNavigator,
} from './InnerStackNavigators';
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen';
import GiftsScreen from '../screens/GiftsScreen/GiftsScreen';
import LiveScreen from '../screens/LiveScreen/LiveScreen';
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
      <BottomTab.Screen name="Live" component={LiveScreen} />
      {/* <BottomTab.Screen name="Discover" component={InnerDiscoverNavigator} /> */}
      {/* <BottomTab.Screen name="Chat" component={InnerChatSearchNavigator} /> */}
      <BottomTab.Screen name="CreatePost" component={CreatePostScreen} />
      <BottomTab.Screen name="ShopHome" component={shopNavigator} />
      {/* <BottomTab.Screen
        name="Friends"
        component={InnerFriendsSearchNavigator}
      /> */}
      <BottomTab.Screen name="Gifts" component={GiftsScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
