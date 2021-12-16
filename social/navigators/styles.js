import { StyleSheet, Platform } from 'react-native';
import AppStyles from '../AppStyles';

const imageWidth = 34;

const styles = StyleSheet.create({
  searchBarContainer: {
    width: Platform.OS === 'ios' ? '120%' : '100%',
  },
  // cancelButtonText: {
  //   color: AppStyles.colorSet[colorScheme].mainSubtextColor,
  //   fontSize: 18,
  // },
  searchInput: {
    fontSize: 17,
  },
  tabNavigatorIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconStyles: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
