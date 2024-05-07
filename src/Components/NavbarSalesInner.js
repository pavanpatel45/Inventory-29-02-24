import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import "../CSS/NavbarSalesInner.css"
export default function NavbarSalesInner() {
  return (
    <div className="flex flex-row text-sm gap-4 px-3" style={{ color: "#2D2D2D" }} >
      <NavLink to="/sales/newOrderRequest">
        <div className={`flex flex-row items-center gap-1 navbar-border-bottom`} >
          <div className="h-2 w-2  rounded-full  navbar-circle navbar-circle-blue"></div>
          <div >New Order Request</div>
        </div>
      </NavLink>
      <NavLink to="/sales/Pending">
        <div className={`flex flex-row items-center gap-1 navbar-border-bottom `} >
          <div className="h-2 w-2  rounded-full navbar-circle navbar-circle-pending" ></div>
          <div  >Pending</div>
        </div>
      </NavLink>
      <NavLink to="/sales/InProgress">
        <div className={`flex flex-row items-center gap-1  navbar-border-bottom`}>
          <div className="h-2 w-2  rounded-full  navbar-circle navbar-circle-yellow" ></div>
          <div >In Progress</div>
        </div>
      </NavLink>
      <NavLink to="/sales/Shipped">
        <div className={`flex flex-row items-center gap-1 navbar-border-bottom`} >
          <div className="h-2 w-2  rounded-full navbar-circle navbar-circle-shipped" ></div>
          <div >Shipped</div>
        </div>
      </NavLink>
      <NavLink to="/sales/Completed">
        <div className={`flex flex-row items-center gap-1  navbar-border-bottom`} >
          <div className="h-2 w-2  rounded-full navbar-circle navbar-circle-green" ></div>
          <div >Completed Order</div>
        </div>
      </NavLink>
      <NavLink to="/sales/Cancelled">
        <div className={`flex flex-row items-center gap-1 navbar-border-bottom`} >
          <div className="h-2 w-2  rounded-full navbar-circle navbar-circle-red"></div>
          <div >Cancelled Order</div>
        </div>
      </NavLink>
    </div>
  )
}
