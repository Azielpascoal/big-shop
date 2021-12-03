import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../navigators/RootNavigator';
import BottomTabNavigator from '../navigators/BottomTabNavigator';

const mapStateToProps = (state) => ({
  state: state.nav,
});

const RootStack = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default RootStack; //connect(mapStateToProps)(AppContainer);
