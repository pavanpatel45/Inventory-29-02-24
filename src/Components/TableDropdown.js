import React, { useEffect, useState } from "react";
import Select from "react-select";
import down from "../Icons/arrow-down.svg";

// const options = [
//   {
//     value: "chocolate",
//     label: "Chocolate",
   
//   },
//   {
//     value: "strawberry",
//     label: "Strawberry",
   
//   },
//   {
//     value: "vanilla",
//     label: "Vanilla",
   
//   },
// ];

const colorStyles = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? "1px #EDEEF0" : "0",
    borderRadius: "8px",
    boxShadow: "none", // This line disable the blue border
    padding: "4px 0px",
    width: "145px",
    height: "40px",
    display:"flex",
    justifyContent:"center",
    fontSize: "14px",
    fontWeight: "900",
    color: "black",
    borderRadius: "8px",
    backgroundColor: "#E9E9E9",
    "&:hover": { backgroundColor: "#E9E9E9" },
  }),

 

//   input: (base) => ({       //we need this when we require searching in the dropdown
//     ...base,
//     margin: 0,
//     padding: 0,
   
//   }),

  menu: (provided, state) => ({
    ...provided,
    boxShadow: '0px 2px 11px 0px rgba(0, 0, 0, 0.75)',
    borderRadius:"8px" ,
  //  width:"210px", 
//      overflow: "hidden",
//   whiteSpace: "nowrap",
//   textOverflow: "ellipsis",

  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "8px",
    display:"none",
    color: "#E9E9E9", // Customize the color of the icon
    "&:hover": {
      color: "#E9E9E9", // Customize the hover color of the icon
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

  option: (provided, state) => ({
    ...provided,
    color: "#696969",
    fontSize: "14px",
    padding: "6px 12px 6px 12px",
    overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
   //backgroundColor: state.isSelected ? "#F7F7F7" : "inherit",
    "&:hover": {   backgroundColor: "#DDF8E9",
    color: "black",
    fontSize: "14px",
fontWeight:"500",
borderRadius:"8px"    
},
   // color: state.data.color,
    backgroundColor: "white",
  
    fontWeight: "400",
  }),

  placeholder: (base) => ({
    ...base,
    color: "black", 
    fontSize: "14px", 
    fontWeight:"900px",
    display: "flex",
    alignItems: "center"
  }),

  indicatorSeparator: () => null,

};

function TableDropdown({title,options,selectedOption,setSelectedOption,className}) {
  // const [selectedOption, setSelectedOption] = useState(null);
  useEffect(()=>{
      console.log("Selected Option :",selectedOption);
  },[selectedOption]);
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
      <span>{title}</span>
      <img src={down} alt="Location Icon" style={{ marginLeft: "8px" }} className="z-0" />
    </div>
);

  return (
    <div className={className}>
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
      {/* <button onClick={handleButtonClick}>Submit</button> */}
    </div>
  );
}

export default TableDropdown;
