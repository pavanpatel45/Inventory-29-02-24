import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "./Box";
import Button from "./Button";
import search from "../Icons/search.png";
import exprt from "../Icons/export.png";
import plus from "../Icons/plus-outline.svg";
import loc from "../Icons/location.png";
import downArrow from "../Icons/down-arrow.png";
import "../CSS/NavbarMaterials.css";

export default function NavbarMaterials({ className }) {
  const [exportOption, setExportOption] = useState("");

  const handleChange = (e) => {
    setExportOption(e.target.value);
  };

  return (
    <div className="flex flex-row justify-between items-center  ml-4 mt-3 bg-white">
      <div className="flex flex-row gap-2 ">
        
        <div className="font-medium">Product View</div>
      </div>

      <div className="flex justify-end">
        <div
          className="border border-1 border-r mr-6 flex flex-row items-center relative box-style"
          style={{ borderRadius: "100px" }}
        >
          <img src={search} alt="icon" className="ml-3" />
          <input type="text" className="ml-3 txt-style" placeholder="Search" />
        </div>

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
        />

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

        <Link to="CreateBatchProduct">
          <Button btnTitle={"Add"} className="style" icon={plus}>
            </Button>
        </Link>
      </div>
    </div>
  );
}
