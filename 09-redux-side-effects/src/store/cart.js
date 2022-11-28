import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showCart: false,
  changed: false,
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

      state.changed = true;
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
      state.changed = true;
      const existingItem = state.items.find(item => item.id === action.payload);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.price * existingItem.quantity;
      }
    },
    decreaseQty(state, action) {
      state.changed = true;
      const existingItem = state.items.find(item => item.id === action.payload);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        }

        existingItem.quantity--;
        existingItem.total = existingItem.price * existingItem.quantity;
      }
    },
    replaceCartData(state, action) {
      state.items = action.payload.items;
    },
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;