import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ordersReducer from '../features/orders/ordersSlice.js';
import materialReducers from '../features/Materials/materialSlice.js'
const rootReducer = combineReducers({
    orders: ordersReducer,
    materials: materialReducers
});
export const store = configureStore({
    reducer:rootReducer
});
