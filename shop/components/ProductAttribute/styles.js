import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const optionBoxSize = 23;
const optionBoxMargin = 7;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    sizeOptionBox: {
      height: optionBoxSize,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
      backgroundColor: 'white',
      margin: optionBoxMargin,
      borderWidth: 0.5,
      borderColor: AppStyles.colorSet[colorScheme].mainSubtextColor,
    },
    selectedSizeOptionBox: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    size: {
      textAlign: 'center',
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
      fontFamily: AppStyles.fontFamily.boldFont,
    },
    selectedSize: {
      color: 'white',
    },
  });
};

export default dynamicStyles;
