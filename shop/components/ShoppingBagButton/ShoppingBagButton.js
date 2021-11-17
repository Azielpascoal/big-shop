import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppStyles from '../../AppStyles';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';

function ShoppingBagButton(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { bagItems } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <IconBadge
          MainElement={
            <Image
              source={AppStyles.iconSet.shoppingBagFilled}
              style={styles.headerButtonImage}
            />
          }
          BadgeElement={
            bagItems.length > 0 && (
              <Text style={{ color: '#FFFFFF' }}>{bagItems.length}</Text>
            )
          }
          IconBadgeStyle={{
            width: 20,
            height: 20,
            backgroundColor: bagItems.length > 0 ? '#fb898e' : 'transparent',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = ({ products }) => ({
  bagItems: products.shoppingBag,
});

ShoppingBagButton.propTypes = {
  onPress: PropTypes.func,
  bagItems: PropTypes.array,
};

export default connect(mapStateToProps)(ShoppingBagButton);
