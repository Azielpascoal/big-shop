import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.7),
      alignSelf: 'center',
      height: AppStyles.WINDOW_HEIGHT * 0.7,
      borderRadius: 15,
      backgroundColor: '#ddd',
    },
  });
};
