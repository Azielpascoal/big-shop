import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const { width: screenWidth } = Dimensions.get('window');
const width = screenWidth * 0.7;
const carouselHeightMultiplier = 1.52;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      width: width - 115,
      alignSelf: 'center',
      marginLeft: 10,
    },
    carouselProductViewContainer: {
      width: width - 115,
      height: carouselHeightMultiplier * width - 170,
      borderRadius: 15,
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
      elevation: 9,
    },
    carouselProductViewImage: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    carouselProductViewTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 14,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
      marginTop: 10,
      marginLeft: 5,
    },
    carouselProductViewPrice: {
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
      fontSize: 14,
      fontFamily: AppStyles.fontFamily.mediumFont,
      marginTop: 4,
      marginLeft: 5,
    },
  });
};

export default dynamicStyles;
