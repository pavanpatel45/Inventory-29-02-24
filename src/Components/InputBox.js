import React, { useState } from "react";

export default function InputBox({
  title,
  type,
  className,
  name,
  ...props
}) {

  return (
    <div className={`flex flex-col ${className} floating-label`}>
      <input
        type={type}
        className=" p-2 border-1 rounded-md "
        id={name}
        {...props}
        style={{color:"#2D2D2D",borderColor:"#A1A1A1", font:"14px"}}
      />
      <label for={name} className={`relative  bg-white max-w-max `} style={{color:"#808080",display:"inline",font:"12px" ,top:"-8px" ,left:"22px"}}>
        {title}
      </label>
    </div>
  );
}
