import { StyleSheet, Dimensions } from 'react-native';
import AppStyles from '../../AppStyles';

const { height } = Dimensions.get('window');

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    emptyViewContainer: {
      marginTop: height / 6,
    },
  });
};

export default dynamicStyles;
