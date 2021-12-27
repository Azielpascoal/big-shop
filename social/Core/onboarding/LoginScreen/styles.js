import { I18nManager } from 'react-native';
import { StyleSheet } from 'react-native';
import { modedColor } from '../../helpers/colors';
import TNColor from '../../truly-native/TNColor';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    orTextStyle: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
    },
    title: {
      fontSize: 40,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      marginTop: 25,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 40,
    },
    logo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -40,
    },
    logoImage: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
    },
    loginContainer: {
      width: '80%',
      backgroundColor: '#5A5353',
      borderRadius: 20,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
    loginText: {
      color: '#ffffff',
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: modedColor(
        appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        TNColor('#e0e0e0'),
      ),
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    Input: {
      width: '70%',
      marginLeft: 5,
    },
    ImageInput: {
      width: 20,
      height: 20,
      marginLeft: 5,
      tintColor: appStyles.colorSet[colorScheme].grey3,
    },

    facebookContainer: {
      width: '70%',
      backgroundColor: '#4267B2',
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
    googleButtonStyle: {
      alignSelf: 'center',
      marginTop: 15,
      padding: 5,
      elevation: 0,
    },
    appleButtonContainer: {
      width: '70%',
      height: 40,
      marginTop: 16,
      alignSelf: 'center',
    },
    facebookText: {
      color: '#ffffff',
      fontSize: 14,
    },
    phoneNumberContainer: {
      marginTop: 20,
      color: '#160226',
    },
    phoneNumberContainerText: {
      color: '#160226',
    },
    forgotPasswordContainer: {
      width: '80%',
      alignSelf: 'center',
      alignItems: 'flex-end',
    },
    forgotPasswordText: {
      fontSize: 14,
      padding: 8,
      color: '#160226',
    },
  });
};

export default dynamicStyles;
