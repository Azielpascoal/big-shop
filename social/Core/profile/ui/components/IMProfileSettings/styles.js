import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].bottomStyleColor,
    },
    //Profile Settings
    settingsTitleContainer: {
      width: '100%',
      height: 55,
      justifyContent: 'flex-end',
    },
    settingsTitle: {
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
      paddingLeft: 10,
      fontSize: 14,
      paddingBottom: 6,
      fontWeight: '500',
    },
    settingsTypesContainer: {
      width: '96%',
      alignSelf: 'center',
      marginTop: 10,
    },
    settingsTypeContainer: {
      borderColor: appStyles.colorSet[colorScheme].grey6,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      marginTop: 10,
      borderRadius: 12,
    },
    settingsType: {
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
      fontSize: 14,
      fontWeight: '500',
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
  });
};

export default dynamicStyles;
