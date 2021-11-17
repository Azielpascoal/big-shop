import { widthPercentageToDP as w } from 'react-native-responsive-screen';
import { Appearance } from 'react-native-appearance';
import { StyleSheet, I18nManager } from 'react-native';

const COLOR_SCHEME = Appearance.getColorScheme();

const dynamicStyles = (appStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: w(100),
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      alignSelf: 'center',
      marginTop: 20,
    },
    modal: {
      justifyContent: 'flex-end',
    },
    horizontalPane: {
      flexDirection: 'row',
      padding: 3,
      justifyContent: 'space-between',
      marginVertical: 10,
      alignItems: 'center',
    },
    textInputLabel: {
      fontSize: 14,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      width: w(50),
      textAlign: 'right',
      flex: 1,
      marginRight: 10,
      fontWeight: 'bold',
    },
    textInput: {
      fontSize: appStyles.fontSet.normal,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      width: w(50),
      textAlign: 'left',
      flex: 3,
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[COLOR_SCHEME].grey3,
      paddingLeft: 20,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 5,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      marginRight: 20,
    },
    actionButtonContainer: {
      padding: 16,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      marginVertical: 30,
    },
    actionButtonText: {
      fontFamily: appStyles.fontFamily.bold,
      color: 'white',
      fontSize: 14,
    },
  });

export default dynamicStyles;
