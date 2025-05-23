import { configureStore } from '@reduxjs/toolkit';
import foodReducer from '../Slices/foodSlice';

const store = configureStore({
  reducer: {
    food: foodReducer
  },
});

export default store;