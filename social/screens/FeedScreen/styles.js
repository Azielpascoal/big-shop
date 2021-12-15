import { StyleSheet } from 'react-native';

const navIconSize = 25;
const imageWidth = 34;

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  doubleNavIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIcon: {
    width: navIconSize,
    height: navIconSize,
    margin: 6,
  },
  navIconMenuOptions: {
    flexDirection: 'row',
    width: null,
  },
  userImage: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: Math.floor(imageWidth / 2),
    borderWidth: 0,
  },
  userImageContainer: {
    width: imageWidth,
    height: imageWidth,
    borderWidth: 0,
    margin: 2,
  },
  userImageMainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4852D9',
    borderRadius: 50,
  },
});

export default styles;
