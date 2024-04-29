import React from 'react'
import Material from '../../Components/Material'
import FooterPagination from '../../Components/FooterPagination'
import NavbarMaterials from '../../Components/NavbarMaterials'

export default function MaterialView() {
  return (
    <>
       <NavbarMaterials/>
       <Material/>
       <FooterPagination/>
    </>
  )
}
