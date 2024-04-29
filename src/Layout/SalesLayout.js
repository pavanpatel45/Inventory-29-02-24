import React from 'react'
import {Outlet} from "react-router-dom";
import NavbarSales from '../Components/NavbarSales';
import NavbarSalesInner from '../Components/NavbarSalesInner';
import FooterPagination from '../Components/FooterPagination';

export default function SalesLayout() {
  return (
    <div className="bg-white flex flex-col justify-between ">
    <div className="scrollbar" style={{height: "80vh" , overflow: 'auto' }}>
     <NavbarSales title="Sales" />
     {/* Navbar for order status Starts here*/}
     <NavbarSalesInner/>
     {/* Navbar for order status Ends here*/}
     <div className="grid grid-cols-1 p-3">
        <Outlet/>
     </div>
   </div>
   <div className="px-3 ">
     <FooterPagination />
   </div>
 </div>
  )
}
