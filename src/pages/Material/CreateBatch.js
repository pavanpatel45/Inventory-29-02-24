import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBatch } from "../../features/Materials/materialSlice";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarCreateBatch";
import Button from "../../Components/Button";
import "../../CSS/CreateBatch.css";
import { Link } from "react-router-dom";
import { api_url } from "../../Data/Constants";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddThisMaterial from "../../Components/AddThisMaterial";

export default function CreateBatch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [materialsTableData, setMaterialTableData] = useState([]);
  const [materialData,setMaterialData] = useState();
  const [formData, setFormData] = useState({
    materialName: "",
    storageLocation: "",
    batchId: "",
    makeOrder: "",
    expiryDate: "",
    quantity: "",
    price: "",
  });
  const [showAddThisMaterial, setShowAddThisMaterial] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Material Data :",materialData);
    const Data = {
      "materialName": materialData.materialName,
      "storageLocation": String(formData.storageLocation),
      "batchId": String( formData.batchId),
      "purchaseOrder":String(formData.makeOrder),
      "expiryDate": String(formData.expiryDate),
      "quantity":parseInt(formData.quantity, 10)  ,
      "price": parseFloat(formData.price),
      "shortName":'',
      "category":materialData.category      ,
      "subCategory": '',
      "upc": materialData.upc,
      "barcode": '',
      "refrigeration": false,
      "minimumQuantity": '',
      "measurementType": '',
      "description": ''
    }
    dispatch(addBatch(Data));
    toast.success("Batch Successfully Added");
    navigate("/materials");
  };

  const getMaterialsTableData = async () => {
    const url = `${api_url}/material`;
    try {
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      if (response?.status === 200) {
        setMaterialTableData(response?.data);
      } else {
        console.error("Received unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMaterialsTableData();
  }, []);

  useEffect(() => {
    console.log("on formData.materialName change");
    for (const d of materialsTableData) {
      console.log("Inside material table Data", d.materialName.trim(), formData.materialName.trim());
      if (d.materialName.trim() !== formData.materialName.trim()) {
        console.log("add this");
        setShowAddThisMaterial(true);
        setMaterialData(d);
      } else {
        console.log("material present");
        setShowAddThisMaterial(false);
        break; // Break out of the loop
      }
    }
    
  }, [formData.materialName]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-8 bg-white">
        <Navbar title="Create Batch" btnTitle="Add Material" backLink="/materials" />
        <div className="grid gap-y-4 pt-8">
          <div className="grid gap-2">
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <div>
              <InputBox
                type="text"
                title="Material Name/Code*"
                name="materialName"
                onChange={handleInputChange}
                labelCss={formData.materialName.length > 0 ? "label-up" : "label-down"}
              />
              {showAddThisMaterial && <AddThisMaterial />}
              </div>
              <DropDown
                title="Storage Location*"
                name="storageLocation"
                onChange={handleInputChange}
                labelCss={formData.storageLocation.length > 0 ? "label-up" : "label-down"}
              />
              <InputBox
                type="text"
                title="Batch ID*"
                name="batchId"
                onChange={handleInputChange}
                labelCss={formData.batchId.length > 0 ? "label-up" : "label-down"}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Purchase Order#*"
                name="makeOrder"
                onChange={handleInputChange}
                labelCss={formData.makeOrder.length > 0 ? "label-up" : "label-down"}
              />
              <InputBox
                type="date"
                title="Expiry Date*"
                name="expiryDate"
                onChange={handleInputChange}
                labelCss={formData.expiryDate.length > 0 ? "label-up" : "label-down"}
              />
              <InputBox
                type="number"
                title="Quantity(Units)*"
                name="quantity"
                onChange={handleInputChange}
                labelCss={formData.quantity ? "label-up" : "label-down"}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="number"
                title="Price($)*"
                name="price"
                onChange={handleInputChange}
                labelCss={formData.price ? "label-up" : "label-down"}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/materials">
              <Button btnTitle="Save" className="pt-0 pb-0 text-style" type="submit" onClickfunction={handleSubmit} />
            </Link>
          </div>
        </div>
      </div>
      {/* {showAddThisMaterial && <AddThisMaterial />} */}
    </form>
  );
}
