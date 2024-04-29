import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
export default function NavbarView({ title,handleConfirmOrder,handleCancelOrder }) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 " style={{ font: "16px" }}>
      <Link to="/sales/NewOrderRequest"> <div>&larr;</div></Link>
        <div style={{ color: "#2D2D2D" }}>{title}</div>
      </div>
      <div className="flex flex-box gap-2 items-center">
        
      <Link to="/sales/InProgress" state={{status:"3"}}>
        <button
          className=" my-2 mx-2 py-2 px-2 rounded-md orderBoxButton"
          style={{ border: "1px solid #2CAE66", color: "#2CAE66" }}
          onClick={handleConfirmOrder}
        >
          Confirm
        </button>
        </Link>
        <Link to="/sales/NewOrderRequest" >
        <button
          className=" my-2 mx-2 py-2 px-2 rounded-md orderBoxButton"
          style={{ border: "1px solid #2CAE66", color: "#2CAE66" }}
          onClick={handleCancelOrder}
        >
          
          Cancel
        </button>
        </Link>
      </div>
    </div>
  );
}
