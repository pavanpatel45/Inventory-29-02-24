import React,{useState} from "react";
export default function Dropdown({
  title,
  name,
  options,
  labelCss,
  ...props
}) {

  return (
    <div className={`flex flex-col  select-box-1 floating-label`}>
     
      <select
        className="p-2 rounded-md"
        id={name}
        name={name}
        {...props}
        style={{border:"1px solid #999999",color:"#2D2D2D"}}
      >
        {options ? (
          <>
            <option default className="hidden"></option>
            {options.map((ele) => {
              console.log(" at payment option :" , ele);
              return <option key={ele.id}>{ele.value}</option>
            })}
          </>
        ) : (
          <>
            <option  disabled selected hidden></option>
            <option>option1</option>
            <option>option2</option>
            <option>option3</option>
            <option>option4</option>
            <option>option5</option>
            <option>option6</option>
          </>
        )}
      </select>
      <label htmlFor="title" className={`relative top-3 left-3 bg-white max-w-max ${labelCss}`} style={{color:"#808080" ,top:"-8px" ,left:"22px"}}>
        {title}
      </label>
    </div>
  );
}
