import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const { width, height } = Dimensions.get('window');

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    categoryImageContainer: {
      alignItems: 'stretch',
      justifyContent: 'center',
      // width: width * 0.67,
      // height: height * 0.082,
      margin: 5,
      marginLeft: 7,
    },
    categoryImage: {
      borderRadius: 0,
    },
    categoryTextContainerView: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgba(0,0,0,.55)',
      // borderRadius: 6,
    },
    categoryText: {
      color: 'black',
      textAlign: 'center',
      justifyContent: 'center',
      opacity: 1.0,
      fontFamily: AppStyles.fontFamily.semiBoldFont,
    },
  });
};

export default dynamicStyles;
