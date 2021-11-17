import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ProductCard from '../ProductCard/ProductCard';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

const { width } = Dimensions.get('window');

function ProductGrid(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const {
    products,
    ListFooterComponent,
    itemContainerStyle,
    ListEmptyComponent,
  } = props;

  const renderItem = ({ item, index }) => (
    <ProductCard
      key={index}
      item={item}
      appConfig={props.appConfig}
      onPress={() => props.onCardPress(item)}
      cardConainerStyle={{ width: 0.41 * width }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatGrid
        data={products}
        extraData={products}
        itemDimension={0.41 * width}
        itemContainerStyle={itemContainerStyle}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  ListFooterComponent: PropTypes.any,
  itemContainerStyle: PropTypes.object,
  navigation: PropTypes.func,
  onCardPress: PropTypes.func,
};

export default ProductGrid;
