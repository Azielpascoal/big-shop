import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Profile } from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import deviceStorage from '../../utils/deviceStorage';
import { logout } from '../../redux';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.appConfig = props.route.params.appConfig;
    this.dataAPIManager = new DataAPIManager(this.appConfig);
  }

  onLogout = async () => {
    await deviceStorage.logoutDeviceStorage();
    await this.dataAPIManager?.logout();
    await this.props.logout();
    this.onItemPress('LoginStack');
  };

  onItemPress = (routeName, title) => {
    this.props.navigation.navigate(routeName, {
      title: title ? title : routeName,
      appConfig: this.appConfig,
    });
  };

  render() {
    return (
      <Profile
        user={this.props.user}
        onLogout={this.onLogout}
        onItemPress={this.onItemPress}
        navigation={this.props.navigation}
      />
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = ({ app }) => {
  return {
    user: app.user,
  };
};

export default connect(mapStateToProps, { logout })(ProfileScreen);
