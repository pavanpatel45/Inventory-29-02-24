import React, { useState } from "react";
import { Link } from "react-router-dom";
import search from "../Icons/search.svg";
import location from "../Icons/filter icon.svg";
import data from "../Icons/data.svg";
import plus from "../Icons/plus.svg"
import OrderDropdown from "./OrderDropdown";
import Location from "./Location"


export default function NavbarSales({ title, handleCreateOrder }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopoverOpen = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className="flex flex-row justify-between items-center bg-white pl-4 pr-4 pt-2 pb-2">
      <div className="flex flex-row gap-3 " style={{ font: "16px" }}>
        <div style={{ color: "#2D2D2D", fontSize:"16px", fontWeight:"500" }}>{title}</div>
      </div>
      <div className="flex flex-box gap-3">
        <div className="cursor-pointer">
          <img src={search}  />
        </div>
        <div className="cursor-pointer ">
          <Location>
            <div  onClick={togglePopoverOpen}>
          <img src={location}  alt="location" />
          </div>  
          </Location>
        </div>
        <div className="cursor-pointer" >
          <img src={data} />
        </div>

        <div className="cursor-pointer">
          <img src={plus} onClick={handleIconClick} />
          <div style={{position:"absolute" ,top:"6.8rem", right:"4rem"}} >
            {showDropdown && <OrderDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
}