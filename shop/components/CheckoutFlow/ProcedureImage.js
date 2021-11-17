import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function ProcedureImage(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { procedureImageContainerStyle, procedureImageStyle, source } = props;

  return (
    <View
      style={[styles.procedureImageContainer, procedureImageContainerStyle]}>
      <Image
        source={source}
        resizeMode="contain"
        style={[styles.procedureImage, procedureImageStyle]}
      />
    </View>
  );
}

ProcedureImage.propTypes = {
  procedureImageContainerStyle: PropTypes.any,
  procedureImageStyle: PropTypes.any,
  source: PropTypes.any,
};

export default ProcedureImage;
