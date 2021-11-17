import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { ContactUs } from '../../components';
import AppStyles from '../../AppStyles';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';

export default class ContactUsScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { navigation, route } = props;
    navigation.setOptions({
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? IMLocalized('Contact Us')
          : route.params.title,
      headerBackTitle: IMLocalized('Profile'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
      headerTintColor: currentTheme.fontColor,
    });
  }

  render() {
    return <ContactUs />;
  }
}
