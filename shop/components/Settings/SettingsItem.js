import React from 'react';
import { Switch, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function SettingsItem(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { title, value, onValueChange } = props;

  return (
    <View style={styles.itemView}>
      <Text style={styles.text}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        style={styles.switch}
      />
    </View>
  );
}

SettingsItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
};

export default SettingsItem;
