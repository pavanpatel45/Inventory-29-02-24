import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import "../CSS/OrderDropdown.css";

function Box({ className, icon1, icon2, title, titleStyle, style, options }) {
  const [exportOption, setExportOption] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleChange = (e) => {
    setExportOption(e.target.value);
  };

  const handleBoxClick = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <div
      className={`border border-1 border-r mr-6 flex flex-row justify-center items-center relative ${className}`}
      style={style}
    >
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center" onClick={handleBoxClick}>
          <img
            src={icon1}
            alt="Icon1"
            style={{ height: "20px", width: "20px" }}
          />
          <p className="ml-2" style={{ ...titleStyle, minWidth: "80px" }}> {/* Set a minWidth for the title */}
            {title}
          </p>
          <img src={icon2} alt="Icon2" className="ml-4" />
        </div>
      </div>

      
      {dropdownVisible && (
        <div className="absolute top-0 right-0 mr-0" style={{marginTop:"25px"}}>
          {/* Adjust margin-top and margin-right as needed */}
          <div className="outer-box">
            <div className="box-text">
              <CustomDropdown items={options} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Box;
