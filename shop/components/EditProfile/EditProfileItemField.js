import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';

function EditProfileItemField(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    title,
    onChange,
    value,
    isEditable,
    placeholder,
    keyboardType,
  } = props;

  return (
    <View style={styles.itemView}>
      <Text style={styles.labelText}>{title}</Text>
      <TextInput
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
        style={styles.text}
        editable={isEditable}
        placeholderTextColor={AppStyles.colorSet[colorScheme].hairlineColor}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

EditProfileItemField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  title: PropTypes.string,
  isEditable: PropTypes.bool,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
};

export default EditProfileItemField;
