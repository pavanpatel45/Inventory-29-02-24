import React, { useEffect, useState } from "react";
import InputBox from "../Components/InputBox";
import DropDown from "../Components/Dropdown";
import Navbar from "../Components/NavbarForm";
import "../CSS/NavbarMaterials.css"

export default function CreateOrder() {
  
  const [formData,setFormData] = useState({
    makeOrderId:'',
    estDeliveryDate:'',
    moCreatedBy:'',
    productName:'',
    quantity:'',
    price:''
  })
  // useEffect(()=>{
  //   console.log("Form Data",formData);
  // },[formData])
  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log("Input value changed:", name,":",value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  return (
    <form >
      <div className="p-8 bg-white">
        <Navbar title="Make Order" className="NavbarForm" btnTitle="Next" />
        <div className="grid gap-y-4 pt-8" >
          <div className="grid gap-2">
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Make Order ID*"
                name="makeOrderId"
                value = {formData.makeOrderId}
                onChange={handleInputChange}
                labelCss={
                  formData.makeOrderId.length > 0 ? 'label-up' : 'label-down'}
              />

              <InputBox
                type="date"
                title="Est. Delivery Date*"
                name="estDeliveryDate"
                value = {formData.estDeliveryDate}
                onChange={handleInputChange}
                labelCss={
                  formData.estDeliveryDate.length > 0 ? 'label-up' : 'label-down'}
              />

              <DropDown
                title="MO Created By*"
                name="moCreatedBy"
                value = {formData.moCreatedBy}
                onChange={handleInputChange}
                labelCss={
                  formData.moCreatedBy.length > 0 ? 'label-up' : 'label-down'}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <DropDown
                title="Product Name/Code*"
                name="productName"
                value = {formData.productName}
                onChange={handleInputChange}
                labelCss={
                  formData.productName.length > 0 ? 'label-up' : 'label-down'}
              />
              <InputBox
                type="number"
                title="Quantity*"
                name="quantity"
                value = {formData.quantity}
                onChange={handleInputChange}
                labelCss={
                  formData.quantity  ? 'label-up' : 'label-down'}
              />
              <InputBox
                type="number"
                title="Price*"
                name="price"
                value = {formData.price}
                onChange={handleInputChange}
                labelCss={
                  formData.price ? 'label-up' : 'label-down'}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}