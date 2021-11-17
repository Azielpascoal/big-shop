import { StyleSheet, Platform, Dimensions } from 'react-native';
// import AppStyles from '../AppStyles';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  searchBarContainer: {
    width: width - 100, // Platform.OS === 'ios' ? '120%' : '80%',
  },
  cancelButtonText: {
    fontSize: 18,
  },
  searchInput: {
    fontSize: 17,
  },
});

export default styles;
