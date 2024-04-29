import React, {useState} from 'react'
import {Outlet} from "react-router-dom";
import NavbarSide from '../Components/NavbarSide';
import NavbarTop from '../Components/NavbarTop';
import CreateOrder from '../Components/MakeOrder';
import SalesOrders from '../pages/orders/SalesOrders';
import ViewOrder from '../pages/orders/ViewOrder';
export default function RootLayout() {
  const [active,setActive] = useState(false);
  return (
    <div className=" flex max-h-screen scrollbar " style={{height:"100vh"}}>
    <div>
      <NavbarSide active={active} setActive={setActive}/>
    </div>
    <div className="w-full">
      <div className="">
        <NavbarTop />
      </div>
      <div
        className={` m-2 overflow-auto scrollbar  `}
        style={{ height: "87vh", width: active ? "80vw" : "92.4vw"}}
      >
           <Outlet/>
      </div>
    </div>
  </div>
  )
}
