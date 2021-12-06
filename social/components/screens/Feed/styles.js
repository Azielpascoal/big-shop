import { StyleSheet } from 'react-native';
import AppStyles from '../../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    feedContainer: {
      paddingTop: 20,
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    emptyStateView: {
      marginTop: 80,
    },
    storiesToggleContainer: {
      position: 'absolute',
      left: 270,
      top: -10,
      elevation: 4,
      height: 400,
    },
  });
};

export default dynamicStyles;
