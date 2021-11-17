import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ColorCheckBox from '../ColorCheckBox/ColorCheckBox';
import SizeCheckBox from '../SizeCheckBox/SizeCheckBox';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function CardContent(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const { contentContainer, item, price } = props;

  const [selectedColorIndex, setSelectedColorIndex] = useState(
    props.item.selectedColorIndex ? props.item.selectedColorIndex : 0,
  );
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    props.item.selectedSizeIndex ? props.item.selectedSizeIndex : 0,
  );

  const onColorSelected = (index) => {
    setSelectedColorIndex(index);
    props.onColorSelected(index);
  };

  const onSizeSelected = (index) => {
    setSelectedSizeIndex(index);
    props.onSizeSelected(index);
  };

  return (
    <View style={contentContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.colorOptionContainer}>
          <View style={styles.colorOptionTitleContainer}>
            <Text style={styles.color}>{item.colors && 'Color'}</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            {item.colors &&
              item.colors.map((color, index) => (
                <ColorCheckBox
                  containerStyle={[
                    styles.checkBox,
                    { borderColor: '#f2f2f3', borderWidth: 1.5 },
                  ]}
                  key={index + ''}
                  color={color}
                  selectedIndex={selectedColorIndex}
                  onPress={() => onColorSelected(index)}
                  index={index}
                />
              ))}
          </View>
        </View>
        <View style={styles.sizeOptionContainer}>
          <View style={styles.colorOptionTitleContainer}>
            <Text style={styles.size}>{item.sizes && 'Size'}</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            {item.sizes &&
              item.sizes.map((size, index) => (
                <SizeCheckBox
                  containerStyle={styles.checkBox}
                  key={index + ''}
                  size={size}
                  selectedIndex={selectedSizeIndex}
                  onPress={() => onSizeSelected(index)}
                  index={index}
                />
              ))}
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
}

CardContent.propTypes = {
  contentContainer: PropTypes.object,
  item: PropTypes.object,
  price: PropTypes.string,
  onColorSelected: PropTypes.func,
  onSizeSelected: PropTypes.func,
};

export default CardContent;
