import React, { useRef } from "react";
import icon from "../Icons/icon.png"
import vector from "../Icons/Vector (3).png"
function ImageUpload({
  title,
  name,
  type,
  className,
  errors,
  register,
  onChange,
  ...props
}) {
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div
      className={`border-2 border-solid p-2 rounded-md border-gray-400 flex flex-col ${className}`}
    >
      <label htmlFor={name} style={{ cursor: "pointer" }}>
        <div className="flex flex-col justify-center items-center">
          <div
            className="flex justify-center items-center pt-4"
            style={{ width: "100%", height: "100%" }}
          >
            <img src={icon} alt="image-icon" onClick={handleImageClick} />
          </div>
          <div className="flex flex-row">
          <p className="mr-2"
            style={{
              color: "#2D2D2D",
              borderColor: "#A1A1A1",
              fontSize: "14px",
              fontWeight: "650",
              lineHeight: "20px",
            }}
          >
            Drag or Upload a Product Image
          </p>
          <img src={vector} alt="icon" />
          </div>
        </div>
      </label>
      <input
        type="file"
        id={name}
        ref={inputRef}
        onChange={handleInputChange}
        {...register}
        {...props}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ImageUpload;