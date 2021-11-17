import { StyleSheet, Platform } from 'react-native';
import AppStyles from '../AppStyles';

const styles = StyleSheet.create({
  searchBarContainer: {
    width: Platform.OS === 'ios' ? '120%' : '100%',
  },
  cancelButtonText: {
    fontSize: 18,
  },
  searchInput: {
    fontSize: 17,
  },
});

export default styles;
