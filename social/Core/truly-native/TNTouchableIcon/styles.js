import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    headerButtonContainer: {
      padding: 10,
    },
    Image: {
      width: 20,
      height: 20,
      margin: 6,
    },
    title: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 12,
    },
  });
};

export default dynamicStyles;
