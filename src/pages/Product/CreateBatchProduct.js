import React, { useEffect, useState } from 'react';
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { addProductBatch } from "../../features/Product/productSlice";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import { api_url } from "../../Data/Constants";

import Navbar from "../../Components/NavbarCreateBatchProduct";
import Button from "../../Components/Button";
import "../../CSS/CreateBatch.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddThisMaterial from "../../Components/AddThisMaterial";


import { Link } from "react-router-dom";

export default function CreateBatch() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    productName: "",
    storageLocation: "",
    batchId: "",
    makeOrder: "",
    expiryDate: "",
    quantity: "",
    price: "",
  });
  const [showAddThisProduct, setShowAddThisProduct] = useState(false);
  const [productsTableData, setProductTableData] = useState([]);

  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log("Input value changed:", name, ":", value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form data at createbatchproduct :", formData);
    dispatch(addProductBatch(formData));
  };
  const getProductsTableData = async () => {
    const url = `${api_url}/product`;
    try {
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      if (response?.status === 200) {
        setProductTableData(response?.data);
      } else {
        console.error("Received unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProductsTableData();
  }, []);

  useEffect(() => {
    console.log("on formData.productName change");
    for (const d of productsTableData) {
      console.log("Inside material table Data", d.productName.trim(), formData.productName.trim());
      if (d.productName.trim() !== formData.productName.trim()) {
        console.log("add this");
        setShowAddThisProduct(true);
      } else {
        console.log("material present");
        setShowAddThisProduct(false);
        break; // Break out of the loop
      }
    }
    
  }, [formData.productName]);


  return (
    <form onSubmit={handleSubmit}>
      <div className="p-8 bg-white">
        <Navbar
          title="Create Batch"
          btnTitle="Add Product"
          backLink="/products"
        />
        <div className="grid gap-y-4 pt-8">
          <div className="grid gap-2">
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
             <div>
              <InputBox
                type="text"
                title="Product Name/Code*"
                name="productName"
                onChange={handleInputChange}
                labelCss={
                  formData.productName.length > 0 ? "label-up" : "label-down"
                }
              />
                            {showAddThisProduct && <AddThisMaterial title="product" link="/products/createProduct" />}
</div>

              <DropDown
                title="Storage Location*"
                name="storageLocation"
                onChange={handleInputChange}
                labelCss={
                  formData.storageLocation.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <InputBox
                type="text"
                title="Batch ID*"
                name="batchId"
                onChange={handleInputChange}
                labelCss={
                  formData.batchId.length > 0 ? "label-up" : "label-down"
                }
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Make Order#*"
                name="makeOrder"
                onChange={handleInputChange}
                labelCss={
                  formData.makeOrder.length > 0 ? "label-up" : "label-down"
                }
              />

              <InputBox
                type="date"
                title="Expiry Date*"
                name="expiryDate"
                onChange={handleInputChange}
                labelCss={
                  formData.expiryDate.length > 0 ? "label-up" : "label-down"
                }
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
            <Link to="/products">
              <Button
                btnTitle="Save"
                className=" pt-0 pb-0 text-style"
                type="submit"
                onClickfunction={() => {
                  toast.success("Batch Successfully Added");
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
