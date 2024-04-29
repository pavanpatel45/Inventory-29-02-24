import React, { useState } from "react";
import { Link } from "react-router-dom";

function OrderDropdown() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {isOpen && (
        <div
          style={{
            border: "10px",
            borderColor: "#B7B7B7",
            marginTop: "5px",
            padding: "10px",
            width: "180px",
            height: "106px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              background: "white",
              color: "#696969",
              fontWeight: "400",
              fontSize: "15px",
              fontFamily: "Roboto",
              letterSpacing: "1%",
            }}
          >
            <ul>
             <Link to="createOrder">
                <li
                  className="dropHover pb-2 flex justify-center pt-1 border border-r-2"
                  style={{ height: "32px", width: "170px" }}
                >
                  Create New Order
                </li>
              </Link>
             <Link to="makeOrder">
                <li
                  className="dropHover flex justify-center pt-1  pb-2 border  border-r-2"
                  style={{ height: "32px", width: "170px" }}
                >
                  Make Order{" "}
                </li>
             </Link>

              <Link to="/sales/purchaseOrder">
                <li
                  className="dropHover flex justify-center pt-1  pb-2 border border-r-2"
                  style={{ height: "32px", width: "170px" }}
                >
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
