import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  button: {
    //position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },
  menu: {
    backgroundColor: '#00213b',
  },
  submenu: {
    width: 48,
    height: 48,
    backgroundColor: '#00213b',
  },
});

export default styles;
