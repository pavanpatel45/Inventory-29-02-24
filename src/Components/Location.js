import React, { useState, useEffect } from "react";
import down from "../Icons/arrow-down.svg";
import locationIcon from "../Icons/location.svg";
import search from "../Icons/search-navbar.svg";
import { Popover } from "react-tiny-popover";
import "../CSS/OrderDropdown.css";
import cross from "../Icons/cross.svg";

function Location() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const togglePopoverOpen = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);

  const handleSave = () => {
    setIsPopoverOpen(false);
    
  };

  const handleClear = () => {
    // Uncheck all checkboxes
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setIsAnyCheckboxSelected(false); 
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIsAnyCheckboxSelected(true); // At least one checkbox is checked
    } else {
      // Check if any checkbox is still checked
      const anyCheckboxSelected =
        document.querySelectorAll("input[type='checkbox']:checked").length > 0;
      setIsAnyCheckboxSelected(anyCheckboxSelected); // Update state based on whether any checkbox is still checked
    }
  };

  useEffect(() => {
    // Reset isAnyCheckboxSelected when the dropdown is closed
    if (!isOpen) {
      setIsAnyCheckboxSelected(false);
    }
  }, [isOpen]);

  return (
    <div>
      <Popover
       isOpen={isPopoverOpen}
        positions={["up", "left", "bottom", "right"]}
        padding={80}
        reposition={true}
        onClickOutside={() => setIsPopoverOpen(false)}
        containerStyle={{
          position: "absolute",
          top: "112px",
          left: 0,
          width: "170px",
        }}
        content={() => (
          <div className="outer-box bg-white">
            <div className="flex flex-row ">
              <img src={search} alt="icon" />

              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-24 pl-2"
                  style={{ fontSize: "12px" }}
                />
              </div>

              <img
                src={cross}
                alt="icon"
                className="pl-6 cursor-pointer"
                onClick={handleSave}
              />
            </div>

            <ul className="bg-white box-text text-black">
              <div className="flex flex-row items-center dropHover">
                <input
                  type="checkbox"
                  className=" pl-1"
                  onChange={handleCheckboxChange}
                />
                <li className=" pl-2 mb-0.5">Item1</li>
              </div>
              <div className="flex flex-row items-center dropHover">
                <input type="checkbox" onChange={handleCheckboxChange} />
                <li className=" pl-2 mb-0.5">Item1</li>
              </div>{" "}
              <div className="flex flex-row items-center dropHover">
                <input type="checkbox" onChange={handleCheckboxChange} />
                <li className=" pl-2 mb-0.5">Item1</li>
              </div>
            </ul>
            <div className="flex justify-end pt-1">
            <button
               
                style={{
                  width: "46px",
                  height: "24px",
                  backgroundColor:"#",
                  borderRadius: "4px",
                  color: "#9A9898",
                  fontSize: "12px",
                  fontWeight: "500",
                  borderColor:"#D1D0D0"
                }}
                className="mr-2 border border-1 "
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                onClick={handleSave}
                style={{
                  width: "48px",
                  height: "24px",
                  backgroundColor: isAnyCheckboxSelected
                    ? "#2CAE66"
                    : "#EBEBEB",
                  borderRadius: "4px",
                  color: isAnyCheckboxSelected ? "white" : "#9A9898",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
                disabled={!isAnyCheckboxSelected}
                className={isAnyCheckboxSelected ? "" : "cursor-not-allowed"}
              >
                Save
              </button>
             
            </div>
          </div>
        )}
      >
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
            <img src={locationIcon} alt="icon" style={{ color: "black" }} />
          </div>
          <div className="pr-2" style={{ fontSize: "16px", fontWeight: "500" }}>
            All Locations
          </div>
          <div className="pr-5">
            <img src={down} alt="icon" />
          </div>
        </div>
      </Popover>
    </div>
  );
}
export default Location;
