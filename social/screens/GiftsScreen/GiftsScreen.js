import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Appearance } from 'react-native-appearance';

import AppStyles from '../../AppStyles';
import { TNTouchableIcon } from '../../Core/truly-native';

import styles from './styles';

export default class GiftsScreen extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress;
  }
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
    }).start();
    this.open = !this.open;
  };
  render() {
    const cameraStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -25],
          }),
        },
      ],
    };
    const likesStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -50],
          }),
        },
      ],
    };
    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };
    let COLOR_SCHEME = Appearance.getColorScheme();
    let currentTheme = AppStyles.navThemeConstants[COLOR_SCHEME];
    return (
      <View style={[styles.mainContainer, this.props.style]}>
        <View>
          <Animated.View style={[styles.button, styles.submenu, likesStyle]}>
            <TNTouchableIcon
              imageStyle={{ tintColor: currentTheme.backgroundColor }}
              iconSource={AppStyles.iconSet.filledHeart}
              onPress={this.onPress}
              appStyles={AppStyles}
            />
          </Animated.View>
        </View>
        <View>
          <Animated.View style={[styles.button, styles.submenu, cameraStyle]}>
            <TNTouchableIcon
              imageStyle={{ tintColor: currentTheme.backgroundColor }}
              iconSource={AppStyles.iconSet.cameraFilled}
              onPress={this.onPress}
              appStyles={AppStyles}
            />
          </Animated.View>
        </View>

        <View>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <TNTouchableIcon
              imageStyle={{ tintColor: currentTheme.backgroundColor }}
              iconSource={AppStyles.iconSet.add}
              onPress={this.toggleMenu}
              appStyles={AppStyles}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}
