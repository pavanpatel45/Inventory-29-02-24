import React, { useState } from "react";

function Box({ className, icon1, icon2, title, titleStyle, style, options }) {
  const [exportOption, setExportOption] = useState("");

  const handleChange = (e) => {
    setExportOption(e.target.value);
  };

  return (
    <div
      className={`border border-1 border-r mr-6 flex flex-row justify-center items-center  relative ${className}`}
      style={style}
    >
      <div className="flex flex-row items-center">
        {exportOption === "" ? (
          <div className="flex flex-row items-center">
            <img
              src={icon1}
              alt="Icon1"
              style={{ height: "20px", width: "20px" }}
            />
            <p className="ml-2" style={titleStyle}>
              {title}
            </p>
            <img src={icon2} alt="Icon2" className="ml-4" />
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <p className="ml-2">{exportOption}</p>
            <img src={icon2} alt="Icon2" className="ml-4" />
          </div>
        )}
      </div>
      <select
        className="absolute inset-0 opacity-0 w-full"
        style={{ top: "auto", left: "auto", right: "0", bottom: "0" }}
        onChange={handleChange}
        value={exportOption}
      >
        <option default className="hidden"></option>
       
        {options.map((option, index) => {
          return <option value={option} key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
}

export default Box;