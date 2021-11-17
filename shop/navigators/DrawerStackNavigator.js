import React from 'react';
import { connect } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MenuButton, ShoppingBagButton } from '../components';
import authManager from '../apis/AuthAPIManager';
import {
  HomeScreen,
  ShopScreen,
  OrdersScreen,
  WishlistScreen,
  SearchScreen,
  ProfileScreen,
  ShoppingBagScreen,
} from '../screens';
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu';
import { useColorScheme } from 'react-native-appearance';
import { createStackNavigator } from '@react-navigation/stack';
import FirebaseOrderAPIManager from '../apis/OrderAPIManager/FirebaseOrderAPIManager';
import ShopertinoConfig from '../ShopertinoConfig';
import styles from './styles';
import AppStyles from '../AppStyles';

const Drawer = createStackNavigator();
const DrawerNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Home"
      drawerStyle={{ width: 300 }}
      screenOptions={({ navigation, route }) => {
        const currentTheme = AppStyles.navThemeConstants[colorScheme];
        return {
          headerStyle: {
            backgroundColor: currentTheme.backgroundColor,
            borderBottomWidth: 0,
          },
          headerTintColor: currentTheme.fontColor,
          headerLeft: () => (
            <MenuButton
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () =>
            route.key != 'ShoppingBag' && (
              <ShoppingBagButton
                onPress={() => {
                  navigation.navigate('Bag', { appConfig: ShopertinoConfig });
                }}
              />
            ),
          headerTitle: getDrawerScreenTitle(route.name),
          headerTitleAlign: 'center',
        };
      }}>
      <Drawer.Screen
        initialParams={{
          appStyles: AppStyles,
          appConfig: ShopertinoConfig,
          orderAPIManager: FirebaseOrderAPIManager,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen name="Shop" component={ShopScreen} />
      <Drawer.Screen name="Order" component={OrdersScreen} />
      <Drawer.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
        }}
        name="Wishlist"
        component={WishlistScreen}
      />
      <Drawer.Screen
        initialParams={{
          orderAPIManager: FirebaseOrderAPIManager,
        }}
        name="Search"
        component={SearchScreen}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="ShoppingBag" component={ShoppingBagScreen} />
    </Drawer.Navigator>
  );
};

const AppDrawer = createDrawerNavigator();
const AppDrawerNav = () => {
  return (
    <AppDrawer.Navigator
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          appStyles={AppStyles}
          appConfig={ShopertinoConfig}
          authManager={authManager}
          menuItems={ShopertinoConfig.drawerMenuConfig.upperMenu}
          menuItemsSettings={ShopertinoConfig.drawerMenuConfig.lowerMenu}
        />
      )}>
      <AppDrawer.Screen name="Drawer" component={DrawerNavigator} />
    </AppDrawer.Navigator>
  );
};

const getDrawerScreenTitle = (routeKey) => {
  switch (routeKey) {
    case 'Home':
      return 'Shopertino';
    case 'Shop':
      return 'Shop';
    case 'Order':
      return 'Orders';
    case 'Wishlist':
      return 'Wishlist';
    case 'Search':
      return 'Search';
    case 'Profile':
      return 'Profile';
    case 'ShoppingBag':
      return 'Shopping Bag';
    default:
      return 'Home';
  }
};

export default connect()(AppDrawerNav);
