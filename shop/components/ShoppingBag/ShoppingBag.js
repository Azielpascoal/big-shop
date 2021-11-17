import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import ShoppingBagCard from './ShoppingBagCard';
import FooterButton from '../FooterButton/FooterButton';
import { useColorScheme } from 'react-native-appearance';
import { TNEmptyStateView } from '../../Core/truly-native';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';

function ShoppingBag(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const renderItem = ({ item }) => (
    <ShoppingBagCard
      item={item}
      onColorSelected={(index) => props.onColorSelected({ item, index })}
      onSizeSelected={(index) => props.onSizeSelected({ item, index })}
      productPricesByQty={props.productPricesByQty}
      onQtyChange={(totalPriceObj) => props.onQtyChange(totalPriceObj, item)}
      onLongPress={(product) => props.onLongPress(product)}
      onAttributesSelected={(selectedAttributes) =>
        props.onAttributesSelected(item, selectedAttributes)
      }
      removeFromShoppingBag={(product) => props.removeFromShoppingBag(product)}
      appConfig={props.appConfig}
    />
  );

  const emptyStateConfig = {
    title: IMLocalized('Empty Shopping Bag'),
    description: IMLocalized(
      'Your shopping bag is empty. Add products to your shopping bag and see it appear here.',
    ),
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyViewContainer}>
        <TNEmptyStateView
          appStyles={AppStyles}
          emptyStateConfig={emptyStateConfig}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.shoppingBag}
        keyExtractor={(item) => item.id.toString()}
        extraData={props.shoppingBag}
        renderItem={renderItem}
        style={{ flex: 1 }}
        ListEmptyComponent={renderEmptyList()}
      />
      {props.shoppingBag?.length > 0 && (
        <View style={styles.footerContainer}>
          <View style={styles.totalContainer}>
            <View style={styles.totalTitleContainer}>
              <Text style={styles.totalTitle}>{'Total'}</Text>
            </View>
            <View style={styles.titleCostSpace} />
            <View style={styles.totalCostContainer}>
              <Text
                style={
                  styles.totalCost
                }>{`${props.appConfig.currency}${props.totalShoppinBagPrice}`}</Text>
            </View>
          </View>
          <FooterButton
            title={'CONTINUE'}
            onPress={props.onContinuePress}
            footerTitleStyle={styles.footerTitle}
            footerContainerStyle={styles.footerButtonContainer}
          />
        </View>
      )}
    </View>
  );
}

ShoppingBag.propTypes = {
  shoppingBag: PropTypes.array,
  productPricesByQty: PropTypes.array,
  totalShoppinBagPrice: PropTypes.string,
  removeFromShoppingBag: PropTypes.func,
  onContinuePress: PropTypes.func,
  onColorSelected: PropTypes.func,
  onSizeSelected: PropTypes.func,
  onQtyChange: PropTypes.func,
  onLongPress: PropTypes.func,
};

export default ShoppingBag;
