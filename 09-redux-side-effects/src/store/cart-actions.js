import { cartActions } from './cart';
import { uiActions } from './ui';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://http-hook-7dba9-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

      if (!response.ok) {
        throw Error('Fetching cart data failed!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

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

export const storeCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data'
    }));

    const sendRequest = async () => {
      const response = await fetch(
        'https://http-hook-7dba9-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cartData)
        });

      if (!response.ok) {
        throw Error('Sending cart data failed!');
      }
    }

    try {
      await sendRequest();

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