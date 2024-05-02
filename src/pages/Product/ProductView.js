import React from 'react'
import Products from '../../Components/Products'
import FooterPagination from '../../Components/FooterPagination'
import NavbarProducts from '../../Components/NavbarProducts'

export default function ProductView() {
  return (
    <div className='flex flex-col bg-white'>
      <div style={{height: "calc(100vh - 8rem)"}}  className={`overflow-auto scrollbar  `}>
       <NavbarProducts/>
       <Products/>
       </div>
       <div>
       <FooterPagination/>
       </div>
    </div>
  )
}
