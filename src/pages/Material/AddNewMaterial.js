import React, { useState } from "react";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarForm";
import CheckBox from "../../Components/CheckBox";
import "../../CSS/NavbarMaterials.css"
export default function AddNewMaterial() {
  const [formData,setFormData] = useState({
    materialName:'',
    shortName:'',
    category:'',
    subCategory:'',
    upc:'',
    glNumber:'',
    minimumQuantity:'',
    measurementType:'',
    Description:'',
  })
  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log("Input value changed:", name,":",value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <form >
      <div className="p-3 bg-white">
        <Navbar
          title="Create Product"
          btnTitle="Next"
          className="NavbarForm"
        />

        {/* <div className="flex flex-row mt-7 ">
          <div className="flex flex-col items-center">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center text-xs text-white"
              style={{ border: "1px", backgroundColor: "#2CAE66" }}
            >
              1
            </div>
            <div
              style={{
                color: "#2CAE66",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "14.06px",
              }}
            >
              Add Product
            </div>
          </div>
          <div
            className="border border-1 border-black border-dashed h-0 w-64"
            style={{ position: "relative", left: "-23px", top: "8px" }}
          ></div>
          <div
            className="flex flex-col items-center "
            style={{ position: "relative", left: "-36px" }}
          >
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center text-green-500"
              style={{ border: "1px solid", borderColor: "#2CAE66" }}
            >
              2
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "14.06px",
              }}
            >
              Materials
            </div>
          </div>
        </div> */}

        <div className="grid gap-y-4 pt-8 ">
          <div
            style={{
              color: "#2D2D2D",
              fontWeight: "500",
              lineHeight: "19px",
              fontSize: "16px",
            }}
          >
            Basic Details
          </div>

          <div className="grid grid-cols-3 gap-8">
            <InputBox
              type="text"
              title="Material Name*"
              name="materialName"
              onChange={handleInputChange}
              labelCss={
                formData.materialName.length > 0 ? 'label-up' : 'label-down'}
            />

            <InputBox
              type="text"
              title="Short Name*"
              name="shortName"
              onChange={handleInputChange}
              labelCss={
                formData.shortName.length > 0 ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Category*"
              name="category"
              onChange={handleInputChange}
              labelCss={
                formData.categorylength > 0 ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Sub Category*"
              name="subCategory"
              onChange={handleInputChange}
              labelCss={
                formData.subCategory.length > 0 ? 'label-up' : 'label-down'}
            />
          </div>
        </div>
        <div className="grid gap-y-4 pt-8 ">
          <div
            style={{
              color: "#2D2D2D",
              fontWeight: "500",
              lineHeight: "19px",
              fontSize: "16px",
            }}
          >
            Other Details
          </div>

          <div className="grid grid-cols-3 gap-8 ">
            <InputBox
              type="number"
              title="UPC*"
              name="upc"
              onChange={handleInputChange}
              labelCss={
                formData.upc.length > 0 ? 'label-up' : 'label-down'}
            />
            <InputBox
              type="text"
              title="GL Number*"
              name="glNumber"
              onChange={handleInputChange}
              labelCss={
                formData.glNumber.length > 0 ? 'label-up' : 'label-down'}
            />

            <div className="row-span-2 flex items-center">
              <CheckBox />
            </div>

            <InputBox
              type="number"
              title="Minimum Quantity*"
              name="minimumQuantity"
              onChange={handleInputChange}
              labelCss={
                formData.minimumQuantity.length > 0 ? 'label-up' : 'label-down'}
            />

            <DropDown
              title="Measurement Type*"
              name="measurementType"
              onChange={handleInputChange}
              labelCss={
                formData.measurementType.length > 0 ? 'label-up' : 'label-down'}
            />

            <InputBox
              type="text"
              title="Description (150 Words)"
              className="col-span-3"
              name="Description"
              onChange={handleInputChange}
              labelCss={
                formData.Description.length > 0 ? 'label-up' : 'label-down'}
            />
          </div>
        </div>
      </div>
    </form>
  );
}