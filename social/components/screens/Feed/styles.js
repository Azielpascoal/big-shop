import { StyleSheet } from 'react-native';
import AppStyles from '../../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    feedContainer: {
      marginTop: 3,
      paddingTop: 20,
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    emptyStateView: {
      marginTop: 80,
    },
    storiesToggleContainer: {
      position: 'absolute',
      elevation: 4,
      height: 400,
      width: 200,
      alignItems: 'center',
      top: -10,
      left: 200,
    },
    iconStories: {
      alignItems: 'center',
    },
  });
};

export default dynamicStyles;
