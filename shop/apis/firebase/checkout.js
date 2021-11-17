import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';

export const savePaymentCharge = async (userId, charge) => {
  try {
    const response = await firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.STRIPE_CUSTOMERS)
      .doc(userId)
      .collection(AppConfig.FIREBASE_COLLECTIONS.CHARGES)
      .add(charge);

    return { ...response, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const updateOrders = async (order) => {
  try {
    const response = await firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.ORDERS)
      .add(JSON.parse(JSON.stringify(order)));

    return { ...response, success: true };
  } catch (error) {
    return { error, success: false };
  }
};
