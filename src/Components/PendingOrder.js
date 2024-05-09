import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import OrderBoxMedium from './OrderBoxMedium'
import DialogBox from './DialogBox'
import DialogBoxCancelOrder from './DialogBoxCancelOrder'
import axios from 'axios';
import { api_url } from '../Data/Constants';
export default function PendingOrder() {
  const [allOrders, setAllOrders] = useState([])
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
  useEffect(() => {
    getData();
  }, [])
  return (
    <div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-3 gap-2'>
        {
          allOrders.map((order) => {
            if (order.orderStatus == 2) {
              return (<OrderBoxMedium order={order} key={order.orderId} />)
            }
            else {
              return (<></>)
            }
          })
        }
      </div>
    </div>
  )
}
