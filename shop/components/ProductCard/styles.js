import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

// const { width, height } = Dimensions.get('window');

const featuredTextPadding = 3;
const { width: screenWidth } = Dimensions.get('window');
const width = screenWidth * 0.7;
const carouselHeightMultiplier = 1.52;
const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    productCardConainer: {
      width: width - 115,
      height: carouselHeightMultiplier * width - 170,
      borderRadius: 15,
      marginLeft: 5,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.36,
      shadowRadius: 15,
      elevation: 5,
    },
    productCardImageConainer: {
      width: '100%',
      height: '80%',
    },
    productCardImage: {
      width: '100%',
      height: '100%',
      borderRadius: 6,
    },
    productCardPrice: {
      textAlign: 'left',
      fontSize: 14,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.boldFont,
      paddingTop: featuredTextPadding,
    },
    productCardDescription: {
      textAlign: 'left',
      fontSize: 13,
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
      fontFamily: AppStyles.fontFamily.regularFont,
      paddingTop: featuredTextPadding,
    },
  });
};

export default dynamicStyles;
