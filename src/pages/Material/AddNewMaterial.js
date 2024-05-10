import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMaterial } from "../../features/Materials/materialSlice";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarForm";
import CheckBox from "../../Components/CheckBox";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../CSS/NavbarMaterials.css"
import { api_url } from "../../Data/Constants";
import axios from "axios";
export default function AddNewMaterial() {
  const dispatch = useDispatch();
const navigate= useNavigate();
  const [formData,setFormData] = useState({
    materialName:'',
    shortName:'',
    category:'',
    subCategory:'',
    upc:'',
    glNumber:'',
    minimumQuantity:'',
    measurementType:'',
    Description:'',
    refrigeration:''
  })
  const [categoryData,setCategoryData] = useState([]);
  const [subCategoryData,setSubCategoryData] = useState([]);
  const handleInputChange = (e) => {
    console.log('at handle input change:',e);
    const { name, value,key} = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log("Input value changed:", name,":",value,":",formData);
  };
  const getCategoryData = async () =>{
    try {
      const url = `${api_url}/getAllMaterialCategory`;
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
      const url = `${api_url}/getAllMaterialSubCategory/${id}`;
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
  useEffect(()=>{
      getSubCategoryData(formData.category);
      setFormData((prevData) =>({
        ...prevData,
        subCategory:''
      }))
  },[formData.category]);
  const handleSubmit = (e)=>{
     e.preventDefault();
     console.log("at handle Submit",formData);
     dispatch(addMaterial(formData));
     toast.success("New Material Successfully Added");
    navigate("/materials/CreateBatch");  
  }
  useEffect(()=>{
    getCategoryData();
  },[])
  return (
    <form >
      <div className="p-3 bg-white">
        <Navbar
          title="Add Material"
          btnTitle="Next"
          className="NavbarForm"
          btnType="submit"
          handleClick={handleSubmit}
          nextLink="/materials/CreateBatch"
          backLink="/materials/CreateBatch"
         
        />

       
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
            <InputBox
              type="text"
              title="Material Name*"
              name="materialName"
              onChange={handleInputChange}
              labelCss={
                formData.materialName.length > 0 ? 'label-up' : 'label-down'}
            />

            <InputBox
              type="text"
              title="Short Name*"
              name="shortName"
              onChange={handleInputChange}
              labelCss={
                formData.shortName.length > 0 ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Category*"
              name="category"
              onChange={handleInputChange}
              options={categoryData}
              labelCss={
                formData.category.length >0 ? 'label-up' : 'label-down'}
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
                formData.upc.length > 0 ? 'label-up' : 'label-down'}
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
              <CheckBox formData={formData} setFormData={setFormData}/>
            </div>

            <InputBox
              type="number"
              title="Minimum Quantity*"
              name="minimumQuantity"
              onChange={handleInputChange}
              labelCss={
                formData.minimumQuantity.length > 0 ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Measurement Type*"
              name="measurementType"
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