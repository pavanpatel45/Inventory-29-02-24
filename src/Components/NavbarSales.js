import React, { useState } from "react";
import { Link } from "react-router-dom";
import search from "../Icons/search.svg";
import searchBox from "../Icons/search.png";
import location from "../Icons/filter icon.svg";
import data from "../Icons/data.svg";
import plus from "../Icons/plus.svg"
import OrderDropdown from "./OrderDropdown";
import Location from "./Location"
import "../CSS/NavbarMaterials.css";


export default function NavbarSales({ title, handleCreateOrder }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopoverOpen = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const handleSearch = () => {
    setIsSearchClicked(!isSearchClicked);
  };


  return (
    <div className="flex flex-row justify-between items-center bg-white pl-4 pr-4 pt-2 pb-2">
      <div className="flex flex-row gap-3 " style={{ font: "16px" }}>
        <div style={{ color: "#2D2D2D", fontSize:"16px", fontWeight:"500" }}>{title}</div>
      </div>
      <div className="flex flex-box gap-3 items-center">

        <div className="cursor-pointer" onClick={handleSearch}>
        {!isSearchClicked && <img src={search} alt="icon" />}
          {isSearchClicked &&
          <div className="flex flex-row items-center border border-1 border-r mr-4  relative box-style" style={{ borderRadius: "100px"}}>
            <div className="pl-3">
            <img src={searchBox} alt="icon" />
            </div>
            <div  >
          <input
              type="text"
              className="pl-3 txt-style "
              style={{
                width: "330px",
                fontSize: "14px",
                color: "#A2A1A1",
               
                backgroundColor:" #EFEFEF"
              }}
              placeholder="Type here to search" 
            />
            </div>
            </div>
}
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