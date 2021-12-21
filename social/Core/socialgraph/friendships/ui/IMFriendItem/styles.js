import { StyleSheet } from 'react-native';
import AppStyles from '../../../../../AppStyles';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    friendItemContainer: {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
    },
    chatIconContainer: {
      flex: 6,
    },
    photo: {
      width: '95%',
      height: '100%',
    },
    photoContainer: {
      borderWidth: 1,
      borderColor: 'blue',
      borderRadius: 15,
      height: 100,
      width: '80%',
      marginLeft: 15,
    },
    name: {
      padding: 10,
      alignSelf: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    addFlexContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButton: {
      width: 82,
      height: 26,
      justifyContent: 'center',
      borderRadius: 12,
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke,
      marginRight: 25,
    },
    addFlexContainerFollow: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    followButton: {
      width: '90%',
      height: 30,
      justifyContent: 'center',
      borderRadius: 6,
      backgroundColor: appStyles.colorSet[colorScheme].grey6,
      color: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    followActionTitle: {
      padding: 0,
      alignSelf: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    gridItemContainer: {
      height: Math.floor(AppStyles.WINDOW_HEIGHT * 0.25),
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.3),
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      margin: 6,
    },
  });
};

export default dynamicStyles;
