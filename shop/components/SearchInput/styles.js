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
      borderRadius: 12,
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
      width: 40,
      height: 40,
      marginLeft: 10,
      borderRadius: 9,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.36,
      shadowRadius: 15,
      elevation: 5,
    },
    filterMenuAreaIcon: {
      width: 25,
      height: 25,
      tintColor: '#000',
    },
  });
};
export default dynamicStyles;
