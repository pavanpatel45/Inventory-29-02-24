import React from "react";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarForm";
import ImageUpload from "../../Components/ImageUpload";
import CheckBox from "../../Components/CheckBox";

export default function CreateProduct() {


  
  return (
    <form >
      <div className="p-8">
        <Navbar
          title="Create Product"
          btnTitle="Next"
        />

        <div className="flex flex-row mt-7 ">
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
            Basic Details
          </div>

          <div className="grid grid-cols-3 gap-8">
            <ImageUpload
              type="file"
              title="Drag or Upload a Product Image*"
              name="productName1"
              className="row-span-2"
            />
            <InputBox
              type="text"
              title="Product Name*"
              name="productName"
            />

            <InputBox
              type="text"
              title="Product Name/Code*"
              name="productNameCode"
            />

            <DropDown
              title="Category*"
              name="category"
            />

            <DropDown
              title="Sub Category*"
              name="subCategory"
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
            />
            <InputBox
              type="text"
              title="GL Number*"
              name="glNumber"
            />

            <div className="row-span-2 flex items-center">
              <CheckBox />
            </div>

            <InputBox
              type="number"
              title="Minimum Quantity*"
              name="minimumQuantity"
            />

            <DropDown
              title="Measurement Type*"
              name="measurementType"
            />

            <InputBox
              type="text"
              title="Description (150 Words)"
              className="col-span-3"
              name="minimumQuantity"
            />
          </div>
        </div>
      </div>
    </form>
  );
}