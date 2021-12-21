import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const reactionIconSize = Math.floor(AppStyles.WINDOW_WIDTH * 0.09);
const imageWidth = 34;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      // width: Math.floor(AppStyles.WINDOW_WIDTH * 0.97),
      width: '100%',
      alignSelf: 'center',
      backgroundColor: 'blue',
      marginBottom: 9,
      borderRadius: 25,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      top: 10,
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
    },
    userImageMainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    reactionTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainSubtitleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    subtitleContainer: {
      flex: 1.3,
    },
    title: {
      color: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 27,
      textShadowColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      textShadowOffset: { width: 0.1, height: 0.1 },
      textShadowRadius: 0.5,
    },
    iconTitle: {
      color: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
    subtitle: {
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
      fontSize: 11,
    },
    body: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 12,
      lineHeight: 18,
      paddingBottom: 7,
    },
    moreText: {
      color: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontSize: 9,
      lineHeight: 18,
      paddingBottom: 15,
      paddingHorizontal: 12,
    },
    moreIconContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    moreIcon: {
      height: 20,
      width: 20,
      tintColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      margin: 0,
    },
    bodyTitleContainer: {
      marginHorizontal: 8,
    },
    bodyImageContainer: {
      height: AppStyles.WINDOW_HEIGHT * 0.5,
    },
    bodyImage: {
      height: '100%',
      width: '100%',
      backgroundColor: AppStyles.colorSet[colorScheme].whiteSmoke,
    },
    inactiveDot: {
      backgroundColor: 'rgba(255,255,255,.3)',
      width: 6,
      height: 6,
      borderRadius: 3,
      marginLeft: 3,
      marginRight: 3,
    },
    activeDot: {
      backgroundColor: '#fff',
      width: 6,
      height: 6,
      borderRadius: 3,
      marginLeft: 3,
      marginRight: 3,
    },
    reactionContainer: {
      flexDirection: 'row',
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      position: 'absolute',
      bottom: 2,
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.68),
      height: 48,
      borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.07),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 2,
    },
    reactionIconContainer: {
      margin: 3,
      padding: 0,
      backgroundColor: 'powderblue',
      width: reactionIconSize,
      height: reactionIconSize,
      borderRadius: reactionIconSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    reactionIcon: {
      width: reactionIconSize,
      height: reactionIconSize,
      margin: 0,
    },
    // masearuments need to be put right for any screen.
    footerContainer: {
      flexDirection: 'row',
      position: 'absolute',
      left: 0,
      top: 420,
      margin: 8,
    },
    footerIconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(9,9,9,.3)',
      marginRight: 10,
      borderRadius: 10,
      width: 100,
      height: 30,
    },
    footerIcon: {
      height: 20,
      width: 20,
    },
    mediaVideoLoader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    soundIconContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    soundIcon: {
      tintColor: '#fff',
      width: 19,
      height: 19,
    },
    tintColor: {
      tintColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
  });
};

export default dynamicStyles;
