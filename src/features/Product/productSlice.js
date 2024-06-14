import { createSlice } from '@reduxjs/toolkit';
import { api_url } from '../../Data/Constants';
import axios from 'axios';

const initialState = {
  product: {
    materials: []
  }
};

const postData = async (Data) => {
  console.log('This is post api');
  try {
    const url = `${api_url}/product/`;
    console.log('data : ', Data);
    const resp = await axios.post(url, Data);
    console.log('Response', resp);
  } catch (error) {
    console.log('Error :', error);
  }
};

const postBatchData = async (Data) => {
  try {
    const url = `${api_url}/productBatch/`;
    console.log('data : ', Data);
    const resp = await axios.post(url, Data);
    console.log('Response', resp);
  } catch (error) {
    console.log('Error :', error);
  }
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductBatch: (state, action) => {
      if (action.payload) {
        console.log('Initial State:', state?.product);
        console.log('Payload Data2:', action.payload);

        const payload = action.payload;
        const Data = {
          batchProductName: String(payload.batchProductName),
          storageLocation: String(payload.storageLocation),
          batchId: String(payload.batchId),
          makeOrder: String(payload.makeOrder),
          expiryDate: String(payload.expiryDate),
          quantity: parseInt(payload.quantity, 10),
          price: parseFloat(payload.price)
        };
        postBatchData(Data);
      }
    },
    addProductMaterial: (state, action) => {
      if (action.payload) {
        console.log('Initial State:', state?.product);
        console.log('Payload Data3:', action.payload);

        const payload = action.payload;

        state.product = {
          ...state.product,
          ...payload,
          materials: [...payload.materials]
        };

        const Data = {
          ...state.product
        };

        console.log('Final data is ', Data);
        postData(Data);
      }
    }
  }
});

export const { addProduct, addProductBatch, addProductMaterial } =
  productSlice.actions;

export default productSlice.reducer;
