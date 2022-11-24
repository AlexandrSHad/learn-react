import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../store/auth';
import counterReducer from '../store/counter';

const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer
  }
});

export default store;