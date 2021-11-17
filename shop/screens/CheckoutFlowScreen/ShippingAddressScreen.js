import React, { Component } from 'react';
import { Alert, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {
  Header,
  ProcedureImage,
  ShippingDetails,
  HeaderButton,
} from '../../components';
import DataAPIManager from '../../apis/DataAPIManager';
import { setShippingAddress, setTotalPrice, setUserData } from '../../redux/';
import AppStyles from '../../AppStyles';
import AppConfig from '../../ShopertinoConfig';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';

// const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;

// const regexResult = regexEmail.test(value);
//     if (value.length > 0 && !regexResult) {
//       return true;
//     }
//     if (value.length > 0 && regexResult) {
//       return false;
//     }

class ShippingAddressScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route, navigation } = props;
    navigation.setOptions({
      headerTintColor: currentTheme.fontColor,
      headerTitle: '',
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
      },
      headerLeft: () => (
        <HeaderButton
          onPress={() => {
            navigation.goBack();
          }}
          buttonContainerStyle={{ marginLeft: 10 }}
          title={IMLocalized('Cancel')}
        />
      ),
      headerRight: () => (
        <HeaderButton
          onPress={this.navigateUser}
          buttonContainerStyle={{ marginRight: 10 }}
          title={IMLocalized('Next')}
        />
      ),
    });
    this.shippingAddress = [];
    this.shouldNavigateUser = false;
    this.appConfig = route.params.appConfig;
    this.dataAPIManager = new DataAPIManager(this.appConfig);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      navigateUser: this.navigateUser,
    });
  }

  navigateUser = () => {
    if (this.shouldNavigateUser) {
      this.handleUserNavigation();
    } else {
      Alert.alert(
        IMLocalized('Incomplete Address'),
        IMLocalized('Kindly complete your Shipping Address.'),
        [
          {
            text: IMLocalized('OK'),
          },
        ],
        { cancelable: true },
      );
    }
  };

  handleUserNavigation = async () => {
    const { isNativePaymentMethod, key } = this.props.selectedPaymentMethod;

    const convertedAddress = this.convertAddressToObject(this.shippingAddress);
    this.props.setShippingAddress(convertedAddress);

    this.storeUserShippAddress(convertedAddress);

    if (isNativePaymentMethod && (key === 'apple' || 'google')) {
      this.props.setTotalPrice();
      this.props.navigation.replace('Checkout', { appConfig: this.appConfig });
    } else {
      this.props.navigation.replace('ShippingMethod', {
        appConfig: this.appConfig,
      });
    }
  };

  storeUserShippAddress = (address) => {
    this.dataAPIManager.storeUserShippAddress(this.props, address);
  };

  convertAddressToObject = (address) => {
    const result = {};

    address.forEach((item) => {
      result[item.key] = item.value;
    });

    return result;
  };

  convertAddressToArray = (address) => {
    const result = [];

    Object.keys(address).forEach((key, index) => {
      result.push({ index, key, value: address[key] });
    });

    return result;
  };

  onChangeValue = (changeValues, expectedLength) => {
    if (changeValues.length === expectedLength) {
      this.shippingAddress = changeValues;
      this.shouldNavigateUser = true;
    } else {
      this.shouldNavigateUser = false;
    }
  };

  sortAddress = () => {
    const { user } = this.props;
    let address = [];
    let shippingAddress = user.shippingAddress;
    if (user.shipping) {
      shippingAddress = {
        name: user.shipping.first_name,
        email: user.email,
        apt: user.shipping.address_1,
        address: user.shipping.address_2,
        city: user.shipping.city,
        state: user.shipping.state,
        zipCode: user.shipping.postcode,
      };
    }
    if (shippingAddress && Object.keys(shippingAddress).length > 0) {
      address = this.convertAddressToArray(shippingAddress);
    }

    return address;
  };

  render() {
    const address = this.sortAddress();
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.colorSet[colorScheme];

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: currentTheme.backgroundColor }}>
        <Header title={IMLocalized('Shipping')} />
        <ProcedureImage source={AppStyles.imageSet.box} />
        <ShippingDetails
          shippingAddress={address}
          title={IMLocalized('Shipping Adress')}
          isShippinngAddress={true}
          onChangeValue={this.onChangeValue}
        />
      </KeyboardAwareScrollView>
    );
  }
}

ShippingAddressScreen.propTypes = {
  selectedPaymentMethod: PropTypes.object,
  shippingAddress: PropTypes.array,
  user: PropTypes.object,
  navigation: PropTypes.object,
  setShippingAddress: PropTypes.func,
};

const mapStateToProps = ({ checkout, app }) => {
  return {
    selectedPaymentMethod: checkout.selectedPaymentMethod,
    shippingAddress: app.user.shippingAddress,
    user: app.user,
  };
};

export default connect(mapStateToProps, {
  setShippingAddress,
  setTotalPrice,
  setUserData,
})(ShippingAddressScreen);
