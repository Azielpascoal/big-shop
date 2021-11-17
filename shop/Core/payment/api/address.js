import { firebaseUser } from '../../firebase';

export const updateUserShippingAddress = async (userId, shippingAddress) => {
  try {
    firebaseUser.updateUserData(userId, {
      shippingAddress,
    });
    return { success: true };
  } catch (error) {
    return { error, success: false };
  }
};
