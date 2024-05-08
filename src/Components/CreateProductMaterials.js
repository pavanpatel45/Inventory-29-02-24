import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductMaterial } from "../features/Product/productSlice";
import InputBox from "./InputBox";
import Navbar from "./NavbarForm";
import Button from "./Button";
import AddedMaterialsTable from "./AddedMaterialsTable";
import "../CSS/NavbarMaterials.css"
import plus from "../Icons/plus-outline.svg"
import smallPlus from "../Icons/small-plus.svg"

export default function CreateProductMaterials() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    materialNameCode: "",
    requiredQuantity: "",
    unit: "",
  });
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("form Data at createProductMaterials :",formData);
    dispatch(addProductMaterial(formData));
  }
  return (
    <div className="bg-white">
      <form>
        <div className="p-8">
          <Navbar
            title="Create Product"
            className="NavbarForm"
            btnTitle="Save"
            handleClick={handleSubmit}
            backLink="/products/createProduct/"
          />
            <div className="flex flex-row mt-7 ">
          <div className="flex flex-col items-center">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center  text-green-500"
              style={{ border: "1px solid", borderColor: "#2CAE66" }}
            >
              1
            </div>
            <div
              style={{
                color: "black",
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
              className="h-5 w-5 rounded-full flex items-center justify-center text-xs text-white"
              style={{ border: "1px",backgroundColor: "#2CAE66"  }}
            >
              2
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "14.06px",
                color:"#2CAE66"
              }}
            >
              Materials
            </div>
          </div>
        </div>
          <div className="grid gap-y-4 pt-8">
            <div className="flex flex-row justify-between pb-3">
          <div
            style={{
              color: "#2D2D2D",
              fontWeight: "500",
              lineHeight: "19px",
              fontSize: "16px",
            }}
          >
            Materials
          </div>
          <div className="flex flex-row cursor-pointer">
            <img src={smallPlus} alt="icon" className="pr-2"/>
            <a style={{fontSize:"14px", color:"#2DA060", fontWeight:"500"}}>Add New Material</a>
          </div>
          </div>
            <div className="grid gap-2">
              <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
                <InputBox
                  type="text"
                  title="Material Name/Code*"
                  name="materialNameCode"
                  value={formData.materialNameCode}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      materialNameCode: e.target.value,
                    }))
                  }
                  labelCss={
                    formData.materialNameCode.length > 0 ? 'label-up' : 'label-down'}
                />

                <InputBox
                  type="number"
                  title="Required Quantity*"
                  name="requiredQuantity"
                  value={formData.requiredQuantity}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      requiredQuantity: e.target.value,
                    }))
                  }
                  labelCss={
                    formData.requiredQuantity.length > 0 ? 'label-up' : 'label-down'}
                />

<InputBox
                  type="text"
                  title="Unit*"
                  name="unit"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      unit: e.target.value,
                    }))
                  }
                  labelCss={
                    formData.unit.length > 0 ? 'label-up' : 'label-down'}
                />
              </div>
            </div>

            
          </div>
          <div>
            <div className="flex justify-end mt-4">
              <Button btnTitle="Add" className="NavbarForm" icon={plus}/>
            </div>
          </div>
        </div>
      </form>
      <AddedMaterialsTable />
    </div>
  );
}
