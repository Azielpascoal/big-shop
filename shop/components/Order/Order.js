import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import OrderCard from '../OrderCard/OrderCard';
import { useColorScheme } from 'react-native-appearance';
import dynamicStyles from './styles';
import { TNEmptyStateView } from '../../Core/truly-native';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import AppStyles from '../../AppStyles';

function Order(props) {
  const { isLoading, extraData, orderHistory, appConfig } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const emptyStateConfig = {
    title: IMLocalized('Empty Order'),
    description: IMLocalized(
      'Your order is empty. Checkout some of our cool products, place an order and see your order appear here.',
    ),
  };

  const renderItem = ({ item, index }) => (
    <OrderCard
      key={index}
      onReOrder={props.onReOrder}
      appConfig={appConfig}
      order={item}
    />
  );

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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orderHistory}
        keyExtractor={(item) => item.id}
        extraData={extraData}
        renderItem={renderItem}
        itemContainerStyle={{ alignItems: 'center' }}
        style={{ flex: 1 }}
        ListEmptyComponent={renderEmptyList()}
      />
    </View>
  );
}

Order.propTypes = {
  orderHistory: PropTypes.array,
  extraData: PropTypes.object,
  navigation: PropTypes.object,
  onReOrder: PropTypes.func,
};

export default Order;
