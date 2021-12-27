import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    flatListContainer: {
      height: height,
      width: width,
    },
    emptyViewContainer: {
      marginTop: height / 5,
    },
  });
};

export default dynamicStyles;
