import React from 'react'
import Products from '../../Components/Products'
import FooterPagination from '../../Components/FooterPagination'
import NavbarProducts from '../../Components/NavbarProducts'

export default function ProductView() {
  return (
    <>
       <NavbarProducts/>
       <Products/>
       <FooterPagination/>
    </>
  )
}
