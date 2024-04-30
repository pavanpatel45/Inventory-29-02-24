import React, { useState } from "react";
import { Link } from "react-router-dom";
import search from "../Icons/search.svg";
import location from "../Icons/location.svg";
import data from "../Icons/data.svg";
import plus from "../Icons/plus.svg"
import OrderDropdown from "./OrderDropdown";
export default function NavbarSales({ title, handleCreateOrder }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="flex flex-row justify-between items-center bg-white pl-4 pr-4 pt-2 pb-2">
      <div className="flex flex-row gap-3 " style={{ font: "16px" }}>
        <div style={{ color: "#2D2D2D" }}>{title}</div>
      </div>
      <div className="flex flex-box gap-3">
        <div>
          <img src={search}   />
        </div>
        <div>
          <img src={location}   />
        </div>
        <div >
          <img src={data} />
        </div>

        <div>
          <img src={plus} onClick={handleIconClick}/>
          <div style={{position:"absolute" ,top:"6.8rem", right:"4rem"}} >
            {showDropdown && <OrderDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
}