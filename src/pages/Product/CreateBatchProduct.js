import React, { useState } from "react";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarCreateBatchProduct";
import Button from "../../Components/Button";

export default function CreateBatchProduct() {
 

  return (
    <form  >
      <div className="p-8 bg-white">
        <Navbar
          title="Create Batch"
          btnTitle="Add Product +"
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
                className="border-1 border-solid border-black rounded-md pt-0 pb-0"
                style={{
                  backgroundColor: "#B3B3B3",
                  width: "138px",
                  height: "42px",
                  borderRadius: "8px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  marginTop: "8px",
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "22px",
                }}
              />
            </div>
        </div>
      </div>
    </form>
  );
}