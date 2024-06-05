import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderBoxMedium from './OrderBoxMedium';
import { api_url } from '../Data/Constants';

export default function CompletedOrder() {
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

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');

  return (
    <div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 gap-2'>
        {allOrders.map((order) => {
          if (order.orderStatus === 'Completed') {
            return <OrderBoxMedium order={order} key={order.orderId} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
