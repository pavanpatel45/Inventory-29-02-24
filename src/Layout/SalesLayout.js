import React from 'react'
import {Outlet} from "react-router-dom";
import NavbarSales from '../Components/NavbarSales';
import NavbarSalesInner from '../Components/NavbarSalesInner';
import FooterPagination from '../Components/FooterPagination';

export default function SalesLayout() {
  return (
    <div className="bg-white flex flex-col justify-start ">
    <div className="scrollbar" style={{height: "80vh" , overflow: 'auto' }}>
      <div className="">
     <NavbarSales title="Sales Order" />
     </div>
     {/* Navbar for order status Starts here*/}
     <div >
     <NavbarSalesInner/>
     </div>
     {/* Navbar for order status Ends here*/}
     <div className="grid grid-cols-1 ">
        <Outlet/>
     </div>
   </div>
   <div className="">
     <FooterPagination />
   </div>
 </div>
  )
}
