import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/Product/productSlice";
import InputBox from "../../Components/InputBox";
import DropDown from "../../Components/Dropdown";
import Navbar from "../../Components/NavbarForm";
import ImageUpload from "../../Components/ImageUpload";
import CheckBox from "../../Components/CheckBox";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { api_url } from "../../Data/Constants";

export default function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    productName: '',
    productNameCode: '',
    category: '',
    subCategory: '',
    upc: '',
    glNumber: '',
    minimumQuantity: '',
    measurementType: '',
    description: '',
    refrigeration: true,
    image: { id: null }
  });
  const [image, setImage] = useState(null);
  const [productsTableData, setProductTableData] = useState([]);
  const [showAddThisProduct, setShowAddThisProduct] = useState(false);

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [measurementData, setMeasurementData] = useState([{ id: "1", value: "Kg" }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {

    if( e.target.files?.length){
      const file = e.target.files[0];
      const localURL= URL.createObjectURL(file)
      setImage({
        file: file,
        localURL:localURL
      });
    }
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

  const uploadImage = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append("imageFile", image?.file);
  
    try {
      const response = await axios.post(`${api_url}/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // console.log("uploadImage ----- ",  response.data);
  
      // Extract imageId from the response data string and create a JSON object
      const imageData = response.data.split(': ');
      const imageId = imageData[1].trim();
      const jsonResponse = { imageId };
      return jsonResponse?.imageId;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };
  

  const handleSubmit = async (e) => {
    console.log("data at form data is",formData)
    e.preventDefault();
    const id = await uploadImage();
   // console.log("THis is ID",id)
    if (id) {
      console.log("NAVIGATE CALLED")
      const productData = {
        ...formData,
        image: { id: id }
      };
      dispatch(addProduct(productData));
      navigate('/products/CreateProduct/CreateProductMaterials');
    } else {
      console.error("Failed to upload image.");
    }
  };

  const getCategoryData = async () => {
    try {
      const response = await axios.get(`${api_url}/productCategory/getAllProductCategory`, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      setCategoryData(response.data);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  const getSubCategoryData = async (value) => {
    const obj = categoryData.find(obj => obj.value.trim() === value.trim());
    const id = obj?.id;
    if (id) {
      try {
        const response = await axios.get(`${api_url}/productCategory/getAllProductSubCategory/${id}`, {
          headers: { 'ngrok-skip-browser-warning': '69420' }
        });
        setSubCategoryData(response.data);
      } catch (error) {
        console.log("Error fetching subcategory data:", error);
      }
    }
  };

  const getMeasurementData = async () => {
    try {
      const response = await axios.get(`${api_url}/productCategory/getAllMeasurement`, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      setMeasurementData(response.data);
    } catch (error) {
      console.log("Error fetching measurement data:", error);
    }
  };

  const checkFormCompletion = () => {
    const allFieldsFilled = Object.values(formData).every(value => {
      if (typeof value === "object" && value !== null) {
        return Object.values(value).every(val => String(val).trim() !== "");
      } else {
        return String(value).trim() !== "";
      }
    });
    const isImageUploaded = !!image; // Check if an image is uploaded
  setIsFormComplete(allFieldsFilled && isImageUploaded);
  };

  useEffect(() => {
    getSubCategoryData(formData.category);
    setFormData(prevData => ({ ...prevData, subCategory: '' }));
  }, [formData.category]);

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  useEffect(() => {
    getCategoryData();
        getProductsTableData();
    getMeasurementData();
  }, []);

  useEffect(() => {
    if (formData.productName.trim().length > 0) {
      const productExists = productsTableData.some(
        (d) => d.productName.trim() === formData.productName.trim()
      );
      setShowAddThisProduct(!productExists);
    } else {
      setShowAddThisProduct(false);
    }
  }, [formData.productName, productsTableData]);

  const isSaveButtonEnabled = isFormComplete && showAddThisProduct;
//console.log("Hii",isSaveButtonEnabled);

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-8 bg-white">
        <Navbar
          title="Create Product"
          btnTitle="Next"
          btnStyle={{ backgroundColor: isSaveButtonEnabled ? "#2CAE66" : "#B3B3B3", cursor: isSaveButtonEnabled? "pointer" : "not-allowed" }}
          disabled={!isSaveButtonEnabled}
          className="NavbarForm"
          btnType="submit"
          handleClick={handleSubmit}
          backLink="/products/CreateBatchProduct"
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
              name="productImage"
              className="row-span-2"
              accept="image/*"
              value={image?.localURL}
              onChange={handleImageChange}
            />
            <InputBox
              type="text"
              title="Product Name*"
              name="productName"
              onChange={handleInputChange}
              labelCss={formData.productName.length > 0 ? 'label-up' : 'label-down'}
            />
            <InputBox
              type="text"
              title="Product Name/Code*"
              name="productNameCode"
              onChange={handleInputChange}
              labelCss={formData.productNameCode.length > 0 ? 'label-up' : 'label-down'}
            />
            <DropDown
              title="Category*"
              name="category"
              onChange={handleInputChange}
              options={categoryData}
              labelCss={formData.category.length > 0 ? 'label-up' : 'label-down'}
            />
            <DropDown
              title="Sub Category*"
              name="subCategory"
              onChange={handleInputChange}
              options={subCategoryData}
              labelCss={formData.subCategory.length > 0 ? 'label-up' : 'label-down'}
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
              labelCss={formData.upc ? 'label-up' : 'label-down'}
            />
            <InputBox
              type="text"
              title="GL Number*"
              name="glNumber"
              onChange={handleInputChange}
              labelCss={formData.glNumber ? 'label-up' : 'label-down'}
            />
            <InputBox
              type="number"
              title="Minimum Quantity*"
              name="minimumQuantity"
              onChange={handleInputChange}
              labelCss={formData.minimumQuantity ? 'label-up' : 'label-down'}
            />
            <DropDown
              title="Measurement Type*"
              name="measurementType"
              onChange={handleInputChange}
              options={measurementData}
              labelCss={formData.measurementType ? 'label-up' : 'label-down'}
            />
            <InputBox
              type="text"
              title="Description*"
              name="description"
              onChange={handleInputChange}
              labelCss={formData.description ? 'label-up' : 'label-down'}
            />
           <CheckBox formData={formData} setFormData={setFormData}/>
          </div>
        </div>
      </div>
    </form>
  );
}
