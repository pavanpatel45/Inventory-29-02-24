import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import uparrow from '../Icons/ArrowLineopen.svg';
import downarrow from '../Icons/ArrowLineclose.svg';
import productImg from '../Icons/product.png';
import { useNavigate } from 'react-router-dom';

export default function OrderBox({ order, updateStatus }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  console.log('order at OrderBox: ', order);

  function handleOpenBox() {
    setIsOpen(!isOpen);
  }

  const handleCancelledOrder = () => {
    updateStatus(order.orderId, 6);
  };

  return (
    <div
      className={`grid grid-rows-2 rounded-md pl-2 pr-2 gap-2 pt-3 ${
        isOpen ? 'row-span-3' : 'row-span-1'
      }`}
      style={{
        border: '1px solid #c1c1c1',
        height: 'fit-content',
        backgroundColor: '#FAFFFC'
      }}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div
            className='rounded-md flex justify-center p-1'
            style={{ backgroundColor: '#E4E4E4' }}
          >
            <img src={productImg} alt='Product' />
          </div>
          <div>
            <div className='text-sm font-medium' style={{ color: '#4A4A4A' }}>
              Order Quantity: {order.quantity}
            </div>
            <div className='text-xs font-normal' style={{ color: '#2D2D2D' }}>
              {order.productName}
            </div>
          </div>
        </div>
        <div
          className='p-2 h-8 w-8 rounded-full shadow-md flex items-center justify-center'
          onClick={handleOpenBox}
          style={{ backgroundColor: '#E4E4E4' }}
        >
          <img src={isOpen ? uparrow : downarrow} alt='Toggle Arrow' />
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='text-xs font-normal' style={{ color: '#666666' }}>
          Received On {order.receivedDate}
        </div>
        <div className='flex flex-row items-center gap-2'>
          <div
            className='h-2 w-2 rounded-full'
            style={{ backgroundColor: '#EF5E30' }}
          ></div>
          <div className='text-xs font-normal' style={{ color: '#EF5E30' }}>
            {order.availability}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='grid gap-2'>
          <div className='flex flex-row'>
            <div className='text-xs font-medium' style={{ color: '#2D2D2D' }}>
              Order by:
            </div>
            <div className='text-xs font-normal' style={{ color: '#2D2D2D' }}>
              {order.customerName}
            </div>
          </div>
          <div className='flex flex-row'>
            <div className='text-xs font-medium' style={{ color: '#2D2D2D' }}>
              Location:
            </div>
            <div className='text-xs font-normal' style={{ color: '#2D2D2D' }}>
              {order.orderLocation}
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-1 flex-col'>
              <div className='text-xs font-medium' style={{ color: '#696969' }}>
                Available
              </div>
              <div className='text-sm font-medium' style={{ color: '#2D2D2D' }}>
                300
              </div>
            </div>
            <div className='flex gap-1 flex-col'>
              <div className='text-xs font-medium' style={{ color: '#696969' }}>
                Producible
              </div>
              <div className='text-sm font-medium' style={{ color: '#2D2D2D' }}>
                150
              </div>
            </div>
            <div className='flex gap-1 flex-col'>
              <div className='text-xs font-medium' style={{ color: '#696969' }}>
                Unavailable
              </div>
              <div className='text-sm font-medium' style={{ color: '#2D2D2D' }}>
                50
              </div>
            </div>
          </div>
          <div className='leading-4'>
            <div
              className='text-xs font-medium inline'
              style={{ color: '#2D2D2D' }}
            >
              Order Note:
            </div>
            <div
              className='text-xs font-normal inline'
              style={{ color: '#2D2D2D' }}
            >
              {order.orderNote}
            </div>
          </div>
          <div className='grid grid-cols-2 text-center'>
            <button
              className='my-2 mx-2 py-2 rounded-md orderBoxButton'
              style={{ border: '1px solid #2CAE66', color: '#2CAE66' }}
              onClick={handleCancelledOrder}
            >
              <Link to='/sales/Cancelled'>Cancel Order</Link>
            </button>
            <button
              className='my-2 mx-2 py-2 rounded-md orderBoxButton'
              style={{ border: '1px solid #2CAE66', color: '#2CAE66' }}
            >
              <Link to='/sales/viewOrder' state={order}>
                View Order
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
