import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarCreateBatchProduct";
import Button from "../../Components/Button";
import "../../CSS/CreateBatch.css"
import { Link,useLocation} from "react-router-dom";
import { api_url } from "../../Data/Constants";
import axios from "axios";


export default function UpdateProduct() {
  const location = useLocation();
  const [data,setData] = useState(location?.state)
  const [storageLocation,setStorageLocation] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();


  console.log("data at update product",data);
  const [formData, setFormData] = useState({
    productName: '',
    storageLocation: '',
    batchId: '',
    makeOrder: '',
    expiryDate: '',
    quantity: '',
    price: '',
  })

  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log("Input value changed:", name, ":", value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const checkFormCompletion = () => {
    const formEntries = Object.entries(formData);

    console.log(formEntries);
    const allFieldsFilled = formEntries.every((formEntriesData) => {
      const [name, value] = formEntriesData;

      if (typeof value === "object" && value !== null) {
        // For objects, check each value inside the object
        const isValidData = Object.values(value).every(
          (val) =>
            (typeof val === "string" || "number") && String(val).trim() !== ""
        );
        if (!isValidData) {
          console.log(name);
        }
        return isValidData;
      } else {
        // For non-objects, directly check the value
        const isValidData =
          typeof (value === "string" || "number") &&
          String(value).trim() !== "";
        if (!isValidData) {
          console.log(name);
        }
        return isValidData;
      }
    });

    console.log(allFieldsFilled);
    console.log("filled forms", allFieldsFilled);
    setIsFormComplete(allFieldsFilled);
  };

  const getStorageLocation = async () => {
    const url = `${api_url}/productCategory/getAllLocations`;
    try {
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      if (response?.status === 200) {
        setStorageLocation(response?.data);
      } else {
        console.error("Received unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    if(data){
     setFormData((prevData) => ({
       ...prevData, // Spread previous state
       productName: data.productName ,
       batchId: data.batchId ,
     }));
    }
    getStorageLocation();
  },[])

  const updateBatchData = async (Data,id) => {
    try {
      const url = `${api_url}/productBatch/batchId/${id}`;
      console.log("Data : ", Data);
      const resp = await axios.put(url, Data);
      console.log('Response', resp);
    }
    catch (error) {
      console.log("Error :", error);
    }
  }

  const postProductData = async (Data) => {
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
  

  useEffect(() => {
    getStorageLocation();
  }, []);

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("formData at submit :",formData);
    const Data = {
      productName: String(formData.materialName),
      storageLocation: String(formData.storageLocation),
      batchId: String(formData.batchId),
      makeOrder: String(formData.makeOrder),
      expiryDate: String(formData.expiryDate),
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price),
    };
    updateBatchData(Data,data.id)
navigate("/products");
}





  return (

    <form >
      <div className="p-8 bg-white">
        <Navbar
          title="Edit Batch"
          backLink="/products"
        />
        <div className="grid gap-y-4 pt-8">
          <div className="grid gap-2">
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Product Name/Code*"
                name="productName"
                value={formData.productName}
                  onChange={handleInputChange}
                labelCss={
                  formData.productName.length > 0 ? 'label-up' : 'label-down'}
              />

              <DropDown
                title="Storage Location*"
                name="storageLocation"
                onChange={handleInputChange}
                options={storageLocation}
                labelCss={
                  formData.storageLocation.length > 0 ? 'label-up' : 'label-down'}
              />

              <InputBox
                type="text"
                title="Batch ID*"
                name="batchId"
                value={formData.batchId}
                onChange={handleInputChange}
                labelCss={
                  formData.batchId.length > 0 ? 'label-up' : 'label-down'}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">

              <InputBox
                type="text"
                title="Make Order#*"
                name="makeOrder"
                onChange={handleInputChange}
                labelCss={
                  formData.makeOrder.length > 0 ? 'label-up' : 'label-down'}
              />

              <InputBox
                type="date"
                title="Expiry Date*"
                name="expiryDate"
                onChange={handleInputChange}
                labelCss={
                  formData.expiryDate.length > 0 ? 'label-up' : 'label-down'}
              />
              <InputBox
                type="number"
                title="Quantity(Units)*"
                name="quantity"
                onChange={handleInputChange}
                labelCss={
                  formData.quantity  ? 'label-up' : 'label-down'}
              />
            </div>
          </div>


          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="number"
                title="Price($)*"
                name="price"
                onChange={handleInputChange}
                labelCss={
                  formData.price  ? 'label-up' : 'label-down'}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end">

            <Button
              btnTitle="Save"
              className=" pt-0 pb-0 text-sty"
              onClickfunction={handleSubmit}
              style={{ backgroundColor: isFormComplete ? "#2CAE66 " : "#B3B3B3 ",cursor: isFormComplete ? "pointer" : "not-allowed"}}
              disabled={!isFormComplete}
            />

          </div>
        </div>
      </div>
    </form>
  );
}
