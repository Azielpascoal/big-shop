import { firebase } from '../../Core/firebase/config';
import Product from './../../models/Product';
import AppConfig from '../../ShopertinoConfig';

export const productsRef = firebase
  .firestore()
  .collection(AppConfig.FIREBASE_COLLECTIONS.PRODUCTS);

export const subscribeProducts = (callback) => {
  return productsRef.onSnapshot((querySnapshot) => {
    const products = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      products.push(
        new Product(
          data.id,
          data.name,
          data.price,
          data.description,
          data.photo,
          data.details,
          [data.category],
          data.colors,
          data.sizes,
        ),
      );
    });

    return callback(products);
  });
};
