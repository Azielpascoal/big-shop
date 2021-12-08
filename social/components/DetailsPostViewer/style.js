import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      position: 'absolute',
      marginTop: 450,
      alignSelf: 'center',
      flexDirection: 'row',
    },
    containerImage: {
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.32),
      alignSelf: 'center',
      height: AppStyles.WINDOW_HEIGHT * 0.25,
      borderRadius: 25,
      backgroundColor: '#ddd',
      marginLeft: -30,
      borderColor: '#fff',
      borderWidth: 2,
    },
  });
};

export default dynamicStyles;
