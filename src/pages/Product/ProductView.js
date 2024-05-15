import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Products from '../../Components/Products'
import FooterPagination from '../../Components/FooterPagination'
import NavbarProducts from '../../Components/NavbarProducts'
import { api_url } from '../../Data/Constants'
import dlt from "../../Icons/DeletePopup.svg";

export default function ProductView() {
  const [selected, setSelected] = useState([])
  const [data, setData] = React.useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState([]);
  const [expiryDate, setExpirtyDate] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    console.log("selected Data : ", selected);
  }, [selected])
  const productsTableData = async () => {
    const url = `${api_url}/productBatch`
    try {
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log("at product table data: ", response);

      if (response?.status === 200) {
        console.log("API Data: at productsTableData", response?.data);
        setData(response?.data);
      } else {
        console.error('Received unexpected response:', response);
        // Handle other status codes or unexpected responses
      }
    } catch (error) {
      // console.error('Error fetching data:', error);
      return null
    }

  }
  const deleteProducts = async (id) => {
    console.log("id at deleteProducts : ", id)
    const apiUrl = `${api_url}/productBatch/${id}`
    try {
      if(id){
      console.log("apiUrl : ", id, " ", apiUrl);
      const response = await axios.delete(apiUrl);
      console.log('Delete response:', response);
      if (1) {//response is ok
        setSelected([]);
        productsTableData();
      }}
    } catch (error) {
      console.error('Delete error:', error);
    }
  }
  const handleDelete = () => {
    console.log("Delete button clicked");
    setIsDeleteDialogOpen(true);
    setConfirm(true);
  };

  const confirmDelete = () => {
    console.log("Confirm delete:", confirm);

    console.log("Deleting items:", selected);

    selected.forEach(async (id) => {
      await deleteProducts(id);
    });

    setSelected([]);
    setIsDeleteDialogOpen(false);
    setConfirm(false);
  };
  const filterDataByCategory = async () => {
    const url = `${api_url}/productBatch/category/${category?.value}`;
    console.log("inside filterDataByCategory", category?.value);
    try {
      if(category){
        const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });

      if (response?.status === 200) {
        setData(response?.data);
        console.log(response?.data);

      } else {
        console.error("Received unexpected response:", response);
      }}
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const filterDataByDate = async () => {
    const url = `${api_url}/productBatch/expiryDate/${expiryDate.value}`;
    console.log("inside filterDataByExpiryDate", expiryDate.value);
    try {
      if(expiryDate){
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });

      if (response?.status === 200) {
        setData(response?.data);
        console.log(response?.data);

      } else {
        console.error("Received unexpected response:", response);
      }}
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const filterDataByAvailability = async () => {
    const url = `${api_url}/productBatch/availability/${availability.value}`;
    console.log("inside filterDataByAvailability", availability.value);
    try {
      if(availability){
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });

      if (response?.status === 200) {
        setData(response?.data);
        console.log(response?.data);

      } else {
        console.error("Received unexpected response:", response);
      }}
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const filterDataByLocation = async () => {
    const url = `${api_url}/productBatch/location/${location}`;
    try {
      if(location){
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });

      if (response?.status === 200) {
        setData(response?.data);
        console.log(response?.data);

      } else {
        console.error("Received unexpected response:", response);
      }
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    console.log("location is changed :", location);
    if (location) {
      filterDataByLocation();
    }
  }, [location])
  useEffect(() => {
    console.log("Expiry Date is changed", expiryDate);
    if (expiryDate) {
      filterDataByDate();
    }
  }, [expiryDate])
  useEffect(() => {
    console.log("Availability is changed", availability);
    if (availability) {
      filterDataByAvailability();
    }
  }, [availability])
  useEffect(() => {
    console.log("Category is changed", category);
    if (category) {
      console.log("Category is changed", category);
      filterDataByCategory();
    }
  }, [category])
  useEffect(()=>{
    console.log("Product Table Data :",data);
  },[data])
  useEffect(() => {
    // console.log("useEffect : ")
    productsTableData();
  }, [])
  return (
    <div className="relative">
      {isDeleteDialogOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 filter blur"
          onClick={() => setIsDeleteDialogOpen(false)}
        ></div>
      )}
      <div className='flex flex-col bg-white'>
        <div style={{ height: "calc(100vh - 8rem)" }} className={`overflow-auto scrollbar  `}>
          <NavbarProducts select={Boolean(selected.length)} count={selected.length} handleDelete={handleDelete} selectedLocation={location}
            setSelectedLocation={setLocation} />
          <Products selected={selected} setSelected={setSelected} productsTableData={productsTableData} data={data} category={category}
            setCategory={setCategory}
            expiryDate={expiryDate}
            setExpirtyDate={setExpirtyDate}
            availability={availability}
            setAvailability={setAvailability} />
        </div>
        <div>
          {/* <FooterPagination/> */}
        </div>
        {isDeleteDialogOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-30">
            <div className="border drop-shadow bg-white rounded-lg p-8">
              <div
                className="border drop-shadow"
                style={{ width: "482px", height: "130px", borderRadius: "8px" }}
              >
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
                </button>{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

