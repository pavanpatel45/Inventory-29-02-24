import React from 'react'
import Material from '../../Components/Material'
import FooterPagination from '../../Components/FooterPagination'
import NavbarMaterials from '../../Components/NavbarMaterials'

export default function MaterialView() {
  return (
    <div className='flex flex-col bg-white'>
       <div style={{height: "calc(100vh - 8rem)"}}  className={`overflow-auto scrollbar  `}> 
       <NavbarMaterials/>
       <Material/>
       </div>
       <div>
       <FooterPagination/>
       </div>
    </div>
  )
}
