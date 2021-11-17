import React, { Component } from 'react';
import { Alert, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {
  Header,
  HeaderButton,
  CardInputFields,
  ProcedureImage,
} from '../../components';
import AppStyles from '../../AppStyles';
import { updatePaymentMethods } from '../../redux';
import { Appearance } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';

class AddACardScreen extends Component {
  constructor(props) {
    super(props);
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.navThemeConstants[colorScheme];
    const { navigation } = props;
    navigation.setOptions({
      headerTintColor: currentTheme.fontColor,
      headerTitle: '',
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
          onPress={this.onDonePress}
          buttonContainerStyle={{ marginRight: 10 }}
          title={IMLocalized('Done')}
        />
      ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      },
    });
    this.state = {
      cardNumberValue: '',
      cardDateValue: '',
      cvcValue: '',
    };
  }

  onDonePress = () => {
    const isCardNumberComplete = this.state.cardNumberValue.length === 19;
    const isCardDateComplete = this.state.cardDateValue.length === 5;
    const isCvcComplete = this.state.cvcValue.length === 3;
    const cardNumber = this.state.cardNumberValue.split(' ');
    const previousScreen = this.props.route.params.previousScreen;
    const defaultPaymentOption = {
      title: `Visa Ending in ${cardNumber[cardNumber.length - 1]}`,
      last4: `${cardNumber[cardNumber.length - 1]}`,
      key: `card${cardNumber[cardNumber.length - 1]}`,
      iconSource: AppStyles.iconSet.visaPay,
    };

    if (isCardNumberComplete & isCardDateComplete & isCvcComplete) {
      this.props.updatePaymentMethods(defaultPaymentOption);

      if (previousScreen === 'PaymentMethod') {
        this.props.navigation.replace('PaymentMethod');
      } else {
        this.props.navigation.replace('ShippingAddress');
      }
    } else {
      Alert.alert('', IMLocalized('Please fill in your card details'));
    }
  };

  onCardNumberChange = (number) => {
    let formattednumber = number.split(' ').join('');

    if (formattednumber.length > 0) {
      formattednumber = formattednumber
        .match(new RegExp('.{1,4}', 'g'))
        .join(' ');
    }

    this.setState({ cardNumberValue: formattednumber });

    return formattednumber;
  };

  onCardDateChange = (number) => {
    let formattedDate = number.split('/').join('');

    if (formattedDate.length > 0) {
      formattedDate = formattedDate.match(new RegExp('.{1,2}', 'g')).join('/');
    }

    this.setState({ cardDateValue: formattedDate });

    return formattedDate;
  };

  onCvcChange = (cvc) => {
    this.setState({ cvcValue: cvc });

    return cvc;
  };

  render() {
    const { cardNumberValue, cardDateValue, cvcValue } = this.state;
    const colorScheme = Appearance.getColorScheme();
    const currentTheme = AppStyles.colorSet[colorScheme];

    return (
      <KeyboardAwareScrollView
        extraScrollHeight={30}
        style={{ backgroundColor: currentTheme.backgroundColor }}>
        <Header title={IMLocalized('Add a Card')} />
        <ProcedureImage source={AppStyles.imageSet.creditCard} />
        <CardInputFields
          title={IMLocalized('Card')}
          iconSource={AppStyles.iconSet.creditCardIcon}
          cardNumberPlaceholder={'4242 4242 424 4242 4242'}
          onCardNumberChange={this.onCardNumberChange}
          cardNumberValue={cardNumberValue}
          cardDatePlaceholder={'MM/YY'}
          cardDateValue={cardDateValue}
          onCardDateChange={this.onCardDateChange}
          cvcPlaceholder={'CVC'}
          cvcValue={cvcValue}
          onCvcChange={this.onCvcChange}
          cardNumberMaxLength={19}
          dateMaxLength={5}
          cvcMaxLength={3}
        />
      </KeyboardAwareScrollView>
    );
  }
}

AddACardScreen.propTypes = {
  navigation: PropTypes.object,
  updatePaymentMethods: PropTypes.func,
};

export default connect(null, { updatePaymentMethods })(AddACardScreen);
