import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const dynamicStyles = {
  container: {
    flex: 1,
  },
  emptyViewContainer: {
    marginTop: height / 6,
  },
};

export default dynamicStyles;
