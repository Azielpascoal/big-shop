import { StyleSheet, Dimensions } from 'react-native';
import AppStyles from '../../AppStyles';

const { width, height } = Dimensions.get('window');

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    footerContainer: {
      height: height * 0.064,
      width: '92%',
      margin: 5,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderRadius: 4,
      borderColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginBottom: 50,
      flexDirection: 'row',
    },
    footerTitle: {
      fontSize: 17,
      // padding: 10,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
    },
  });
};

export default dynamicStyles;
