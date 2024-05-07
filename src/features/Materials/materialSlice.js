import { createSlice } from "@reduxjs/toolkit";
import { api_url } from "../../Data/Constants";
import axios from "axios";
const initialState = {
  material: {
    "materialName": "Widget",
    "storageLocation": "Warehouse A",
    "batchId": "BATCH123",
    "purchaseOrder": "PO-456",
    "expiryDate": "2024-12-31",
    "quantity": 100,
    "price": 19.99,
    "shortName": "WDGT",
    "category": "Electronics",
    "subCategory": "Widgets",
    "upc": "123456789012",
    "barcode": "BARCODE123",
    "refrigeration": false,
    "minimumQuantity": 5,
    "measurementType": "Unit",
    "description": "A high-quality widget for various applications."
  }
};
const postData = async(Data) =>{
    try{
       const url = `${api_url}/material/`;
       console.log("data : ", Data);
       const resp = await axios.post(url, Data);
       console.log('Response',resp);
    }
    catch(error){
      console.log("Error :",error);
    }
  }

export const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    addMaterial: (state, action) => {
      if (action.payload) {
        console.log("Initial State:", state?.material);
        console.log("Payload Data:", action.payload);
        // Modify state here if needed
        const payload = action.payload;
        state.material = {
          ...state.material,
          materialName: String(payload.materialName),
          shortName: String(payload.shortName),
          category: String(payload.category),
          subCategory: String(payload.subCategory),
          upc: String(payload.upc),
          barcode: String(payload.barcode),
          minimumQuantity: parseInt(payload.minimumQuantity,10),
          measurementType: String(payload.measurementType),
          description: String(payload.description),
          refrigeration:Boolean( payload.refrigeration)
        };
        postData(state.material);
      }
    },
    addBatch: (state, action) => {
      if (action.payload) {
        console.log("Initial State:", state?.material);
        console.log("Payload Data:", action.payload);
        // Modify state here if needed
        const payload = action.payload;
        state.material = {
          ...state.material,
          materialName: String(payload.materialName),
          storageLocation: String(payload.storageLocation),
          batchId:String( payload.batchId),
          purchaseOrder: String(payload.makeOrder),
          expiryDate: String(payload.expiryDate),
          quantity:parseInt(payload.quantity, 10)     ,
          price: parseFloat(payload.price)     ,
        };

      }
    }
  }
});

export const { addMaterial, addBatch } = materialSlice.actions;

export default materialSlice.reducer;



/* -------------------------------------------------*/


