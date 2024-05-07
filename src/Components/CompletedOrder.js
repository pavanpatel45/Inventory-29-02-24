import React,{useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { changeStatus } from '../features/orders/ordersSlice';
import OrderBoxMedium from './OrderBoxMedium'
import DialogBox from './DialogBox'
import DialogBoxCancelOrder from './DialogBoxCancelOrder'
export default function CompletedOrder( ) {
    const dispactch = useDispatch();
    const allOrders = useSelector((state) => state.orders.orders);
    const [isOpen, setIsOpen] = useState(false);
    const [id,setId] = useState('');
  return (
    <div>
     
    {/* <DialogBoxCancelOrder isOpen={isOpen} setIsOpen={setIsOpen} handleReadytoShip={handleReadytoShip} handleCancelOrder={handleCancelOrder}/> */}
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-3 gap-2'>
    { 
     allOrders.map((order) => {
         if(order.status == 5){
             return(  <OrderBoxMedium order={order} key={order.id}  />)
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
