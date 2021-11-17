import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import AppStyles from '../../../AppStyles';

const { width, height } = Dimensions.get('window');

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    modalStyle: {
      margin: 0,
    },
    transparentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    viewContainer: {
      width: width,
      height: height * 0.95,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    swiperContainer: {
      // alignItems: "center",
      justifyContent: 'center',
      flex: 9,
    },
    imageBackgroundContainer: {
      flex: 1.9,
      backgroundColor: '#d9d7da',
    },
    imageBackground: {
      flex: 1,
    },
    activeDot: {
      backgroundColor: 'white',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
    headerContainer: {
      flexDirection: 'row',
    },
    headerContainerStyle: {
      width: '96%',
      alignSelf: 'center',
      height: '4%',
      position: 'absolute',
      top: '2%',
    },
    headerIconContainer: {
      justifyContent: 'center',
      flex: 2,
    },
    headerIconRightContainer: {
      alignItems: 'flex-end',
    },
    headerIcon: {
      tintColor: '#a7a3a9',
      width: '74%',
      height: '75%',
    },
    headerIconspace: {
      flex: 6,
    },
    favouriteIconContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      marginBottom: 2,
    },
    favouriteContainerStyle: {
      width: '20%',
      position: 'absolute',
      top: height * 0.58,
      left: '4%',
    },
    checkBox: {
      height: 24,
      width: 24,
    },
    favouriteIconCircleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 38,
      width: 38,
      borderRadius: 19,
      backgroundColor: 'white',
    },
    favouriteIcon: {
      height: 23,
      width: 23,
      tintColor: '#df9292',
    },
    optionContainerStyle: {
      width: '20%',
      position: 'absolute',
      top: height * 0.43,
      right: '2%',
    },
    optionContainer: {
      flexDirection: 'row',
    },
    sizeContainer: {
      flex: 0.5,
    },
    colorContainer: {
      flex: 0.5,
    },

    descriptionContainer: {
      flex: 1.6,
    },
    footerContainer: {
      flex: 2.3,
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
    title: {
      fontFamily: AppStyles.fontFamily.regularFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      paddingTop: 20,
      paddingLeft: 15,
      fontSize: 17,
    },
    price: {
      fontFamily: AppStyles.fontFamily.regularFont,
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
      paddingTop: 7,
      paddingLeft: 15,
      fontSize: 15,
    },
    borderLine: {
      width: '97%',
      height: 0.5,
      alignSelf: 'center',
      marginTop: 10,
      backgroundColor: '#d9d9d9',
    },
    addToBagContainerStyle: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      flex: 2.5,
      height: '40%',
      // alignSelf: "flex-end"
    },
    buttonSpace: {
      flex: 0.01,
    },
    payContainerStyle: {
      backgroundColor: 'white',
      flex: 2.5,
      height: '40%',
      // alignSelf: "flex-end"
    },
    footerIconStyle: {
      width: 22,
      height: 22,
      marginRight: 3,
    },
  });
};

export default dynamicStyles;
