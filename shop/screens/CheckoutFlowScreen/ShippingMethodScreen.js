import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Header,
  ProcedureImage,
  ShippingDetails,
  HeaderButton,
} from '../../components';
import { setSelectedShippingMethod, setTotalPrice } from '../../redux/';
import AppStyles from '../../AppStyles';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';

class ShippingMethodScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { route, navigation } = props;
    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
      headerBackTitle: IMLocalized('Shopping Bag'),
      headerTintColor: currentTheme.fontColor,
      headerRight: () => (
        <HeaderButton
          onPress={this.navigateUser}
          buttonContainerStyle={{ marginRight: 10 }}
          title={'Done'}
        />
      ),
    });
    this.state = {
      cardNumberValue: '',
    };
    this.appConfig = route.params.appConfig;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      navigateUser: this.navigateUser,
    });
    this.props.setSelectedShippingMethod(
      this.props.shippingMethods[this.props.selectedShipppingMethodIndex],
    );
  }

  onShippingMethodSelected = (selectedIndex) => {
    this.props.setSelectedShippingMethod(
      this.props.shippingMethods[selectedIndex],
    );
  };

  navigateUser = () => {
    this.props.setTotalPrice();
    this.props.navigation.replace('Checkout', { appConfig: this.appConfig });
  };

  onChangeValue = () => {};

  render() {
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.colorSet[colorScheme];
    return (
      <View style={{ backgroundColor: currentTheme.backgroundColor, flex: 1 }}>
        <Header title={IMLocalized('Shipping')} />
        <ProcedureImage source={AppStyles.imageSet.box} />
        <ShippingDetails
          selectedShipppingMethodIndex={this.props.selectedShipppingMethodIndex}
          isShippinngMethod={true}
          shippingMethods={this.props.shippingMethods}
          shippingAddress={this.props.shippingAddress}
          onShippingMethodSelected={this.onShippingMethodSelected}
          title={IMLocalized('Shipping Method')}
          onChangeValue={this.onChangeValue}
        />
      </View>
    );
  }
}

ShippingMethodScreen.propTypes = {
  onShippingMethodSelected: PropTypes.func,
  shippingMethods: PropTypes.array,
  shippingAddress: PropTypes.array,
  setSelectedShippingMethod: PropTypes.func,
  selectedShipppingMethodIndex: PropTypes.number,
  navigation: PropTypes.object,
  setTotalPrice: PropTypes.func,
};

const mapStateToProps = ({ checkout, app }) => {
  return {
    selectedShippingMethod: checkout.selectedShippingMethod,
    shippingMethods: checkout.shippingMethods,
    shippingAddress: app.user.shippingAddress,
    selectedShipppingMethodIndex: checkout.selectedShipppingMethodIndex,
  };
};

export default connect(mapStateToProps, {
  setSelectedShippingMethod,
  setTotalPrice,
})(ShippingMethodScreen);
