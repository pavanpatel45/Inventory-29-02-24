import React, { useState } from "react";
import {Link} from 'react-router-dom'
import uparrow from "../Icons/ArrowLineopen.svg";
import downarrow from "../Icons/ArrowLineclose.svg";
import productImg from "../Icons/product.png";
export default function OrderBox({ order, key, handleChangeStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenBox() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
  return (
    <div
      className={`grid grid-rows-2 rounded-md pl-2 pr-2 gap-2 pt-3 ${
        isOpen ? "row-span-3" : "row-span-1"
      }`}
      style={{
        border: "1px solid #c1c1c1",
        height: "fit-content",
        backgroundColor: "#FAFFFC",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="rounded-md flex justify-center p-1"
            style={{ backgroundColor: "#E4E4E4" }}
          >
            <img src={productImg} />
          </div>
          <div>
            <div className="text-sm font-medium" style={{ color: "#4A4A4A" }}>
              Order Quantity: {order.quantity}
            </div>
            <div className="text-xs font-normal" style={{ color: "#2D2D2D" }}>
              {order.productName}
            </div>
          </div>
        </div>
        <div
          className="  p-2 h-8 w-8 rounded-full shadow-md flex items-center justify-center"
          onClick={handleOpenBox}
          style={{ backgroundColor: "#E4E4E4" }}
        >
          <img src={isOpen ? uparrow : downarrow} />
        </div>
      </div>
      <div className=" flex justify-between items-center">
        <div className="text-xs font-normal" style={{ color: "#666666" }}>
          Received On {order.receivedDate}
        </div>
        <div className="flex flex-row items-center gap-2">
          <div
            className="h-2 w-2 rounded-full "
            style={{ backgroundColor: "#EF5E30" }}
          ></div>
          <div className="text-xs font-normal" style={{ color: "#EF5E30" }}>
            Available
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="grid gap-2">
          <div>
            <div className="text-xs font-medium" style={{ color: "#2D2D2D" }}>
              Order by : {order.customerName}
            </div>
            <div
              className="text-xs font-normal"
              style={{ color: "#2D2D2D" }}
            ></div>
          </div>
          <div>
            <div className="text-xs font-medium" style={{ color: "#2D2D2D" }}>
              Est. Delivery Date : {order.deliveryDate}
            </div>
            <div
              className="text-xs font-normal"
              style={{ color: "#2D2D2D" }}
            ></div>
          </div>
          <div>
            <div className="text-xs font-medium" style={{ color: "#2D2D2D" }}>
              Order Id : {order.orderId}
            </div>
            <div
              className="text-xs font-normal"
              style={{ color: "#2D2D2D" }}
            ></div>
          </div>
          <div
            className={`grid grid-cols-${
              handleChangeStatus ? "2" : "1"
            } text-center`}
          >
            <button
              className="  my-1 mx-1 py-2 rounded-md orderBoxButton "
              style={{ border: "1px solid #2CAE66", color: "#2CAE66", width:"134px" }}
            >
              <Link to="/sales/viewOrder" state={order}>
                View Order
              </Link>
            </button>
            {handleChangeStatus && (
              <button
                className=" my-1 mx-1 py-2 rounded-md orderBoxButton  "
                style={{ border: "1px solid #2CAE66", color: "#2CAE66" }}
                onClick={() => handleChangeStatus({ id: order.orderId })}
              >
                Change Status
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
