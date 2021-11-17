import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import AppStyles from '../../AppStyles';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function ColorCheckBox(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { color, index, containerStyle, selectedIndex, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.colorOptionBox,
        containerStyle,
        { backgroundColor: color },
      ]}>
      {index === selectedIndex && (
        <Image
          style={styles.selectedColorIcon}
          source={AppStyles.iconSet.simpleCheck}
        />
      )}
    </TouchableOpacity>
  );
}

ColorCheckBox.propTypes = {
  color: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  selectedIndex: PropTypes.number,
  containerStyle: PropTypes.any,
};

export default ColorCheckBox;
