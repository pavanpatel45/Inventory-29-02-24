import React, { useState } from "react";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarCreateBatchProduct";
import Button from "../../Components/Button";
import "../../CSS/CreateBatch.css"
import { Link } from "react-router-dom";

export default function CreateBatch() {
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
  return (

    <form >
      <div className="p-8 bg-white">
        <Navbar
          title="Create Batch"
          btnTitle="Add Product"
          backLink="/products"
        />
        <div className="grid gap-y-4 pt-8">
          <div className="grid gap-2">
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Product Name/Code*"
                name="productName"
                onChange={handleInputChange}
                labelCss={
                  formData.productName.length > 0 ? 'label-up' : 'label-down'}
              />

              <DropDown
                title="Storage Location*"
                name="storageLocation"
                onChange={handleInputChange}
                labelCss={
                  formData.storageLocation.length > 0 ? 'label-up' : 'label-down'}
              />

              <InputBox
                type="text"
                title="Batch ID*"
                name="batchId"
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
              className=" pt-0 pb-0 text-style"
            />

          </div>
        </div>
      </div>
    </form>
  );
}