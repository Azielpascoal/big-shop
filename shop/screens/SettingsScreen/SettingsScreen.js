import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";
import { Settings } from '../../components';
import AppStyles from '../../AppStyles';
import { logout } from '../../redux';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route, navigation } = props;
    navigation.setOptions({
      headerBackTitle: IMLocalized('Profile'),
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? IMLocalized('Settings')
          : route.params.title,
      headerTintColor: currentTheme.fontColor,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
    });
  }

  render() {
    return <Settings logout={this.props.logout} />;
  }
}

export default connect(null, { logout })(SettingsScreen);
