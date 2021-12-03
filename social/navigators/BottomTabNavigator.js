import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TNTouchableIcon, TNStoryItem } from '../../Core/truly-native';
import {
  InnerFeedNavigator,
  InnerChatSearchNavigator,
  InnerFriendsSearchNavigator,
  InnerDiscoverNavigator,
  InnerProfileNavigator,
} from './InnerStackNavigators';
import { View, Image } from 'react-native';
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
      tabBarOptions={{
        showLabel: false,
        style: {
          elevation: 0,
          backgroundColor: '#ffffff',
          height: 60,
          alignItems: 'center',
        },
      }}
      // tabBar={({ state, route, navigation }) => (
      //   <TabBarBuilder
      //     tabIcons={InstagramCloneConfig.tabIcons}
      //     appStyles={AppStyles}
      //     route={route}
      //     state={state}
      //     navigation={navigation}
      //   />
      // )}
      initialRouteName="Feed">
      <BottomTab.Screen
        name="Feed"
        component={InnerFeedNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: focused ? '#4852D91A' : '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={AppStyles.iconSet.homefilled}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4852D9' : '#999999',
                }}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Live"
        component={LiveScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: focused ? '#4852D91A' : '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={AppStyles.iconSet.live}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4852D9' : '#999999',
                }}
              />
            </View>
          ),
        }}
      />
      {/* <BottomTab.Screen name="Discover" component={InnerDiscoverNavigator} /> */}
      {/* <BottomTab.Screen name="Chat" component={InnerChatSearchNavigator} /> */}
      <BottomTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'linear-gradient(to top, #f32b60, #ff8f1f)',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -40,
              }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: focused ? '#B4BAFE' : '#B4BAFE',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={AppStyles.iconSet.plus}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: focused ? '#4852D9' : '#ffffff',
                  }}
                />
              </View>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="ShopHome"
        component={shopNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: focused ? '#4852D91A' : '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={AppStyles.iconSet.shoppingBagFilled}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4852D9' : '#999999',
                }}
              />
            </View>
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Friends"
        component={InnerFriendsSearchNavigator}
      /> */}
      <BottomTab.Screen
        name="Gifts"
        component={GiftsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: focused ? '#4852D91A' : '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={AppStyles.iconSet.giftbox}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4852D9' : '#999999',
                }}
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
