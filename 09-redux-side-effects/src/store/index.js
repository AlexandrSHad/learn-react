import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart';
import productsReducer from './products';
import uiReducer from './ui';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    ui: uiReducer,
  }
});

export default store;