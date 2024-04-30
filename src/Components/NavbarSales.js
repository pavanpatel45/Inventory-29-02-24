import React, { useState } from "react";
import { Link } from "react-router-dom";
import search from "../Icons/search.png";
import location from "../Icons/location.png";
import data from "../Icons/data.png";
import OrderDropdown from "./OrderDropdown";
export default function NavbarSales({ title, handleCreateOrder }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="flex flex-row justify-between items-center bg-white pl-4 pr-4 pt-2 pb-2">
      <div className="flex flex-row gap-3 " style={{ font: "16px" }}>
        <div>&larr;</div>
        <div style={{ color: "#2D2D2D" }}>{title}</div>
      </div>
      <div className="flex flex-box gap-2">
        <div
          className="rounded-full w-8 h-8 flex items-center justify-center navbarSalesButton cursor-pointer"
          style={{ backgroundColor: "#EFEFEF" }}>
          <img src={search} height="16px" width="16px"  />
        </div>
        <div
          className="rounded-full w-8 h-8 flex items-center justify-center navbarSalesButton cursor-pointer"
          style={{ backgroundColor: "#EFEFEF" }}
        >
          <img src={location} height="12px" width="12px" />
        </div>
        <div
          className="rounded-full w-8 h-8 flex items-center justify-center navbarSalesButton cursor-pointer"
          style={{ backgroundColor: "#EFEFEF" }}
        >
          <img src={data} height="12px" width="12px" />
        </div>

        <div
          className="rounded-full w-8 h-8 text-2xl flex items-top justify-center navbarSalesButton"
          style={{
            backgroundColor: "#EFEFEF",
            color: "#5A5A5A",
            alignItems: "center",
          }}
        >
          <span className="pb-2 cursor-pointer fixed" onClick={handleIconClick}>
            +
          </span>
          <div className="relative top-16 right-28">
            {showDropdown && <OrderDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
}