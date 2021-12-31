import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      width: '92%',
      alignSelf: 'center',
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputArea: {
      width: '75%',
      height: 40,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: AppStyles.colorSet[colorScheme].hairlineColor,
      flexDirection: 'row',
    },
    inputIcon: {
      tintColor: AppStyles.colorSet[colorScheme].hairlineColor,
      height: 20,
      width: 20,
      margin: 10,
    },
    inputText: {
      width: '80%',
      height: 40,
      marginLeft: 10,
    },
    filterMenuArea: {
      width: 35,
      height: 35,
      marginLeft: 10,
      borderRadius: 9,
      backgroundColor: '#f00',
    },
    filterMenuAreaIcon: {
      width: '100%',
      height: '100%',
    },
  });
};
export default dynamicStyles;
