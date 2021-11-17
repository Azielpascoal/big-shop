import { StyleSheet, Dimensions } from 'react-native';
// import AppStyles from "../../AppStyles";

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyViewContainer: {
    marginTop: height / 6,
  },
});

export default styles;
