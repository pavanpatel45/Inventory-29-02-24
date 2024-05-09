import React, { useEffect, useState } from "react";
import OrderBox from "./OrderBox";
import { api_url } from "../Data/Constants";
import axios from "axios";
export default function NewOrderRequest( ) {
  const [allOrders,setAllOrders] = useState([])
  const getData = async () => {
    try {
      const url = `${api_url}/createOrder`;
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
      {allOrders?allOrders.map((order) => {
        if (1) {
          return <OrderBox order={order} key={order.orderId } />;
        } else {
          return <></>;
        }
      }):""}
    </div>
  );
}
