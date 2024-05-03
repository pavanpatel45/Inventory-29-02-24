import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "./Box";
import Button from "./Button";
import search from "../Icons/search.png";
import exprt from "../Icons/export.png";
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
          className="border border-1 border-r mr-6 flex flex-row items-center relative box-style"
          style={{ borderRadius: "100px" }}
        >
          <img src={search} alt="icon" className="ml-3" />
          <input type="text" className="ml-3 txt-style" placeholder="Search" />
        </div>}
        {!select &&
        <Box
          className="box-style"
          icon1={loc}
          icon2={downArrow}
          title="All Locations"
          titleStyle={{
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
          }}
          options={["INDIA", "AMERICA"]}
        />}
        <Box
          className="box-style"
         
          icon1={exprt}
          icon2={downArrow}
          title="Export"
          titleStyle={{
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
          }}
          options={["EXCEL", "CSV", "PDF"]}
        />
         {!select &&
        <Link to="CreateBatch">
          <Button btnTitle={"Add"} className="style" icon={plus}>
            </Button>
        </Link>}
        {select &&
          <Button btnTitle={"Delete"} className="style1" icon={dlt}>
            </Button> }
        {/* </Link> */}
      </div>
    </div>
  );
}
