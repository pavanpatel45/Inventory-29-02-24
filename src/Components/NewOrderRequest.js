import React, { useEffect, useState } from "react";
import OrderBox from "./OrderBox";
import { api_url } from "../Data/Constants";
import axios from "axios";
export default function NewOrderRequest( ) {
  const [allOrders,setAllOrders] = useState([]);
  const updateStatus = async(orderId,status)=>{
    try {
       const url = `${api_url}/order/${orderId}/${status}`;
       const resp = await axios.put(url);
       console.log('Response at createOrder', resp);
     }
     catch (error) {
       console.log("Error :", error);
     }
 }
  const getData = async () => {
    try {
      const url = `${api_url}/order/all`;
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log('Response at newOrderRequest', response.data);
      setAllOrders(response.data);
    }
    catch (error) {
      console.log("Error :", error);
    }
  }
  useEffect(()=>{
    getData();
  },[])
  
  console.log('New Order Request is set',allOrders);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-3 gap-2">
     {allOrders ? (
  allOrders.map((order) => {
    if (order.orderStatus === "New Order Request") {
      console.log("1111");
      return <OrderBox order={order} key={order.orderId} updateStatus={updateStatus} />;
    } else {
      console.log(("222"));
      return null; // Return null instead of empty fragment
    }
  })
) : null}

    </div>
  );
}
