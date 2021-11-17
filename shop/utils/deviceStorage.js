import AsyncStorage from '@react-native-community/async-storage';

const LOGGED_IN_USER_DATA = 'LOGGED_IN_USER_DATA';
const WISHLIST = '@WISHLIST';
const PAYMENT_METHOD = '@PAYMENT_METHOD';
const STRIPE_CUSTOMER = '@STRIPE_CUSTOMER';

const CREDENTIAL_KEYS = {
  email: 'EMAIL',
  password: 'PASSWORD',
};

const logoutDeviceStorage = async () => {
  try {
    await AsyncStorage.removeItem(LOGGED_IN_USER_DATA);
    await AsyncStorage.removeItem(CREDENTIAL_KEYS.email);
    await AsyncStorage.removeItem(CREDENTIAL_KEYS.password);
  } catch (err) {
    console.log(err);
  }
};

const getWishlist = async (email) => {
  const compoundKey = email + WISHLIST;

  try {
    const result = await AsyncStorage.getItem(compoundKey);

    if (result !== null) {
      return JSON.parse(result);
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const storeWishlist = async (email, data) => {
  const compoundKey = email + WISHLIST;
  try {
    if (email && data) {
      await AsyncStorage.setItem(compoundKey, JSON.stringify(data));
    }
  } catch (err) {
    console.log(err);
  }
};

const getPaymentMethod = async (email) => {
  const compoundKey = email + PAYMENT_METHOD;
  try {
    const result = await AsyncStorage.getItem(compoundKey);

    if (result !== null) {
      return JSON.parse(result);
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const storePaymentMethod = async (email, data) => {
  const compoundKey = email + PAYMENT_METHOD;
  try {
    if (email && data) {
      await AsyncStorage.setItem(compoundKey, JSON.stringify(data));
    }
  } catch (err) {
    console.log(err);
  }
};

const getStripeCustomer = async (email) => {
  const compoundKey = email + STRIPE_CUSTOMER;
  try {
    const result = await AsyncStorage.getItem(compoundKey);

    if (result !== null) {
      return JSON.parse(result);
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const storeStripeCustomer = async (email, data) => {
  const compoundKey = email + STRIPE_CUSTOMER;
  try {
    if (email && data) {
      await AsyncStorage.setItem(compoundKey, JSON.stringify(data));
    }
  } catch (err) {
    console.log(err);
  }
};

const deviceStorage = {
  logoutDeviceStorage,
  storeWishlist,
  getWishlist,
  getPaymentMethod,
  storePaymentMethod,
  getStripeCustomer,
  storeStripeCustomer,
};

export default deviceStorage;
