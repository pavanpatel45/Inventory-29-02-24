import React,{useEffect, useState} from 'react'
import Material from '../../Components/Material'
import FooterPagination from '../../Components/FooterPagination'
import NavbarMaterials from '../../Components/NavbarMaterials'
import axios from 'axios'
import { api_url } from '../../Data/Constants'

export default function MaterialView() {
  const [selected, setSelected] = useState([])
  const [data, setData] = React.useState([]);
  const url = `${api_url}/material`
  useEffect(()=>{
      console.log("selected Data : ",selected);
  },[selected])
  const materialsTableData = async () => {
    try {
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log("at api-data : ", response);

      if (response?.status === 200) {
        console.log("API Data:", response?.data);
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
  const deleteMaterials = async (id)=>{
    console.log("id at deleteMaterials : ",id)
    const apiUrl = `${api_url}/material/${id['id']}`
    try {
      console.log("apiUrl : ",id, " " ,apiUrl);
      const response = await axios.delete(apiUrl);
     
      console.log('Delete response:', response);
      if(1){//response is ok
         setSelected([])
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  }
  const handleDelete = () =>{
    console.log("at handle Delete");
    selected.map((id) => {
       console.log("Calling delete for id :",id);
       deleteMaterials(id={id});
    })

    

   
  }
  React.useEffect(() => {
    // console.log("useEffect : ")
    materialsTableData();
  }, [])
  useEffect(()=>{
    materialsTableData();
  },[selected])
  return (
    <div className='flex flex-col bg-white'>
       <div style={{height: "calc(100vh - 8rem)"}}  className={`overflow-auto scrollbar  `}> 
       <NavbarMaterials select={Boolean(selected.length)} count={selected.length} handleDelete={handleDelete}/>
       <Material selected={selected} setSelected={setSelected} materialsTableData={materialsTableData} data={data}/>
       </div>
       <div>
       <FooterPagination/>
       </div>
    </div>
  )
}
