import { StyleSheet } from 'react-native';
import AppStyles from '../../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    feedContainer: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    emptyStateView: {
      marginTop: 80,
    },
    storiesToggleContainer: {
      position: 'absolute',
      left: '75%',
      top: '0.5%',
    },
  });
};

export default dynamicStyles;
