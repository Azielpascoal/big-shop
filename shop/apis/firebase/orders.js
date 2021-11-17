import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';

const ordersRef = firebase
  .firestore()
  .collection(AppConfig.FIREBASE_COLLECTIONS.ORDERS);

const onOrdersUpdate = (querySnapshot, callback) => {
  const orders = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    orders.push(data);
  });

  return callback(orders);
};

export const subscribeOrders = (userId, callback) => {
  return ordersRef
    .where('user_id', '==', userId)
    .onSnapshot((querySnapshot) => onOrdersUpdate(querySnapshot, callback));
};
