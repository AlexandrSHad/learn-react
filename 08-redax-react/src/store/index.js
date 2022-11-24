import { configureStore, createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: authInitialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
    },
    logout(state) {
      state.isAuthenticated = false
    }
  }
});

const counterInitialState = {
  showCounter: true,
  counter: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: counterInitialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    counter: counterSlice.reducer
  }
});

export const authActions = authSlice.actions;
export const counterActions = counterSlice.actions;

export default store;
