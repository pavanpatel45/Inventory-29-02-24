import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addMakeOrder } from "../features/makeOrderSlice";
import { useForm } from "react-hook-form";
import InputBox from "./InputBox";
import Dropdown from "./Dropdown";
import Navbar from "./NavbarForm";
import Button from "./Button";
import AddedMaterialsTable from "./AddedMaterialsTable";
import "../CSS/NavbarMaterials.css"
import plus from "../Icons/plus-outline.svg"

export default function PurchaseOrder() {
 

  const [formData, setFormData] = useState({
    PoNo: "",
    estArrivalDate: "",
    orderBy: "",
    vendor: "",
    note: "",
    materialName: "",
    requiredQuantity: "",
    unit: "",
  });
  //  useEffect(()=>{
  //   console.log("form Data: ",formData);
  //  },[formData])
  return (
    <div className="bg-white">
      <form>
        <div className="p-8">
          <Navbar
            title="Purchase Order"
          className="NavbarForm"
            btnTitle="Next"
            backLink="/sales"
          />
          <div className="grid gap-y-4 pt-8">
            <div className="grid gap-2">
              <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
                <InputBox
                  type="text"
                  title="PO No."
                  name="PoNo"
                  value={formData.PoNo}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      PoNo: e.target.value,
                    }))
                  }
                  labelCss={
                    formData.PoNo.length > 0 ? 'label-up' : 'label-down'}
                />

                <InputBox
                  type="date"
                  title="Est. Arrival Date*"
                  name="estArrivalDate"
                  value={formData.estArrivalDate}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      estArrivalDate: e.target.value,
                    }))
                  }
                  labelCss={
                    formData.estArrivalDate.length > 0 ? 'label-up' : 'label-down'}
                />

                <Dropdown
                  title="Order By*"
                  name="orderBy"
                  value={formData.orderBy}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      orderBy: e.target.value,
                    }))
                  }
                  labelCss={
                    formData.orderBy.length > 0 ? 'label-up' : 'label-down'}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
                <InputBox
                  type="text"
                  title="Vendor*"
                  name="vendor"
                  value={formData.vendor}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      vendor: e.target.value,
                    }))
                  }
                  labelCss={
                    formData.vendor.length > 0 ? 'label-up' : 'label-down'}
                />
                <InputBox
                  type="text"
                  title="Note*"
                  name="note"
                  className="col-span-2"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      note: e.target.value,
                    }))
                  }
                  labelCss={
                    formData.note.length > 0 ? 'label-up' : 'label-down'}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="font-bold pt-5" style={{ fontSize: "16px" }}>
              {" "}
              Materials
            </p>
            <div className="grid gap-y-4 pt-8">
              <div className="grid gap-2">
                <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
                  <InputBox
                    type="text"
                    title="Material Name/Code*"
                    name="materialName"
                    value={formData.materialName}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        materialName: e.target.value,
                      }))
                    }
                    labelCss={
                      formData.materialName.length > 0 ? 'label-up' : 'label-down'}
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
                    type="number"
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
