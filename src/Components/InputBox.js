import React, { useState } from "react";
import "../CSS/InputBox.css"
export default function InputBox({
  title,
  type,
  className,
  name,
  labelCss,
  ...props
}) {
  return (
    <div className={`flex flex-col ${className} floating-label`}>
      <input
        type={type}
        className=" p-2 border-1 rounded-md "
        id={name}
        {...props}
        name={name}
        style={{color:"#2D2D2D",borderColor:"#A1A1A1", font:"14px"}}
      />
      <label for={name} className={`relative  bg-white max-w-max ${labelCss} `} style={{color:"#808080",display:"inline",font:"12px" ,top:"-8px" ,left:"22px"}}>
        {title}
      </label>
    </div>
  );
}
