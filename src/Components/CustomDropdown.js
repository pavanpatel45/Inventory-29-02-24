import React from 'react';
import "../CSS/OrderDropdown.css";

function CustomDropdown({ items }) {
  return (
    <>
        <ul >
          {items.map((item, index) => (
            <li key={index} className="dropHover flex justify-start items-center">
              {item}
            </li>
          ))}
        </ul>
     </>
  );
}

export default CustomDropdown;
