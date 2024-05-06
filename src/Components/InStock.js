import React from "react";

function Options() {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundColor: "#CDFFE3",
        borderRadius: "50px",
        height: "30px",
        width: "71px",
      }}
    >
      <p
        style={{
          color: "#1D7836",
          fontSize: "14px",
          fontFamily: "Roboto",
          fontWeight: "500",
          lineHeight: "22px",
        }}
      >
        In Stock{" "}
      </p>
    </div>
  );
}

export default Options;