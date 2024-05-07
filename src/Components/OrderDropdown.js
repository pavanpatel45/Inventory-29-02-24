import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/OrderDropdown.css";

function OrderDropdown() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {isOpen && (
        <div className="outer-box bg-white">
          <div className="box-text">
            <ul>
              <Link to="createOrder">
                <li className="dropHover flex justify-start items-center ">
                  Create New Order
                </li>
              </Link>
              <Link to="makeOrder">
                <li className="dropHover flex justify-start items-center ">
                  Make Order{" "}
                </li>
              </Link>

              <Link to="/sales/purchaseOrder">
                <li className="dropHover flex justify-start items-center">
                  Purchase Order{" "}
                </li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDropdown;
