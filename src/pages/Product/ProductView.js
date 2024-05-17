import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Products from '../../Components/Products';
import NavbarProducts from '../../Components/NavbarProducts';
import { api_url } from '../../Data/Constants';
import dlt from "../../Icons/DeletePopup.svg";

export default function ProductView() {
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    console.log("Selected Data:", selected);
  }, [selected]);

  const productsTableData = async () => {
    const url = `${api_url}/productBatch`;
    try {
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error('Received unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteProducts = async (id) => {
    const apiUrl = `${api_url}/productBatch/${id}`;
    try {
      const response = await axios.delete(apiUrl);
      if (response.status === 200) {
        setSelected((prevSelected) => prevSelected.filter(item => item !== id));
        productsTableData();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    selected.forEach(id => deleteProducts(id));
    setSelected([]);
    setIsDeleteDialogOpen(false);
  };

  const filterData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Received unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (location) filterData(`${api_url}/productBatch/location/${location}`);
  }, [location]);

  useEffect(() => {
    if (expiryDate) filterData(`${api_url}/productBatch/expiryDate/${expiryDate}`);
  }, [expiryDate]);

  useEffect(() => {
    if (availability) filterData(`${api_url}/productBatch/availability/${availability}`);
  }, [availability]);

  useEffect(() => {
    if (category) filterData(`${api_url}/productBatch/category/${category}`);
  }, [category]);

  useEffect(() => {
    productsTableData();
  }, []);

  return (
    <div className="relative">
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setIsDeleteDialogOpen(false)}></div>
      )}
      <div className="flex flex-col bg-white">
        <div style={{ height: "calc(100vh - 8rem)" }} className="overflow-auto scrollbar">
          <NavbarProducts
            select={Boolean(selected.length)}
            count={selected.length}
            handleDelete={handleDelete}
            selectedLocation={location}
            setSelectedLocation={setLocation}
            productsTableData={productsTableData}
          />
          <Products
            selected={selected}
            setSelected={setSelected}
            data={data}
            category={category}
            setCategory={setCategory}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            availability={availability}
            setAvailability={setAvailability}
          />
        </div>
        {isDeleteDialogOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-30">
            <div className="border drop-shadow bg-white rounded-lg p-8">
              <div className="border drop-shadow" style={{ width: "482px", height: "130px", borderRadius: "8px" }}>
                <div className="flex flex-row mb-4 mt-2">
                  <img src={dlt} alt="icon" className="ml-4 mr-2" />
                  <p style={{ fontWeight: "500", color: "black" }}>Are you sure you want to delete the selected Batch(s)?</p>
                </div>
                <button
                  onClick={() => {
                    setIsDeleteDialogOpen(false);
                    setSelected([]);
                  }}
                  style={{
                    width: "211px",
                    height: "42px",
                    color: "#A5A5A5",
                    fontWeight: "500",
                    borderRadius: "8px",
                    borderColor: "#A5A5A5",
                    border: "1px solid",
                    marginRight: "16px",
                    marginLeft: "16px",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  style={{
                    width: "211px",
                    height: "42px",
                    backgroundColor: "#E42525",
                    color: "white",
                    fontWeight: "500",
                    borderRadius: "8px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
