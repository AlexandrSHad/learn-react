import { createSlice } from '@reduxjs/toolkit';

import { uiActions } from './ui';

const initialState = {
  showCart: false,
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addProduct(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
      }
    },
    increaseQty(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.price * existingItem.quantity;
      }
    },
    decreaseQty(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        }

        existingItem.quantity--;
        existingItem.total = existingItem.price * existingItem.quantity;
      }
    },
  }
});

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

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;