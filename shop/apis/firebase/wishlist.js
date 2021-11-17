import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';

export const setUserWishList = async (userId, wishlist) => {
  try {
    const userRef = firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.USERS)
      .doc(userId);

    await userRef.update({
      wishlist: JSON.parse(JSON.stringify(wishlist)),
    });
    const user = await userRef.get();

    return { user: user.data(), success: true };
  } catch (error) {
    console.log(error);
    return { error, success: false };
  }
};
