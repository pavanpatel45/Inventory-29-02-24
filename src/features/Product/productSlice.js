import { createSlice } from "@reduxjs/toolkit";
import { api_url } from "../../Data/Constants";
import axios from "axios";
const initialState = {
    product: {
        "productName": "Product ABC",
        "storageLocation": "Warehouse A",
        "batchId": "BATCH001",
        "makeOrder": "ORDER123",
        "expiryDate": "2023-12-31",
        "quantity": 100,
        "price": 49.99,
        "category": "Electronics",
        "subCategory": "Smartphones",
        "upc": "123456789012",
        "glNumber": "GL123",
        "refrigeration": false,
        "minimumQuantity": 10,
        "measurementType": "Piece",
        "description": "High-end smartphone with advanced features",
        "materialName": "Aluminum",
        "materialRequiredQuantity": 5,
        "materialUnit": "kg"
    }
};
const postData = async (Data) => {
    try {
        const url = `${api_url}/product/`;
        console.log("data : ", Data);
        const resp = await axios.post(url, Data);
        console.log('Response', resp);
    }
    catch (error) {
        console.log("Error :", error);
    }
}
const postBatchData = async (Data) => {
    try {
        const url = `${api_url}/productBatch/`;
        console.log("data : ", Data);
        const resp = await axios.post(url, Data);
        console.log('Response', resp);
    }
    catch (error) {
        console.log("Error :", error);
    }
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            if (action.payload) {
                console.log("Initial State:", state?.product);
                console.log("Payload Data:", action.payload);
                // Modify state here if needed
                const payload = action.payload;
                const Data = {
                    productName: String(payload.productName),
                    category: String(payload.category),
                    subCategory: String(payload.subCategory),
                    upc: String(payload.upc),
                    glNumber: String(payload.glNumber),
                    minimumQuantity: parseInt(payload.minimumQuantity, 10),
                    measurementType: String(payload.measurementType),
                    description: String(payload.Description ),
                    refrigeration: Boolean(payload.refrigeration)
                };
                postData(Data);
            }
        },
        addProductBatch: (state, action) => {
            if (action.payload) {
                console.log("Initial State:", state?.product);
                console.log("Payload Data:", action.payload);
                // Modify state here if needed
                const payload = action.payload;
                const Data = {
                    batchProductName: String(payload.productName),
                    storageLocation: String(payload.storageLocation),
                    batchId: String(payload.batchId),
                    makeOrder: String(payload.makeOrder),
                    expiryDate: String(payload.expiryDate),
                    quantity: parseInt(payload.quantity, 10),
                    price: parseFloat(payload.price),
                };
                postBatchData(Data);

            }
        },
        addProductMaterial: (state, action) => {
            if (action.payload) {
                console.log("Initial State:", state?.product);
                console.log("Payload Data:", action.payload);
                // Modify state here if needed
                const payload = action.payload;
                state.product = {
                    ...state.product,
                    materialName: String(payload.materialNameCode),
                    materialRequiredQuantity: parseInt(payload.requiredQuantity, 10),
                    materialUnit: String(payload.unit),
                };
                postData(state.product);
            }
        }
    }
});

export const {  addProduct, addProductBatch,addProductMaterial} = productSlice.actions;

export default productSlice.reducer;



/* -------------------------------------------------*/


