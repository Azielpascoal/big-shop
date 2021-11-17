import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

// const { width, height } = Dimensions.get("window");
const itemIconSize = 26;
const itemNavigationIconSize = 23;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].grey0,
    },
    cardContainer: {
      flex: 1,
    },
    cardImageContainer: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardImage: {
      height: 130,
      width: 130,
      borderRadius: 65,
    },
    cardNameContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardName: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.boldFont,
      fontSize: 19,
      paddingTop: 13,
    },
    profileCardContainer: {
      flex: 3,
      marginTop: 15,
    },
    profileItemContainer: {
      flex: 5.9,
      marginTop: 16,
    },
    itemContainer: {
      flexDirection: 'row',
      height: 54,
      width: '85%',
      alignSelf: 'center',
      marginBottom: 10,
    },
    itemIconContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemIcon: {
      height: itemIconSize,
      width: itemIconSize,
    },
    itemTitleContainer: {
      flex: 6,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    itemTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontFamily: AppStyles.fontFamily.regularFont,
      fontSize: 17,
      paddingLeft: 20,
    },
    itemNavigationIconContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemNavigationIcon: {
      height: itemNavigationIconSize,
      width: itemNavigationIconSize,
      tintColor: AppStyles.colorSet[colorScheme].hairlineColor,
    },
    footerButtonContainer: {
      flex: 2,
      justifyContent: 'flex-start',
      marginTop: 8,
    },
    footerContainerStyle: {
      borderColor: AppStyles.colorSet[colorScheme].hairlineColor,
    },
    blank: {
      flex: 0.5,
    },
  });
};

export default dynamicStyles;
