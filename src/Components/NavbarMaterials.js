import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import down from "../Icons/arrow-down.svg";
import locationIcon from "../Icons/location.svg";
import Export from "./Export";
import Button from "./Button";
import search from "../Icons/search.png";
import plus from "../Icons/plus-outline.svg";
import dlt from "../Icons/Delete.svg";
import cancel from "../Icons/x.svg";

import "../CSS/NavbarMaterials.css";
import Location from "./Location";
import { api_url } from "../Data/Constants";
import axios from "axios";

export default function NavbarMaterials({
  className,
  select = true,
  count,
  handleDelete,
  selected,
  setSelected,
  materialsTableData,
  selectedLocation,
  setSelectedLocation
}) {
  const [exportOption, setExportOption] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [locationData,setLocationData] = useState([]);
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);
  const handleChange = (e) => {
    setExportOption(e.target.value);
  };
  const togglePopoverOpen = () => {
    if(!isPopoverOpen){
      setSelectedLocation([]);
      setIsAnyCheckboxSelected(false);
    }
    setIsPopoverOpen(!isPopoverOpen);
    
  };

  const handleSearch = () => {
    setIsSearchClicked(true);
  };
  const getLocations = async () =>{
    try {
      const url = `${api_url}/productCategory/getAllLocations`;
      const response = await axios.get(url, {
          headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log('Response at newOrderRequest', response.data);
      setLocationData(response.data);
    }
    catch (error) {
        console.log("Error :", error);
    }
  }
  useEffect(()=>{
    getLocations();
  },[])
  return (
    <div className="flex flex-row justify-between items-center  ml-4 mt-3 bg-white">
      <div className="flex flex-row gap-2 ">
        {!select && <div className="font-medium">Materials View</div>}
        {select && (
          <div className="flex flex-row gap-2">
            <img
              src={cancel}
              onClick={() => {
                setSelected([]);
                materialsTableData();
              }}
            />
            <div style={{ color: "#343434", fontWeight: "500" }}>
              {count} Item(s) Selected
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {!select && (
          <div
            className="border border-1 border-r mr-4 flex flex-row items-center relative box-style"
            style={{ borderRadius: "100px" }}
            onClick={handleSearch}
          >
            <img src={search} alt="icon" className="ml-3" />
            <input
              type="text"
              className="pl-2 txt-style"
              style={{
                width: isSearchClicked ? "330px" : "190px",
                fontSize: "14px",
                color: "#A2A1A1",
              }}
              placeholder={isSearchClicked ? "Type here to search" : "Search"}
            />
          </div>
        )}
        {!select && (
          <div className="mr-4">
            <Location Options={locationData} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} isPopoverOpen={isPopoverOpen} setIsPopoverOpen={setIsPopoverOpen} isAnyCheckboxSelected={isAnyCheckboxSelected} setIsAnyCheckboxSelected={setIsAnyCheckboxSelected}>
              <div
                className="border flex flex-row items-center justify-between cursor-pointer"
                style={{
                  width: "170px",
                  height: "42px",
                  borderRadius: "8px",
                  backgroundColor: "#EFEFEF",
                  position: "relative",
                }}
                onClick={togglePopoverOpen}
              >
                <div className="pl-2">
                  <img
                    src={locationIcon}
                    alt="icon"
                    style={{ color: "black" }}
                  />
                </div>
                <div
                  className="pr-2"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  All Locations
                </div>
                <div className="pr-5">
                  <img src={down} alt="icon" />
                </div>
              </div>
            </Location>
          </div>
        )}
        <div className="mr-4">
          <Export />
        </div>

        {!select && (
          <Link to="CreateBatch">
            <Button btnTitle={"Add"} className="style" icon={plus}></Button>
          </Link>
        )}
        {select && (
          <Button
            btnTitle={"Delete"}
            className="style1"
            icon={dlt}
            onClickfunction={handleDelete}
          ></Button>
        )}
      </div>
    </div>
  );
}
