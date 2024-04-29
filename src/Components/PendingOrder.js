import React,{useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import OrderBoxMedium from './OrderBoxMedium'
import DialogBox from './DialogBox'
import DialogBoxCancelOrder from './DialogBoxCancelOrder'
export default function PendingOrder( ) {
    const allOrders = useSelector((state) => state.orders);
  return (
    <div>
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 gap-2'>
    { 
     allOrders.map((order) => {
         if(order.status == 2){
             return(  <OrderBoxMedium order={order} key={order.id} />)
         }
         else{
             return(<></> )
         }
     })
    }
</div>
</div>
  )
}
