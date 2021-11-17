import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// import Modal from 'react-native-modal';
import AppStyles from '../../../AppStyles';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function Favourite(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { favouriteContainerStyle, isFavourite, onPress } = props;

  return (
    <View style={[styles.favouriteIconContainer, favouriteContainerStyle]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.favouriteIconCircleContainer}>
        <Image
          style={styles.favouriteIcon}
          source={
            isFavourite
              ? AppStyles.iconSet.wishlistFilled
              : AppStyles.iconSet.wishlistUnFilled
          }
        />
      </TouchableOpacity>
    </View>
  );
}

Favourite.propTypes = {
  favouriteContainerStyle: PropTypes.object,
  iconSource: PropTypes.any,
  onPress: PropTypes.func,
  isFavourite: PropTypes.bool,
};

export default Favourite;
