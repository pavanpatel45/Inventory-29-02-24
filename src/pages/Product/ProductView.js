import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Products from '../../Components/Products'
import FooterPagination from '../../Components/FooterPagination'
import NavbarProducts from '../../Components/NavbarProducts'
import { api_url } from '../../Data/Constants'
export default function ProductView() {
  const [selected, setSelected] = useState([])
  const [data, setData] = React.useState([]);
  const url = `${api_url}/product`
  useEffect(()=>{
    console.log("selected Data : ",selected);
},[selected])
const productsTableData = async () => {
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
const deleteProducts = async (id)=>{
  console.log("id at deleteProducts : ",id)
  const apiUrl = `${api_url}/product/${id['id']}`
  try {
    console.log("apiUrl : ",id, " " ,apiUrl);
    const response = await axios.delete(apiUrl);
   
    console.log('Delete response:', response);
    if(1){//response is ok
       setSelected([]);
       productsTableData();
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
}
const handleDelete = () =>{
  console.log("at handle Delete");
  selected.map((id) => {
     console.log("Calling delete for id :",id);
     deleteProducts(id={id});
  })

 
}
React.useEffect(() => {
  // console.log("useEffect : ")
   productsTableData();
}, [])
  return (
    <div className='flex flex-col bg-white'>
      <div style={{height: "calc(100vh - 8rem)"}}  className={`overflow-auto scrollbar  `}>
       <NavbarProducts select={Boolean(selected.length)} count={selected.length} handleDelete={handleDelete}/>
       <Products selected={selected} setSelected={setSelected} productsTableData={productsTableData} data={data}/>
       </div>
       <div>
       <FooterPagination/>
       </div>
    </div>
  )
}
