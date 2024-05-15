import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeStatus } from "../../features/orders/ordersSlice";
import NavbarView from "../../Components/NavbarView";
import productImg from "../../Icons/product.png";
import orderIcon from "../../Icons/Order.svg";
import userIcon from "../../Icons/user.png";
import shippingIcon from "../../Icons/Union.png";
import paymentIcon from "../../Icons/dollar.png";
import productIcon from "../../Icons/package.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api_url } from "../../Data/Constants";
import axios from "axios";

export default function ViewOrder(props) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log("location",location.state.id);
  const order = location.state;
  const updateStatus = async () => {
    try {
      const url = `${api_url}/createOrder/${order.orderId}/6`;
      const resp = await axios.put(url);
      console.log("Response at createOrder", resp);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const getData = async () => {
    try {
      const url = `${api_url}/invoice/${order.orderId}`;
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      console.log("Response at View Order", response.data);
      setData(response.data);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleConfirmOrder = () => {
    // console.log("at handleConfirmOrder :{id}",order.id);
    const status = 3;
    //  dispatch(changeStatus({id:order.id,status}))
    updateStatus();
    toast.success("Order Confirmed!");
  };
  const handleCancelOrder = () => {
    // console.log("at handleConfirmOrder :{id}",order.id);
    // const status = 2;
    //  dispatch(changeStatus({id:order.id,status}))
  };
  return (
    <div>
      <div className="p-2 grid gap-3 bg-white">
        {/*Navbar Starts here */}
        <NavbarView
          title="View Order"
          handleConfirmOrder={handleConfirmOrder}
          handleCancelOrder={handleCancelOrder}
        />
        {/*Navbar Ends here */}
        <div className="flex justify-between">
          {/*left div*/}
          <div className="grid grid-cols-2 grid-rows-2">
            <div
              className="row-span-2 flex items-center justify-center h-8 w-8"
              style={{ backgroundColor: "#D9D9D9" }}
            >
              <img src={productImg} />
            </div>
            <div style={{ color: "#2D2D2D" }} className="text-sm">
              Order Id : {order.orderId}{" "}
            </div>
            <div style={{ color: "#666666" }} className="text-xs">
              Recived On :{order.receivedDate}
            </div>
          </div>
          <div className="flex flex-row">
            {/*right div*/}
            <div style={{ color: "#666666" }} className="text-sm">
              Order Status :{" "}
            </div>
            <div style={{ color: "#F1BE17" }} className="text-sm">
              <select>
                <option>In Progress</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex flex-row p-1 items-center gap-2"
            style={{ backgroundColor: "#EBEBEB" }}
          >
            <div className="h-4 w-4 flex items-center">
              <img src={orderIcon} height="16px" width="16px" />
            </div>
            <div style={{ color: "#2D2D2D" }} className="text-base">
              Order Details
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-1 pb-1">
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Created Date
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.orderDate}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Order Location
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.orderLocation}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Batch
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                P023565
              </div>
            </div>
            <div className="col-span-3">
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Order Note
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.orderNote}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex flex-row p-1 items-center gap-2"
            style={{ backgroundColor: "#EBEBEB" }}
          >
            <div className="h-4 w-4 flex items-center">
              <img src={productIcon} height="16px" width="16px" />
            </div>
            <div style={{ color: "#2D2D2D" }} className="text-base">
              Product Details
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-1 pb-1">
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Name
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.productName}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Code
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.code}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Quantity
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.quantity} Strips
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex flex-row p-1 items-center gap-2"
            style={{ backgroundColor: "#EBEBEB" }}
          >
            <div className="h-4 w-4 flex items-center">
              <img src={paymentIcon} height="16px" width="16px" />
            </div>
            <div style={{ color: "#2D2D2D" }} className="text-base">
              Payment Details
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-1 pb-1">
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Payment Method
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.paymentMethod}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Card No.
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.cardNumber}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Card Holder Name
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.cardHolderName}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Payment Status
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.paymentStatus}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Payment Date
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.paymentDate}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Amount
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.amount}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Billing Address
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.paymentAddress}
              </div>
            </div>
            <div className="col-span-4">
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Payment Note
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex flex-row p-1 items-center gap-2"
            style={{ backgroundColor: "#EBEBEB" }}
          >
            <div className="h-4 w-4 flex items-center">
              <img src={shippingIcon} height="16px" width="16px" />
            </div>
            <div style={{ color: "#2D2D2D" }} className="text-base">
              Shipping Details
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-1 pb-1">
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Delivery Date
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.deliveryDate}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Shipping Partner
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                Delhivery
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Delivery Address
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.shipmentAddress}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex flex-row p-1 items-center gap-2"
            style={{ backgroundColor: "#EBEBEB" }}
          >
            <div className="h-4 w-4 flex items-center">
              <img src={userIcon} height="16px" width="16px" />
            </div>
            <div style={{ color: "#2D2D2D" }} className="text-base">
              Customer Details
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-1 pb-1">
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Name
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.customerName}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Email
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.email}
              </div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Phone
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.phone}
              </div>
            </div>
            <div className="col-span-3">
              <div className="text-sm" style={{ color: "#6F6F6F" }}>
                Address
              </div>
              <div className="text-sm" style={{ color: "#2D2D2D" }}>
                {data.address}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
