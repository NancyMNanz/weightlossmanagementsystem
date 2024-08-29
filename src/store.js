import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import weightReducer from './slices/weightSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    weight: weightReducer,
  },
});

export default store;
