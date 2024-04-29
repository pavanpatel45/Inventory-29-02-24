import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import "../CSS/NavbarSalesInner.css"
export default function NavbarSalesInner() {
  return (
    <div className="flex flex-row text-sm gap-4 px-3" style={{ color: "#565656" }} >
      <NavLink to="/sales/newOrderRequest">
        <div className={`flex flex-row items-center gap-1`} style={{ borderColor: "#2DA060" }}>
          <div className="h-2 w-2  rounded-full navbar-circle"></div>
          <div className='navbar-border-bottom'>New Order Request</div>
        </div>
      </NavLink>
      <NavLink to="/sales/Pending">
        <div className={`flex flex-row items-center gap-1 `} style={{ borderColor: "#2DA060" }} >
          <div className="h-2 w-2  rounded-full navbar-circle" ></div>
          <div className='navbar-border-bottom'>Pending</div>
        </div>
      </NavLink>
      <NavLink to="/sales/InProgress">
        <div className={`flex flex-row items-center gap-1  `} style={{ borderColor: "#2DA060" }} >
          <div className="h-2 w-2  rounded-full navbar-circle" ></div>
          <div className='navbar-border-bottom'>In Progress</div>
        </div>
      </NavLink>
      <NavLink to="/sales/Shipped">
        <div className={`flex flex-row items-center gap-1 `} style={{ borderColor: "#2DA060" }} >
          <div className="h-2 w-2  rounded-full navbar-circle" ></div>
          <div className='navbar-border-bottom'>Shipped</div>
        </div>
      </NavLink>
      <NavLink to="/sales/Completed">
        <div className={`flex flex-row items-center gap-1  `} style={{ borderColor: "#2DA060" }} >
          <div className="h-2 w-2  rounded-full navbar-circle" ></div>
          <div className='navbar-border-bottom'>Completed Order</div>
        </div>
      </NavLink>
      <NavLink to="/sales/Cancelled">
        <div className={`flex flex-row items-center gap-1 `} style={{ borderColor: "#2DA060" }}>
          <div className="h-2 w-2  rounded-full navbar-circle"></div>
          <div className='navbar-border-bottom'>Cancelled Order</div>
        </div>
      </NavLink>
    </div>
  )
}
