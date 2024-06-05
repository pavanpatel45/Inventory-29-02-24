import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api_url } from '../Data/Constants';
import OrderBoxMedium from './OrderBoxMedium';

export default function PendingOrder() {
  const [allOrders, setAllOrders] = useState([]);

  const getData = async () => {
    try {
      const url = `${api_url}/order/`;
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log('Response at newOrderRequest', response.data);
      setAllOrders(response.data);
    } catch (error) {
      console.log('Error :', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 gap-2'>
        {allOrders.map((order, index) =>
          order.orderStatus === 'Pending' ? (
            <OrderBoxMedium order={order} key={index} />
          ) : null
        )}
      </div>
    </div>
  );
}
