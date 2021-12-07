import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { InnerFeedNavigator } from './InnerStackNavigators';
import { View, Image } from 'react-native';
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen';
import GiftsScreen from '../screens/GiftsScreen/GiftsScreen';
import LiveScreen from '../screens/LiveScreen/LiveScreen';

import styles from './styles';
//shop imports
import shopNavigator from './shopStacknavigator';

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
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabBarIconStyles,
                { backgroundColor: focused ? '#4852D91A' : '#ffffff' },
              ]}>
              <Image
                source={AppStyles.iconSet.homefilled}
                style={[
                  styles.tabNavigatorIcon,
                  { tintColor: focused ? '#4852D9' : '#999999' },
                ]}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Live"
        component={LiveScreen}
        options={{
          tabBarLabel: 'Motions',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabBarIconStyles,
                { backgroundColor: focused ? '#4852D91A' : '#ffffff' },
              ]}>
              <Image
                source={AppStyles.iconSet.live}
                style={[
                  styles.tabNavigatorIcon,
                  { tintColor: focused ? '#4852D9' : '#999999' },
                ]}
              />
            </View>
          ),
        }}
      />
      {/* <BottomTab.Screen name="Discover" component={InnerDiscoverNavigator} /> */}
      {/* <BottomTab.Screen name="Chat" component={InnerChatSearchNavigator} /> */}
      {/* <BottomTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarLabel: 'Create Post',
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIconStyles, { backgroundColor: '#999999' }]}>
              <Image
                source={AppStyles.iconSet.plus}
                style={[
                  styles.tabNavigatorIcon,
                  { tintColor: focused ? '#4852D9' : 'white' },
                ]}
              />
            </View>
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="ShopHome"
        component={shopNavigator}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabBarIconStyles,
                { backgroundColor: focused ? '#4852D91A' : '#ffffff' },
              ]}>
              <Image
                source={AppStyles.iconSet.shoppingBagFilled}
                style={[
                  styles.tabNavigatorIcon,
                  { tintColor: focused ? '#4852D9' : '#999999' },
                ]}
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
          tabBarLabel: 'Gifts',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabBarIconStyles,
                { backgroundColor: focused ? '#4852D91A' : '#ffffff' },
              ]}>
              <Image
                source={AppStyles.iconSet.giftbox}
                style={[
                  styles.tabNavigatorIcon,
                  { tintColor: focused ? '#4852D9' : '#999999' },
                ]}
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
