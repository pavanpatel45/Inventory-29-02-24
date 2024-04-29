import React from "react";

function OutOfStock() {
  return (
    <div
      className="border border-solid flex justify-center items-center"
      style={{
        backgroundColor: "#FFEBEB",
        borderRadius: "50px",
        height: "30px",
        width: "101px",
      }}
    >
      <p
        style={{
          color: "#C62222",
          fontSize: "14px",
          fontFamily: "Roboto",
          fontWeight: "500",
          lineHeight: "22px",
        }}
      >
        Out of Stock!{" "}
      </p>
    </div>
  );
}

export default OutOfStock;