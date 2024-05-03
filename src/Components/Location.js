import React, { useState } from "react";
import Select from "react-select";
import locationIcon from "../Icons/location.png";

const options = [
  {
    value: "chocolate",
    label: "Chocolate",
    
  },
  {
    value: "strawberry",
    label: "Strawberry",
    
  },
  {
    value: "vanilla",
    label: "Vanilla",
  
  },
];

const colorStyles = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? "1px #EDEEF0" : "0",
    borderRadius: "8px",
    boxShadow: "none", // This line disable the blue border
    padding: "4px 0px",
    width: "170px",
    height: "42px",
    fontSize: "14px",
    fontWeight: "500",
    color: "black",
    borderRadius: "8px",
    backgroundColor: "#EFEFEF",
    "&:hover": { backgroundColor: "#EFEFEF" },
  }),
  option: (provided, state) => ({
    ...provided,
    
    color:"#696969",
    backgroundColor:"white",
    "&:hover": {
      backgroundColor: "#DDF8E9",
      color: "black",
      fontWeight:"500" ,
      borderRadius:"8px"
    },
    fontSize: "14px",
    fontWeight: "400",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "8px",
    color: "black", // Customize the color of the icon
    "&:hover": {
      color: "black", // Customize the hover color of the icon
    },
  }),

  valueContainer: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center the content horizontally
  }),
  menuList: (base) => ({
    ...base,
    
    paddingLeft:"6px",
    paddingRight:"6px",
    "::-webkit-scrollbar": {
      width: "8px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),

  placeholder: (base) => ({
    ...base,
    color: "black", 
    fontSize: "14px", 
    fontWeight:"500px",
    display: "flex",
    alignItems: "center"
  }),

  menu: (provided, state) => ({
    ...provided,
    boxShadow: '0px 2px 11px 0px rgba(0, 0, 0, 0.75)',
    borderRadius:"8px" 
  }),

  indicatorSeparator: () => null,

};

function Location() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleFocus = () => {
    console.log("Select component focused");
  };

  const handleBlur = () => {
    console.log("Select component blurred");
  };

  const handleButtonClick = () => {
    if (selectedOption) {
      console.log("Selected option:", selectedOption);
    } else {
      console.log("No option selected");
    }
  };

  const CustomPlaceholder = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={locationIcon} alt="Location Icon" style={{ marginRight: "8px" }} />
      <span>All Locations</span>
    </div>
  );

  return (
    <div className="App">
      <Select
        styles={colorStyles}
        className="custom-select"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable={false}
        placeholder={<CustomPlaceholder />}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default Location;
