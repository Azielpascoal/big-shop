import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import CardContent from './CardContent';
import QuantityControl from './QuantityControl';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import dynamicStyles from './styles';

function ShoppingBagCard(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { item } = props;
  const [itemQty, setItemQty] = useState(item.quantity || 1);
  const totalPrice = (item.price * itemQty).toFixed(2);

  useEffect(() => {
    const product = props.productPricesByQty.find((product) => {
      return product.id === props.item.id;
    });

    if (product) {
      // setItemQty(product.qty);
    }
  }, []);

  useEffect(() => {
    itemQty === 0 && onItemEqualsZero();
  }, [itemQty]);

  const increaseQty = () => {
    const newQty = itemQty + 1;
    setItemQty(newQty);
    setObjForOnQtyChange(newQty);
  };

  const decreaseQty = () => {
    const newQty = itemQty === 0 ? itemQty : itemQty - 1;
    setItemQty(newQty);
    setObjForOnQtyChange(newQty);
  };

  const setObjForOnQtyChange = (newQty) => {
    const obj = {
      id: props.item.id,
      qty: newQty,
      totalPrice: props.item.price * newQty,
    };

    props.onQtyChange(obj);
  };

  const onItemEqualsZero = () => {
    Alert.alert(
      IMLocalized('Remove Item'),
      IMLocalized('Are you sure you want to remove this item from the cart?'),
      [
        {
          text: IMLocalized('Remove'),
          onPress: () => props.removeFromShoppingBag(item),
          style: 'destructive',
        },
        {
          text: IMLocalized('Cancel'),
          onPress: () => increaseQty(),
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <TouchableOpacity
      onLongPress={() => props.onLongPress(item)}
      activeOpacity={1}
      style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.photo }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>
      <CardContent
        price={`${props.appConfig.currency}${totalPrice}`}
        item={item}
        onColorSelected={props.onColorSelected}
        onSizeSelected={props.onSizeSelected}
        contentContainer={styles.contentContainer}
        onAttributesSelected={props.onAttributesSelected}
      />
      <QuantityControl
        quantity={itemQty}
        onIncreaseQuantity={() => increaseQty()}
        onDecreaseQuantity={() => decreaseQty()}
        containerStyle={styles.quantityControlContainer}
      />
    </TouchableOpacity>
  );
}

ShoppingBagCard.propTypes = {
  onQtyChange: PropTypes.func,
  item: PropTypes.object,
  productPricesByQty: PropTypes.array,
  onSizeSelected: PropTypes.func,
  onColorSelected: PropTypes.func,
  onLongPress: PropTypes.func,
  removeFromShoppingBag: PropTypes.func,
};

export default connect()(ShoppingBagCard);
