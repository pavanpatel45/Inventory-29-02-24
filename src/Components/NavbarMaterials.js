import React, { useState } from "react";
import { Link } from "react-router-dom";

import Location from "./Location";
import Export from "./Export";
import Button from "./Button";
import search from "../Icons/search.png";

import plus from "../Icons/plus-outline.svg";
import loc from "../Icons/location.png";
import downArrow from "../Icons/down-arrow.png";
import dlt from "../Icons/Delete.svg";
import cancel from '../Icons/x.svg'

import "../CSS/NavbarMaterials.css";

export default function NavbarMaterials({ className,select=true,count }) {
  const [exportOption, setExportOption] = useState("");

  const handleChange = (e) => {
    setExportOption(e.target.value);
  };

  return (
    <div className="flex flex-row justify-between items-center  ml-4 mt-3 bg-white">
      <div className="flex flex-row gap-2 ">
      {!select &&
        <div className="font-medium">Materials View</div>}
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
        >
          <img src={search} alt="icon" className="ml-3" />
          <input type="text" className="ml-3 txt-style" placeholder="Search" />
        </div>}
        {!select &&
         <div className="mr-4">
         <Location />
       </div>
       }
        <div className="mr-4">
          <Export />
        </div>

         {!select &&
        <Link to="CreateBatch">
          <Button btnTitle={"Add"} className="style" icon={plus}>
            </Button>
        </Link>}
        {select &&
          <Button btnTitle={"Delete"} className="style1" icon={dlt}>
            </Button> }
      </div>
    </div>
  );
}
