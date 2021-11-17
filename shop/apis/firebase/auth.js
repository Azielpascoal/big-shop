import { firebase } from '../../Core/firebase/config';
import AppConfig from '../../ShopertinoConfig';

const usersRef = firebase
  .firestore()
  .collection(AppConfig.FIREBASE_COLLECTIONS.USERS);

const signInWithCredential = async (credential) => {
  try {
    const response = await firebase.auth().signInWithCredential(credential);
    const isNewUser = response.additionalUserInfo.isNewUser;
    const { first_name, last_name } = response.additionalUserInfo.profile;
    const { uid, email, phoneNumber, photoURL } = response.user._user;

    if (isNewUser) {
      const userData = {
        id: uid,
        email: email,
        firstName: first_name,
        lastName: last_name,
        phone: phoneNumber,
        profilePictureURL: photoURL,
        userID: uid,
      };

      await usersRef.doc(uid).set(userData);
    }

    const user = await usersRef.doc(uid).get();

    return { data: user.data(), success: true, isNewUser };
  } catch (error) {
    return { error, success: false };
  }
};

export const register = async (userDetail) => {
  const { email, fullname, password, phone } = userDetail;

  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user_uid = response.user.uid;
    const data = {
      id: user_uid,
      email: email,
      firstName: fullname,
      phone: phone,
      userId: user_uid,
    };

    await usersRef.doc(user_uid).set(data);
    const user = await usersRef.doc(user_uid).get();

    return { data: user.data(), success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const login = async (email, password) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const user_uid = response.user.uid;
    const user = await usersRef.doc(user_uid).get();

    return { data: user.data(), success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const loginWithFacebook = async (accessToken) => {
  try {
    const credential = await firebase.auth.FacebookAuthProvider.credential(
      accessToken,
    );

    return signInWithCredential(credential);
  } catch (error) {
    return { error, success: false };
  }
};

export const loginWithGoogle = async (accessToken) => {
  try {
    const credential = await firebase.auth.GoogleAuthProvider.credential(
      accessToken,
    );

    return signInWithCredential(credential);
  } catch (error) {
    return { error, success: false };
  }
};

export const logout = () => {
  try {
    firebase.auth().signOut();
  } catch (error) {
    return { error, success: false };
  }
};

export const getUserData = async (userId) => {
  try {
    const user = await usersRef.doc(userId).get();

    return { data: user.data(), success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const saveStripeCustomer = async (userId, customerId) => {
  try {
    const response = await firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.STRIPE_CUSTOMERS)
      .doc(userId)
      .set({ customer_id: customerId });

    return { ...response, success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const getStripeCustomerId = async (userId) => {
  try {
    const response = await firebase
      .firestore()
      .collection(AppConfig.FIREBASE_COLLECTIONS.STRIPE_CUSTOMERS)
      .doc(userId)
      .get();

    return { data: response.data().customer_id, success: true };
  } catch (error) {
    return { error, success: false };
  }
};
