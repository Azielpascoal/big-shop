import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import ProductCard from '../ProductCard/ProductCard';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function Featured(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const renderItem = ({ item, index }) => (
    <ProductCard
      onPress={() => props.onCardPress(item)}
      key={index + ''}
      item={item}
      appConfig={props.appConfig}
    />
  );

  const { featuredProducts, title } = props;

  return (
    <View style={styles.unitContainer}>
      <Text style={styles.unitTitle}>{title}</Text>
      <FlatList
        // showsHorizontalScrollIndicator={false}
        data={featuredProducts}
        contentContainerStyle={styles.flatlist}
        keyExtractor={(item, index) => index.toString()}
        // horizontal={true}
        extraData={featuredProducts}
        renderItem={renderItem}
      />
    </View>
  );
}

Featured.propTypes = {
  title: PropTypes.string,
  featuredProducts: PropTypes.array,
  navigation: PropTypes.func,
  onCardPress: PropTypes.func,
};

export default Featured;
