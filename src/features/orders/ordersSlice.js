import { createSlice } from '@reduxjs/toolkit';
import { api_url } from '../../Data/Constants';
import axios from 'axios';
const initialState = {
  orders: []
};
const postData = async (Data) => {
  try {
    const url = `${api_url}/order/`;
    console.log('data : ', Data);
    const resp = await axios.post(url, Data);
    console.log('Response at createOrder', resp);
  } catch (error) {
    console.log('Error :', error);
  }
};

export const ordersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      if (action.payload) {
        // state.orders.push(action.payload);
        console.log('action.payload at orderSlice:', action.payload);
        const data = {
          receivedDate: String(action.payload.orderDetails.receivedDate),
          orderStatus: parseInt(1),
          orderLocation: String(action.payload.orderDetails.Location),
          orderNote: String(action.payload.orderDetails.Note),
          productName: String(action.payload.productDetails.Name),
          code: String(action.payload.productDetails.code),
          orderProductQuantity: parseInt(
            action.payload.productDetails.orderProductQuantity
          ),
          price: parseFloat(action.payload.productDetails.price),
          customerName: String(action.payload.customerDetails.customerName),
          email: String(action.payload.customerDetails.email),
          mobileNumber: String(action.payload.customerDetails.mobileNumber),
          addressLine: String(action.payload.customerDetails.Address),
          postalCode: String(action.payload.customerDetails.PostalCode),
          city: String(action.payload.customerDetails.City),
          state: String(action.payload.customerDetails.State),
          country: String(action.payload.customerDetails.Country),
          paymentMethod: String(action.payload.paymentDetails.paymentMethod),
          cardNumber: String(action.payload.paymentDetails.cardNo),
          cardHolderName: String(action.payload.paymentDetails.cardHolderName),
          paymentStatus: String(action.payload.paymentDetails.paymentStatus),
          paymentDate: String(action.payload.paymentDetails.paymentDate),
          amount: parseFloat(action.payload.paymentDetails.amount),
          paymentAddressLine: String(
            action.payload.paymentDetails.paymentAddress
          ),
          paymentPostalCode: String(action.payload.paymentDetails.PostalCode),
          paymentCity: String(action.payload.paymentDetails.City),
          paymentState: String(action.payload.paymentDetails.State),
          paymentCountry: String(action.payload.paymentDetails.Country),
          deliveryDate: String(action.payload.shipmentDetails.deliveryDate),
          shipmentAddressLine: String(action.payload.shipmentDetails.Address),
          shipmentPostalCode: String(action.payload.shipmentDetails.PostalCode),
          shipmentCity: String(action.payload.shipmentDetails.City),
          shipmentState: String(action.payload.shipmentDetails.State),
          shipmentCountry: String(action.payload.shipmentDetails.Country)
        };
        console.log('Data at addOrder :', data);
        postData(data);
        // console.log("all orders", state.orders);
      } else {
        console.log('data not received at reducer');
      }
    },
    changeStatus: (state, action) => {
      console.log(
        'at reducer :',
        action.payload.id,
        ' ',
        action.payload.status
      );
      if (action.payload) {
        // console.log("all orders", [...state.orders]);
        state.orders = state.orders.map((order) => {
          if (order.id == action.payload.id) {
            // console.log("order at changeStatus reducer",order.id,action.payload.id,order.status);
            return {
              ...order,
              status: action.payload.status
            };
          }
          return order;
        });
        // state.orders.map((order) =>{
        //   console.log("all Orders at reducer: ",order.id, " ",order.status);
        // })
      } else {
        console.log('data not received at reducer ');
      }
    }
  }
});

export const { addOrder, changeStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
