import React, { useState } from "react";
import checkbox from "../Icons/checkbox.svg";
import "../CSS/CheckBox.css";

function CheckBox() {
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);

  const handleYesChange = () => {
    setYesChecked(!yesChecked);
    if (noChecked) {
      setNoChecked(false);
    }
  };

  const handleNoChange = () => {
    setNoChecked(!noChecked);
    if (yesChecked) {
      setYesChecked(false);
    }
  };

  return (
    <div className="checkbox-container">
      <div>
        <label
          htmlFor="refrigeration"
          className="checkbox-label"
        >
          Refrigeration
        </label>
      </div>
      <div className="flex pb-2 mt-2 md:mt-0 md:ml-4">
        <label className="flex items-center">
          {yesChecked && (
            <img
              src={checkbox}
              alt="icon"
              className="checkbox-image"
            />
          )}
          <input
            type="checkbox"
            checked={yesChecked}
            onChange={handleYesChange}
            className="checkbox-input"
          />
          <span className="checkbox-label">Yes</span>
        </label>
        <label className="flex items-center ml-4">
          {noChecked && (
            <img
              src={checkbox}
              alt="icon"
              className="checkbox-image"
            />
          )}
          <input
            type="checkbox"
            checked={noChecked}
            onChange={handleNoChange}
            className="checkbox-input"
          />
          <span className="checkbox-label">No</span>
        </label>
      </div>
    </div>
  );
}

export default CheckBox;
 