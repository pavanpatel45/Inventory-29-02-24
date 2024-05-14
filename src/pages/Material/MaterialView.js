import React, { useEffect, useState } from "react";
import Material from "../../Components/Material";
import FooterPagination from "../../Components/FooterPagination";
import NavbarMaterials from "../../Components/NavbarMaterials";
import dlt from "../../Icons/DeletePopup.svg";
import axios from "axios";
import { api_url } from "../../Data/Constants";
import "../../CSS/NavbarMaterials.css"


const MaterialView = () => {
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  

  const materialsTableData = async () => {
    const url = `${api_url}/materialBatch`;
    try {
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });

      if (response?.status === 200) {
        setData(response?.data);
        console.log(response?.data);
      } else {
        console.error("Received unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteMaterials = async (id) => {
    const apiUrl = `${api_url}/material/${id}`;
    try {
      const response = await axios.delete(apiUrl);
      if (response) {
        materialsTableData();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
    setIsDeleteDialogOpen(true);
    setConfirm(true);
  };

  const confirmDelete = () => {
    console.log("Confirm delete:", confirm);

    console.log("Deleting items:", selected);

    selected.forEach(async (id) => {
      await deleteMaterials(id);
    });

    setSelected([]);
    setIsDeleteDialogOpen(false);
    setConfirm(false);
  };

  // useEffect(() => {
  //   if (confirm) {
  //     // If confirm state is true, execute the deletion logic
  //     confirmDelete();
  //   }
  // }, [confirm]);

  useEffect(() => {
    materialsTableData();
  }, []);

  return (
    <div className="relative">
       {isDeleteDialogOpen && (
        <div
          className="fixed inset-0 bg-black opacity-80 z-10 filter blur "
          onClick={() => setIsDeleteDialogOpen(false)}
        ></div>
      )}
    <div className="flex flex-col bg-white">
      <div
        style={{ height: "calc(100vh - 8rem)" }}
        className={`overflow-auto scrollbar  `}
      >
        <NavbarMaterials
          select={Boolean(selected.length)}
          count={selected.length}
          handleDelete={handleDelete}
          selected={selected}
          setSelected={setSelected}
          materialsTableData={materialsTableData}
        />
        <Material
          selected={selected}
          setSelected={setSelected}
          materialsTableData={materialsTableData}
          data={data}
        />
      </div>
      <div>
        <FooterPagination />
      </div>
      {isDeleteDialogOpen && (
         <div className="fixed inset-0 flex justify-center items-center z-30">
         <div className="border drop-shadow bg-white rounded-lg p-8">
        <div
          className="border drop-shadow"
          style={{ width: "482px", height: "130px", borderRadius:"8px" }}
        >
          <div className="flex flex-row mb-4 mt-2">
            <img src={dlt} alt="icon" className="ml-4 mr-2"/>
          <p style={{fontWeight:"500", color:"black"}}>Are you sure you want to delete the selected Batch(s)?</p>
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
              border:"1px solid",
              marginRight:"16px",
              marginLeft:"16px",
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
  );
};

export default MaterialView;
