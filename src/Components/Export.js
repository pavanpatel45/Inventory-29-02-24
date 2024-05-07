// import React, { useState } from "react";
// import Select, { components } from "react-select";
import exportIcon from "../Icons/export.png";
import down from "../Icons/arrow-down.svg";
import "../CSS/OrderDropdown.css";
import React, { useState, useEffect, useRef } from "react";
import cross from "../Icons/cross.svg";

function Export() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = () => {
    setIsOpen(false);
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
    <div style={{ position: "relative" }}>
      <div
        className="border flex flex-row items-center"
        style={{
          width: "129px",
          height: "42px",
          borderRadius: "8px",
          backgroundColor: "#EFEFEF",
          cursor: "pointer",
        }}
        onClick={toggleDropdown}
      >
        <div className="pl-3">
          <img src={exportIcon} alt="icon" />
        </div>
        <div
          className="pl-2"
          style={{
            fontWeight: "500",
            fontize: "14px",
            fontFamily: "roboto",
            lineHeight: "22px",
          }}
        >
          Export
        </div>
        <div className="pl-3">
          <img src={down} alt="icon" />
        </div>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="outer-box dropdown bg-white"
          style={{
            position: "absolute",
            top: "60%",
            left: "-30%",

            width: "170px",
            height: "134px",
          }}
        >
          <div className="flex flex-row justify-between">
            <p
              className="pb-1 pl-1"
              style={{
                backgroundColor: "white",
                color: "#737373",
                fontSize: "12px",
                letterSpacing: "1%",
              }}
            >
              Export as
            </p>
            <img
              src={cross}
              alt="icon"
              className="pr-2 cursor-pointer"
              onClick={handleSave}
            />
          </div>
          <div className="box-text">
            <ul>
              <li
                className="dropHover flex justify-start items-center"
                style={{ width: "160px" }}
              >
                <input type="checkbox" onChange={handleCheckboxChange} />{" "}
                <p className="pl-2">.CSV</p>
              </li>
              <li
                className="dropHover flex justify-start items-center "
                style={{ width: "160px" }}
              >
                <input type="checkbox" onChange={handleCheckboxChange} />{" "}
                <p className="pl-2">.PDF</p>
              </li>
            </ul>
            <div className="flex justify-end pt-1">
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
                className={!isAnyCheckboxSelected ? "cursor-not-allowed" : ""}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Export;
