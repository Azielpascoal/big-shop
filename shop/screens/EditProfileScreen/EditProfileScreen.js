import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditProfile, HeaderButton } from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import AppStyles from '../../AppStyles';
import { setUserData } from '../../redux/';
import AppConfig from '../../ShopertinoConfig';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route, navigation } = props;
    navigation.setOptions({
      title:
        typeof route.params === 'undefined' ||
        typeof route.params.title === 'undefined'
          ? IMLocalized('Edit Profile')
          : route.params.title,
      headerTintColor: currentTheme.fontColor,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
      headerRight: () => (
        <HeaderButton
          onPress={this.onUpdateUser}
          buttonContainerStyle={{ marginRight: 10 }}
          title={IMLocalized('Done')}
        />
      ),
      headerBackTitle: IMLocalized('Profile'),
      headerLeft: () => (
        <HeaderButton
          onPress={() => {
            navigation.goBack();
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={IMLocalized('Cancel')}
        />
      ),
    });
    this.state = {
      userData: {},
    };
    this.dataAPIManager = new DataAPIManager(AppConfig);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onUpdateUser: this.onUpdateUser,
    });
  }

  onUpdateUser = () => {
    this.dataAPIManager.onUpdateUser(this.props, this.state.userData);
  };

  onProfileDataChange = (userData) => {
    this.setState({ userData });
  };

  render() {
    return (
      <EditProfile
        user={this.props.user}
        onProfileDataChange={this.onProfileDataChange}
      />
    );
  }
}

EditProfileScreen.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  setUserData: PropTypes.func,
  stripeCustomer: PropTypes.string,
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
    stripeCustomer: app.stripeCustomer,
  };
};

export default connect(mapStateToProps, { setUserData })(EditProfileScreen);
