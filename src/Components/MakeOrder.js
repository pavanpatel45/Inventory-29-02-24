import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addMakeOrder } from "../features/makeOrderSlice";
import InputBox from "../Components/InputBox";
import DropDown from "../Components/Dropdown";
import Navbar from "../Components/NavbarForm";

export default function CreateOrder() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.orders);
  console.log("all Orders at createOrder", allOrders);



  const buttonStyle = {
    backgroundColor: "#B3B3B3",
    borderRadius: "8px",
    width: "138px",
    height: "42px",
    paddingLeft: "16px",
    paddingRight: "16px",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "22px",
  };

  return (
    <form >
      <div className="p-8">
        <Navbar title="Make Order" buttonStyle={buttonStyle} btnTitle="Next" />
        <div className="grid gap-y-4 pt-8" >
          <div className="grid gap-2">
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Make Order ID*"
                name="makeOrderId"
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