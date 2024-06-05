import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ordersReducer from '../features/orders/ordersSlice.js';
import materialReducers from '../features/Materials/materialSlice.js';
import productSlice from '../features/Product/productSlice.js';
const rootReducer = combineReducers({
  orders: ordersReducer,
  materials: materialReducers,
  products: productSlice
});
export const store = configureStore({
  reducer: rootReducer
});
