import React from 'react'
import Products from '../../Components/Products'
import FooterPagination from '../../Components/FooterPagination'
import NavbarProducts from '../../Components/NavbarProducts'

export default function ProductView() {
  return (
    <div className='flex flex-col bg-white'>
       <NavbarProducts/>
       <Products/>
       <FooterPagination/>
    </div>
  )
}
