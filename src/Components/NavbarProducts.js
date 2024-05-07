import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Box from "./Box";
import Button from "./Button";
import search from "../Icons/search.png";

import plus from "../Icons/plus-outline.svg";
import dlt from "../Icons/Delete.svg";
import cancel from '../Icons/x.svg'
import downArrow from "../Icons/down-arrow.png";

import "../CSS/NavbarMaterials.css";
import Location from "./Location";
import Export from "./Export";

export default function NavbarMaterials({ className,select=true,count,handleDelete }) {
  const [exportOption, setExportOption] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const handleChange = (e) => {
    setExportOption(e.target.value);
  };
  const handleSearch = () => {
    setIsSearchClicked(true);
  };
 

  return (
    <div className="flex flex-row justify-between items-center  ml-4 mt-3 bg-white">
      <div className="flex flex-row gap-2 ">
      {!select &&
        <div className="font-medium">Product View</div>
        }
        {select && 
           <div className="flex flex-row gap-2" >
              <img src={cancel} />
              <div style={{color:"#343434",fontWeight:"500"}}>{count} Item(s) Selected</div>
           </div>
          } 
      </div>

      <div className="flex justify-end">
      {!select &&
        <div
        className="border border-1 border-r mr-4 flex flex-row items-center relative box-style"
        style={{ borderRadius: "100px" }}
        onClick={handleSearch}
      >
        <img src={search} alt="icon" className="ml-3" />
        <input
          type="text"
          className="pl-2 txt-style"
          style={{ width: isSearchClicked ? "330px" : "190px" , fontSize:"14px", color:"#A2A1A1"}}
          placeholder={isSearchClicked ? "Type here to search" : "Search"}
        />
      </div>}
        {!select &&
    

        <div className="mr-4">
          <Location />
        </div> }

        <div className="mr-4">
          <Export />
        </div>
       {!select &&
        <Link to="CreateBatchProduct">
          <Button btnTitle={"Add"} className="style" icon={plus}>
            </Button>
        </Link>}
        {/* <Link to="CreateBatchProduct"> */}
        {select &&
          <Button btnTitle={"Delete"} className="style1" icon={dlt} onClickfunction={handleDelete}>
            </Button> }
      </div>
    </div>
  );
}
