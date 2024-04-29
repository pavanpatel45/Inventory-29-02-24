import React from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {changeStatus } from "../../features/orders/ordersSlice";
import NavbarView from '../../Components/NavbarView'
import productImg from '../../Icons/product.png'
import orderIcon from '../../Icons/Order.svg'
import userIcon from '../../Icons/user.png'
import shippingIcon from '../../Icons/Union.png'
import paymentIcon from '../../Icons/dollar.png'
import productIcon from '../../Icons/package.png'
 export default function ViewOrder(props) {
   const dispatch = useDispatch();
   const location = useLocation();
   // console.log("location",location.state.id);
   const order = location.state;
   const handleConfirmOrder = ()=>{
      // console.log("at handleConfirmOrder :{id}",order.id);
      const status = 3;
       dispatch(changeStatus({id:order.id,status}))
   }
   const handleCancelOrder = ()=>{
      // console.log("at handleConfirmOrder :{id}",order.id);
      // const status = 2;
      //  dispatch(changeStatus({id:order.id,status}))
   }
  return (
    <div className='p-2 grid gap-3 '>
         
        {/*Navbar Starts here */}
           <NavbarView title="View Order" handleConfirmOrder={handleConfirmOrder} handleCancelOrder={handleCancelOrder}/>
        {/*Navbar Ends here */}
        <div className='flex justify-between'>
             {/*left div*/}
              <div className='grid grid-cols-2 grid-rows-2'>
                 <div className='row-span-2 flex items-center justify-center h-8 w-8' style={{backgroundColor:"#D9D9D9"}}><img src={productImg}/></div>
                 <div style={{color:"#2D2D2D"}} className='text-sm'>Order Id : {order.id} </div>
                 <div style={{color:"#666666"}} className='text-xs' >Recived On :{order.orderDetails.receivedDate}</div>
              </div>
              <div className='flex flex-row' >{/*right div*/}
                 <div style={{color:"#666666"}} className='text-sm'>Order Status : </div>
                 <div style={{color:"#F1BE17"}} className='text-sm'>
                  <select>
                     <option>In Progress</option>
                  </select>
                  </div>
              </div>
        </div>
        <div>
           <div className='flex flex-row p-1 items-center gap-2' style={{backgroundColor:"#EBEBEB"}}>
              <div className='h-4 w-4 flex items-center'>
                   <img src={orderIcon} height="16px" width="16px"/>
              </div>
              <div style={{color:"#2D2D2D"}} className='text-base'>Order Details</div>
           </div>
           <div className='grid grid-cols-4 gap-2 pt-1 pb-1'>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Created Date</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Order Location</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>Mumbai</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Batch</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>P023565</div>
              </div>
              <div className='col-span-3'>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Order Note</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>Kindly fulfill an order for 500 Paracetamol strips, each containing 10 tablets, ensuring standard packaging and a minimum 24-month expir</div>
              </div>
               
           </div>
        </div>
        <div>
           <div className='flex flex-row p-1 items-center gap-2' style={{backgroundColor:"#EBEBEB"}}>
              <div className='h-4 w-4 flex items-center'>
                   <img src={productIcon} height="16px" width="16px"/>
              </div>
              <div style={{color:"#2D2D2D"}} className='text-base'>Product Details</div>
           </div>
           <div className='grid grid-cols-4 gap-2 pt-1 pb-1'>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Name</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>Paracetamol 500mg Capsule</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Code</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>PAR001</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Quantity</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>500 Strips</div>
              </div>
               
           </div>
        </div>
        <div>
           <div className='flex flex-row p-1 items-center gap-2' style={{backgroundColor:"#EBEBEB"}}>
              <div className='h-4 w-4 flex items-center'>
                   <img src={paymentIcon} height="16px" width="16px"/>
              </div>
              <div style={{color:"#2D2D2D"}} className='text-base'>Payment Details</div>
           </div>
           <div className='grid grid-cols-4 gap-2 pt-1 pb-1'>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Payment Method</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Card No.</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Card Holder Name</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div >
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Payment Status</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}></div>
              </div>
              <div >
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Payment Date</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}></div>
              </div>
              <div >
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Amount</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}></div>
              </div>
              <div className='col-span-2'>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Billing Address</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>Azura Pharma Pvt Ltd 1234 Elm Street  Anytown, Springfield, Illinois USA Zip - 62701 </div>
              </div>
              <div  className='col-span-4' >
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Payment Note</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget sapien nec nulla ultricies blandit. Pellentesque vestibulum libero quis justo mattis luctus.</div>
              </div>
               
           </div>
        </div>
        <div>
           <div className='flex flex-row p-1 items-center gap-2' style={{backgroundColor:"#EBEBEB"}}>
              <div className='h-4 w-4 flex items-center'>
                   <img src={shippingIcon} height="16px" width="16px"/>
              </div>
              <div style={{color:"#2D2D2D"}} className='text-base'>Shipping Details</div>
           </div>
           <div className='grid grid-cols-4 gap-2 pt-1 pb-1'>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Delivery Date</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Shipping Partner</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div className='col-span-2'>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Delivery Address</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>Azura Pharma Pvt Ltd 1234 Elm Street  Anytown, Springfield, Illinois USA Zip - 62701 </div>
              </div>
              
               
           </div>
        </div>
        <div>
           <div className='flex flex-row p-1 items-center gap-2' style={{backgroundColor:"#EBEBEB"}}>
              <div className='h-4 w-4 flex items-center'>
                   <img src={userIcon} height="16px" width="16px"/>
              </div>
              <div style={{color:"#2D2D2D"}} className='text-base'>Customer Details</div>
           </div>
           <div className='grid grid-cols-4 gap-2 pt-1 pb-1'>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Name</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Email</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Phone</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>April 06 2024</div>
              </div>
              <div className='col-span-3'>
                 <div className='text-sm' style={{color:"#6F6F6F"}}>Address</div>
                 <div className='text-sm' style={{color:"#2D2D2D"}}>Azura Pharma Pvt Ltd 1234 Elm Street  Anytown, Springfield, Illinois USA Zip - 62701 </div>
              </div>
               
           </div>
        </div>
    </div>
  )
}