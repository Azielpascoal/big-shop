import { firebase } from '../../Core/firebase/config';
import Category from './../../models/Category';
import AppConfig from '../../ShopertinoConfig';

export const categoriesRef = firebase
  .firestore()
  .collection(AppConfig.FIREBASE_COLLECTIONS.CATEGORIES);

export const subscribeCategories = (callback) => {
  return categoriesRef.onSnapshot((querySnapshot) => {
    const categories = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      categories.push(new Category(data.id, data.name, data.photo));
    });

    return callback(categories);
  });
};
