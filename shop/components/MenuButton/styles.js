import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    headerButtonContainer: {
      padding: 10,
    },
    headerButtonImage: {
      tintColor: AppStyles.colorSet[colorScheme].mainTextColor,
      justifyContent: 'center',
      width: 25,
      height: 25,
      margin: 6,
    },
  });
};

export default dynamicStyles;
