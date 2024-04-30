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
  useEffect(()=>{
    console.log("Form Data",formData);
  },[formData])
  return (
    <form >
      <div className="p-8">
        <Navbar title="Make Order" className="NavbarForm" btnTitle="Next" />
        <div className="grid gap-y-4 pt-8" >
          <div className="grid gap-2">
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Make Order ID*"
                name="makeOrderId"
                value = {formData.makeOrderId}
                onChange ={(e) => {
                  console.log("this data is changing");
                  setFormData((prevData) => ({
                      ...prevData,
                      makeOrderId: e.target.value
                  }))
                }}
              />

              <InputBox
                type="date"
                title="Est. Delivery Date*"
                name="estDeliveryDate"
              />

              <DropDown
                title="MO Created By*"
                name="moCreatedBy"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <DropDown
                title="Product Name/Code*"
                name="productName"
              />
              <InputBox
                type="number"
                title="Quantity*"
                name="quantity"
              />
              <InputBox
                type="number"
                title="Price*"
                name="price"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}