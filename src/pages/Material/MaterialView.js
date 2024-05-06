import React,{useState} from 'react'
import Material from '../../Components/Material'
import FooterPagination from '../../Components/FooterPagination'
import NavbarMaterials from '../../Components/NavbarMaterials'

export default function MaterialView() {
  const [selected, setSelected] = useState([])
  const deleteMaterials = ()=>{
     
  }
  return (
    <div className='flex flex-col bg-white'>
       <div style={{height: "calc(100vh - 8rem)"}}  className={`overflow-auto scrollbar  `}> 
       <NavbarMaterials select={Boolean(selected.length)} count={selected.length}/>
       <Material selected={selected} setSelected={setSelected}/>
       </div>
       <div>
       <FooterPagination/>
       </div>
    </div>
  )
}
