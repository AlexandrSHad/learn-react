import { fetchCartData, updateCartData } from '../repositories/cartRepository';
import { cartActions } from './cart';
import { uiActions } from './ui';

export const fetchCartDataApiCall = () => {
  return async (dispatch) => {
    try {
      const cartData = await fetchCartData();

      if (cartData) {
        dispatch(cartActions.replaceCartData(cartData));
      }
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Fetching cart data failed'
      }));
    }
  };
};

export const storeCartDataApiCall = (cartData) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data'
    }));

    try {
      await updateCartData(cartData);

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Sent cart data successfully'
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending cart data failed'
      }));
    }
  };
};
