import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../features/Product/productSlice";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarForm";
import ImageUpload from "../../Components/ImageUpload";
import CheckBox from "../../Components/CheckBox";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { api_url } from "../../Data/Constants";


export default function CreateProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({
    productName:'',
    productNameCode:'',
    category:'',
    subCategory:'',
    upc:'',
    glNumber:'',
    minimumQuantity:'',
    measurementType:'',
    Description:'',
    refrigeration:true
  });
  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log("Input value changed:", name, ":", value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [categoryData,setCategoryData] = useState([]);
  const [subCategoryData,setSubCategoryData] = useState([]);
  const [mearsumentData,setMearsumentData] = useState([{
    id:"1",
    value:"Kg"
  }]);
  const handleSubmit = (e)=>{
     e.preventDefault();
     console.log("form Data at createProduct :",formData);
     dispatch(addProduct(formData));
     navigate('/products/CreateProduct/CreateProductMaterials')
  }
  const getCategoryData = async () =>{
    try {
      const url = `${api_url}/materialCategory/getAllMaterialCategory`;
      const response = await axios.get(url, {
          headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log('Response at newOrderRequest', response.data);
      setCategoryData(response.data);
  }
  catch (error) {
      console.log("Error :", error);
  }
  }
  const getSubCategoryData = async (value) =>{
    const obj = categoryData.find((obj)=>{
        if(obj.value.trim() ==  value.trim()){
            return obj;
        }
    });
     const id = obj?.id;
    console.log("id at getsubcategoryData",id);
    try {
      const url = `${api_url}/materialCategory/getAllMaterialSubCategory/${id}`;
      const response = await axios.get(url, {
          headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log('Response at newOrderRequest', response.data);
      setSubCategoryData(response.data);
  }
  catch (error) {
      console.log("Error :", error);
  }
  }
  const getMearsurmentData = async () =>{
    try {
      const url = `${api_url}/productCategory//getAllMeasurement`;
      const response = await axios.get(url, {
          headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log('Response at newOrderRequest', response.data);
      setMearsumentData(response.data);
  }
  catch (error) {
      console.log("Error :", error);
  }
  }
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
  useEffect(()=>{
    getSubCategoryData(formData.category);
    setFormData((prevData) =>({
      ...prevData,
      subCategory:''
    }))
},[formData.category]);

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);
  useEffect(()=>{
    getCategoryData();
    getMearsurmentData();
  },[])
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-8 bg-white">
        <Navbar
          title="Create Product"
          btnTitle="Next"
          className="NavbarForm"
          btnType="submit"
          btnStyle={{ backgroundColor: isFormComplete ? "#2CAE66" : "#B3B3B3",cursor: isFormComplete ? "pointer" : "not-allowed"}}
          disabled={!isFormComplete}
          handleClick={handleSubmit}
          backLink="/products/CreateBatchProduct"
          // nextLink="createProductMaterials"
        />

        <div className="flex flex-row mt-7 ">
          <div className="flex flex-col items-center">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center text-xs text-white"
              style={{ border: "1px", backgroundColor: "#2CAE66" }}
            >
              1
            </div>
            <div
              style={{
                color: "#2CAE66",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "14.06px",
              }}
            >
              Add Product
            </div>
          </div>
          <div
            className="border border-1 border-black border-dashed h-0 w-64"
            style={{ position: "relative", left: "-23px", top: "8px" }}
          ></div>
          <div
            className="flex flex-col items-center "
            style={{ position: "relative", left: "-36px" }}
          >
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center text-green-500"
              style={{ border: "1px solid", borderColor: "#2CAE66" }}
            >
              2
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "14.06px",
              }}
            >
              Materials
            </div>
          </div>
        </div>

        <div className="grid gap-y-4 pt-8 ">
          <div
            style={{
              color: "#2D2D2D",
              fontWeight: "500",
              lineHeight: "19px",
              fontSize: "16px",
            }}
          >
            Basic Details
          </div>

          <div className="grid grid-cols-3 gap-8">
            <ImageUpload
              type="file"
              title="Drag or Upload a Product Image*"
              name="productName1"
              className="row-span-2"
            />
            <InputBox
              type="text"
              title="Product Name*"
              name="productName"
              onChange={handleInputChange}
                labelCss={
                  formData.productName.length > 0 ? 'label-up' : 'label-down'}
            />

            <InputBox
              type="text"
              title="Product Name/Code*"
              name="productNameCode"
              onChange={handleInputChange}
                labelCss={
                  formData.productNameCode.length > 0 ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Category*"
              name="category"
              onChange={handleInputChange}
              options={categoryData}
                labelCss={
                  formData.category.length > 0 ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Sub Category*"
              name="subCategory"
              onChange={handleInputChange}
              options={subCategoryData}
                labelCss={
                  formData.subCategory.length > 0 ? 'label-up' : 'label-down'}
            />
          </div>
        </div>
        <div className="grid gap-y-4 pt-8 ">
          <div
            style={{
              color: "#2D2D2D",
              fontWeight: "500",
              lineHeight: "19px",
              fontSize: "16px",
            }}
          >
            Other Details
          </div>

          <div className="grid grid-cols-3 gap-8 ">
            <InputBox
              type="number"
              title="UPC*"
              name="upc"
              onChange={handleInputChange}
                labelCss={
                  formData.upc  ? 'label-up' : 'label-down'}
            />
            <InputBox
              type="text"
              title="GL Number*"
              name="glNumber"
              onChange={handleInputChange}
                labelCss={
                  formData.glNumber.length > 0 ? 'label-up' : 'label-down'}
            />

            <div className="row-span-2 flex items-center">
              <CheckBox formData={formData} setFormData={setFormData} />
            </div>

            <InputBox
              type="number"
              title="Minimum Quantity*"
              name="minimumQuantity"
              onChange={handleInputChange}
                labelCss={
                  formData.minimumQuantity  ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Measurement Type*"
              name="measurementType"
              options={mearsumentData}
              onChange={handleInputChange}
                labelCss={
                  formData.measurementType.length > 0 ? 'label-up' : 'label-down'}
            />

            <InputBox
              type="text"
              title="Description (150 Words)"
              className="col-span-3"
              name="Description"
              onChange={handleInputChange}
                labelCss={
                  formData.Description.length > 0 ? 'label-up' : 'label-down'}
            />
          </div>
        </div>
      </div>
    </form>
  );
}