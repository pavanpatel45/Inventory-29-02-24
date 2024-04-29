import React,{useState} from "react";
import {Link} from 'react-router-dom'
import Box from "./Box";
import Button from './Button'
import search from '../Icons/search.png'
import exprt from '../Icons/export.png'
import loc from '../Icons/location.png'
import downArrow from '../Icons/down-arrow.png'
export default function NavbarMaterials({
  className,
}) {
  const [exportOption, setExportOption] = useState("");

  const handleChange = (e) => {
    setExportOption(e.target.value);
  };
  return (
    <div className="flex flex-row justify-between items-center py-2">
      <div className="flex flex-row gap-2 ">
        <div>&larr;</div>
        <div className="font-medium">Materials View</div>
      </div>

      <div className="flex justify-end">
        <div className="flex justify-end">
          <div
            className="border border-1 border-r mr-6 flex flex-row items-center relative h-10 w-44"
            style={{ borderRadius: "8px", backgroundColor: "#EFEFEF" }}
          >
            <img src={search} alt="icon" className="ml-3" />
            <input
              type="text"
              className="ml-3"
              style={{
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "22px",
                fontFamily: "Roboto",
                backgroundColor: "transparent",
              }}
              placeholder="Search"
            />
          </div>
        </div>

        <Box
          style={{ borderRadius: "8px", backgroundColor: "#EFEFEF" }}
          className="h-10 w-44"
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
          style={{ borderRadius: "8px", backgroundColor: "#EFEFEF" }}
          className="h-10 w-32"
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

       <Link to="CreateBatch"> <Button
          btnTitle={"Add +"}
          // className="p-2 border-1 border-solid border-black rounded-md pt-0 pb-0"
          // style={buttonStyle}
        /></Link>
      </div>
    </div>
  );
}
