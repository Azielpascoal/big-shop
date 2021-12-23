import { StyleSheet, Dimensions } from 'react-native';
import AppStyles from '../../../../../AppStyles';
const imageWidth = Dimensions.get('window').width / 4.0;
const userImageWidth = Dimensions.get('window').width / 6.0;
const userImagePosition = Dimensions.get('window').width / 2;
const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
    },
    //Profile Settings
    settingsTitleContainer: {
      width: '90%',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      marginTop: 30,
    },
    settingsBack: {
      width: '90%',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      marginTop: 20,
    },
    settingsTitle: {
      color: appStyles.colorSet[colorScheme].headerTintColor,
      paddingLeft: 10,
      fontSize: 32,
      paddingBottom: 6,
    },
    settingsTitleBold: {
      color: appStyles.colorSet[colorScheme].headerTintColor,
      paddingLeft: 10,
      fontSize: 32,
      paddingBottom: 6,
      fontWeight: 'bold',
    },
    settingsTypesContainer: {
      width: '96%',
      alignSelf: 'center',
      marginTop: 10,
    },
    settingsTypeContainer: {
      width: '90%',
      backgroundColor: '#fff',
      borderColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      marginTop: 10,
      borderRadius: 25,
      alignSelf: 'center',
    },
    settingsTypeContainerImage: {
      width: 20,
      height: 20,
    },
    settingsType: {
      color: appStyles.colorSet[colorScheme].headerTintColor,
      fontSize: 14,
      fontWeight: '500',
      width: '90%',
    },

    //Edit Profile
    contentContainer: {
      width: '100%',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].hairlineColor,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    divider: {
      height: 0.5,
      width: '96%',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
    },
    text: {
      fontSize: 14,
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },

    //app Settings
    appSettingsTypeContainer: {
      flexDirection: 'row',
      borderBottomWidth: 0,
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    appSettingsSaveContainer: {
      marginTop: 50,
      height: 45,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    placeholderTextColor: {
      color: appStyles.colorSet[colorScheme].hairlineColor,
    },
    userImage: {
      width: userImageWidth,
      height: userImageWidth,
      borderRadius: Math.floor(imageWidth / 2),
      borderWidth: 0,
    },
    userImageContainer: {
      width: imageWidth,
      height: imageWidth,
      borderWidth: 0,
    },
    userImageMainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    userName: {
      fontSize: 13,
      textAlign: 'center',
      fontWeight: '600',
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      // paddingTop: 15,
    },
    userCard: {
      width: 220,
      height: 150,
      alignSelf: 'center',
      backgroundColor: '#fff',
      marginTop: 40,
      borderRadius: 20,
    },
    userCardContainer: {
      width: userImagePosition,
      marginTop: -50,
      alignSelf: 'center',
    },
  });
};

export default dynamicStyles;
