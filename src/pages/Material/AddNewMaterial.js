import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMaterial } from "../../features/Materials/materialSlice";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarForm";
import CheckBox from "../../Components/CheckBox";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../CSS/NavbarMaterials.css"
export default function AddNewMaterial() {
  const materials = useSelector((state) => state.materials);
  console.log("materials ",materials)
  const dispatch = useDispatch();

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
  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log("Input value changed:", name,":",value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const notify = () => console.log(1);;

  const handleSubmit = (e)=>{
     e.preventDefault();
     console.log("at handle Submit",formData);
     dispatch(addMaterial(formData));
    
  }
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
              labelCss={
                formData.categorylength > 0 ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Sub Category*"
              name="subCategory"
              onChange={handleInputChange}
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