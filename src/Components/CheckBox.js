import React, { useState } from "react";

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
    <div className="flex flex-col md:flex-row items-center">
      <div>
        <label
          htmlFor="refrigeration"
          className="text-base md:text-lg"
          style={{
            color: "#2D2D2D",
            borderColor: "#A1A1A1",
            fontWeight: "500",
            lineHeight: "20px",
          }}
        >
          Refrigeration
        </label>
      </div>
      <div className="flex items-center mt-2 md:mt-0 md:ml-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={yesChecked}
            onChange={handleYesChange}
            className="rounded-full h-5 w-5 md:h-6 md:w-6 mr-2 border border-solid border-1 border-gray-600"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              backgroundColor: yesChecked ? "black" : "white",
            }}
          />
          <span className="text-base md:text-lg">Yes</span>
        </label>
        <label className="flex items-center ml-4">
          <input
            type="checkbox"
            checked={noChecked}
            onChange={handleNoChange}
            className="rounded-full h-5 w-5 md:h-6 md:w-6 mr-2 border border-solid border-1 border-gray-600"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              backgroundColor: noChecked ? "black" : "white",
            }}
          />
          <span className="text-base md:text-lg">No</span>
        </label>
      </div>
    </div>
  );
}

export default CheckBox;