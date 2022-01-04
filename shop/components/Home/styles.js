import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flex: 1,
    },
    container1: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flex: 1,
      flexDirection: 'row',
    },
    carouselContainer: {
      marginTop: 18,
    },
    carouselTitleText: {
      textAlign: 'left',
      fontSize: 20,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      marginTop: 10,
      marginLeft: 20,
      marginBottom: 12,
    },
    unitContainer: {
      marginTop: 20,
      marginLeft: 7,
    },
    unitTitle: {
      textAlign: 'left',
      fontSize: 20,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      marginLeft: 7,
      marginBottom: 7,
    },
    flatlist: {
      width: '90%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerCategory: {
      width: '90%',
    },
  });
};

export default dynamicStyles;
