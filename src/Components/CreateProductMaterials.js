import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductMaterial } from "../features/Product/productSlice";
import InputBox from "./InputBox";
import Navbar from "./NavbarForm";
import Button from "./Button";
import AddedMaterialsTable from "./AddedMaterialsTable";
import "../CSS/NavbarMaterials.css"
import plus from "../Icons/plus-outline.svg"
import smallPlus from "../Icons/small-plus.svg"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CreateProductMaterials() {
  const [Data,setData] = useState([])
  const [isFormComplete, setIsFormComplete] = useState(false);

  const dispatch = useDispatch();
const navigate= useNavigate();
  const [formData, setFormData] = useState({
    materialNameCode: "",
    requiredQuantity: "",
    unit: "",
  });
  const checkFormCompletion = () => {
    const formEntries= Object.entries(formData);

    console.log(formEntries)

    const allFieldsFilled = formEntries.every((formEntriesData) => {
      const [name, value] = formEntriesData
    
      
      
      if (typeof value === "object" && value !== null) {
        // For objects, check each value inside the object
        const isValidData = Object.values(value).every(
          (val) => (typeof val === "string"||"number") && String(val).trim() !== ""
        );
        if(!isValidData){
          console.log(name)
        }
        return isValidData
      } else {
        // For non-objects, directly check the value
        const isValidData = typeof (value === "string" || "number") && String(value).trim() !== ""
        if(!isValidData){
          console.log(name)
        }
        return isValidData
      }
    });


    console.log(allFieldsFilled)
    console.log("filled forms",allFieldsFilled);
    setIsFormComplete(allFieldsFilled);
  };

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("form Data at createProductMaterials :",formData);
    // dispatch(addProductMaterial(formData));
    toast.success("New Product Successfully Added");
    addData();
    navigate('/products/CreateBatchProduct')
  }
  const addData = ()=>{
    setData((prevData)=>(
      [prevData,{
          materialName:formData.materialNameCode,
          materialCode:'',
          quantity:formData.requiredQuantity,
          unit:formData.unit,
          category:''
      }]
   ))
   setFormData({
    materialNameCode: "",
    requiredQuantity: "",
    unit: "",
   })
  }
  return (
    <div className="bg-white">
      <form>
        <div className="p-8">
          <Navbar
            title="Create Product"
            className="NavbarForm"
            btnStyle={{ backgroundColor: isFormComplete ? "#2CAE66" : "#B3B3B3",cursor: isFormComplete ? "pointer" : "not-allowed"}}
            disabled={!isFormComplete}
            btnTitle="Save"
            handleClick={handleSubmit}
            backLink="/products/createProduct/"
           // nextLink="/products/CreateBatchProduct"
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
      <AddedMaterialsTable Data={Data} />
    </div>
  );
}
