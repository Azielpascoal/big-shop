import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import CategoryCard from '../CategoryCard/CategoryCard';

function Categories(props) {
  const { categories } = props;

  const renderItem = ({ item }) => (
    <CategoryCard
      onCategoryPress={() => props.onCategoryPress(item)}
      item={item}
    />
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={{
        width: '90%',
        alignSelf: 'center',
      }}
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      extraData={categories}
      renderItem={renderItem}
    />
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryPress: PropTypes.func,
  navigation: PropTypes.object,
};

export default Categories;
