import { Dimensions, StyleSheet } from 'react-native';
import AppStyles from '../../../AppStyles';

// const imageContainerWidth = 66;
const imageWidth = Dimensions.get('window').width / 4.0;
const userImageWidth = Dimensions.get('window').width / 5.0;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      alignItems: 'center',
    },
    progressBar: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      height: 3,
      shadowColor: '#000',
      width: 0,
      borderTopWidth: 2,
      borderTopColor: 'black',
    },
    subContainer: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      alignItems: 'center',
      marginBottom: 10,
      // width: '100%',
    },
    userCardContainer: {
      // width: '100%',
    },
    countItemsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    countContainer: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    countContainerBorder: {
      borderRightWidth: 1,
      width: 10,
      height: 30,
      borderColor: AppStyles.colorSet[colorScheme].grey6,
    },
    userImage: {
      width: userImageWidth,
      height: userImageWidth,
      borderRadius: Math.floor(imageWidth / 2),
      borderWidth: 0,
    },
    userImageContainer: {
      width: imageWidth,
      height: imageWidth,
      borderWidth: 0,
      margin: 18,
    },
    userImageMainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    count: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 15,
      fontWeight: '600',
    },
    countTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 14,
      fontWeight: '400',
    },
    userName: {
      fontSize: 13,
      textAlign: 'center',
      fontWeight: '600',
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      // paddingTop: 15,
    },
    profileSettingsButtonContainer: {
      width: '92%',
      height: 40,
      borderRadius: 8,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginVertical: 9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileSettingsTitle: {
      color: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontSize: 13,
      fontWeight: '600',
    },
    gridItemContainer: {
      height: Math.floor(AppStyles.WINDOW_HEIGHT * 0.18),
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.318),
      // width: Math.floor(AppStyles.WINDOW_WIDTH * 0.324),
      // borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.013),
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      margin: 2,
    },
    gridItemImage: {
      height: '95%',
      width: '80%',
      borderRadius: 18,
      marginLeft: 30,
    },
    FriendsTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 20,
      fontWeight: '600',
      alignSelf: 'flex-start',
      padding: 10,
    },
    FriendsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '98%',
    },
    friendCardContainer: {
      height: Math.floor(AppStyles.WINDOW_HEIGHT * 0.18),
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.292),
      borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.013),
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'flex-start',
      overflow: 'hidden',
      margin: 5,
    },
    friendCardImage: {
      height: '75%',
      width: '100%',
    },
    friendCardTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 13,
      padding: 4,
    },
    subButtonColor: {
      backgroundColor: AppStyles.colorSet[colorScheme].subButtonColor,
    },
    titleStyleColor: { color: AppStyles.colorSet[colorScheme].mainTextColor },
  });
};

export default dynamicStyles;
