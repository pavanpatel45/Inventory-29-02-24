import React, { useState } from "react";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarCreateBatchProduct";
import Button from "../../Components/Button";
import "../../CSS/CreateBatch.css"
import { Link } from "react-router-dom";

export default function CreateBatch() {
 
  

  return (
    
    <form >
      <div className="p-8 bg-white">
        <Navbar
          title="Create Batch"
          
          btnTitle="Add Material"
        />
        <div className="grid gap-y-4 pt-8">
          <div className="grid gap-2">
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Product Name/Code*"
                name="productName"
              />

              <DropDown
                title="Storage Location*"
                name="storageLocation"
              />

              <InputBox
                type="text"
                title="Batch ID*"
                name="batchId"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
             
              <InputBox
                type="text"
                title="Make Order#*"
                name="makeOrder"
              />

              <InputBox
                type="date"
                title="Expiry Date*"
                name="expiryDate"
              />
              <InputBox
                type="number"
                title="Quantity(Units)*"
                name="quantity"
              />
            </div>
          </div>


          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
          <InputBox
                type="number"
                title="Price($)*"
                name="price"
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