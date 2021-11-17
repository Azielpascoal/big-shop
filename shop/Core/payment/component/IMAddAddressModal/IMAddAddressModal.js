import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-native-button';
import dynamicStyles from './styles';
import { IMLocalized } from '../../../localization/IMLocalization';

import { setShippingAddress } from '../../redux/checkout';
import { setUserData } from '../../../onboarding/redux/auth';
import { updateUserShippingAddress } from '../../api/address';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyBKyP60M6uX8_TUqeE5qoZiq2bsEdm9dEE');

function IMAddAddressModal(props) {
  const appStyles = props.route.params.appStyles;
  const appConfig = props.route.params.appConfig;

  const currentUser = useSelector((state) => state.auth.user);
  const reduxShippingAddress = useSelector(
    (state) => state.checkout.shippingAddress,
  );
  const dispatch = useDispatch();

  const styles = dynamicStyles(appStyles);

  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <View />,
      headerTitle: IMLocalized('Delivery Address'),
    });
    var savedAddress =
      (reduxShippingAddress &&
        reduxShippingAddress.postalCode &&
        reduxShippingAddress) ||
      currentUser.shippingAddress;
    if (savedAddress) {
      setCity(savedAddress.city);
      setCountry(savedAddress.country);
      setLine1(savedAddress.line1);
      setLine2(savedAddress.line2);
      setPostalCode(savedAddress.postalCode);
    }
  }, [1]);

  const allFieldsCompleted = () => {
    if (city === '') {
      return false;
    } else if (country === '') {
      return false;
    } else if (line1 === '') {
      return false;
    } else if (line2 === '') {
      return false;
    } else if (postalCode === '') {
      return false;
    }

    return true;
  };

  const onSaveAddressPress = async () => {
    if (!allFieldsCompleted()) {
      Alert.alert(
        IMLocalized('Incomplete Address'),
        IMLocalized(
          'Please fill out all the required fields. We need your shipping address to deliver the order.',
        ),
      );
      return;
    }

    try {
      // For a given address, we calculate what the precise coordinate, using Google Geocoding API
      const json = await Geocoder.from(
        `${line1} ${line2} ${city} ${country} ${postalCode}`,
      );
      var location = json.results[0].geometry.location;

      var shippingAddress = {
        city,
        country,
        line1,
        line2,
        name: `${currentUser.firstName || ''} ${currentUser.lastName || ''}`,
        postalCode,
        location: {
          latitude: location.lat,
          longitude: location.lng,
        },
      };

      if (currentUser.phone) {
        shippingAddress.phone = currentUser.phone;
      }
      if (currentUser.email) {
        shippingAddress.email = currentUser.email;
      }

      //if (!currentUser.shippingAddress) { // Uncomment this if you don't want to override the customer's address after every order
      // If the user did not have an address, we save this one to database, to be used for future orders
      storeUserShippingAddress(shippingAddress);
      //}
      dispatch(setShippingAddress(shippingAddress));
      props.navigation.navigate('Cards', { appConfig, appStyles });
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const storeUserShippingAddress = (address) => {
    updateUserShippingAddress(currentUser.id, address);
    // Optimistically update local user object in redux with the new address
    dispatch(
      setUserData({ user: { ...currentUser, shippingAddress: address } }),
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.horizontalPane}>
          <Text style={styles.textInputLabel}>{IMLocalized('Line 1')}</Text>
          <TextInput
            placeholder={'103 Steiner St'}
            style={styles.textInput}
            value={line1}
            onChangeText={(text) => setLine1(text)}
          />
        </View>
        <View style={styles.horizontalPane}>
          <Text style={styles.textInputLabel}>{IMLocalized('Line 2')}</Text>
          <TextInput
            placeholder={'Apt #6400'}
            style={styles.textInput}
            value={line2}
            onChangeText={(text) => setLine2(text)}
          />
        </View>
        <View style={styles.horizontalPane}>
          <Text style={styles.textInputLabel}>{IMLocalized('Zipcode')}</Text>
          <TextInput
            placeholder={IMLocalized('94102')}
            style={styles.textInput}
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
          />
        </View>
        <View style={styles.horizontalPane}>
          <Text style={styles.textInputLabel}>{IMLocalized('City')}</Text>
          <TextInput
            placeholder={'London'}
            style={styles.textInput}
            value={city}
            onChangeText={(text) => setCity(text)}
          />
        </View>
        <View style={styles.horizontalPane}>
          <Text style={styles.textInputLabel}>{IMLocalized('Country')}</Text>
          <TextInput
            placeholder={'United States'}
            style={styles.textInput}
            value={country}
            onChangeText={(text) => setCountry(text)}
          />
        </View>
        <Button
          containerStyle={styles.actionButtonContainer}
          onPress={onSaveAddressPress}
          style={styles.actionButtonText}>
          {IMLocalized('SAVE ADDRESS')}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default IMAddAddressModal;
