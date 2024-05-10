import React from 'react'
import { Link } from 'react-router-dom'

function AddThisMaterial() {
  return (
    <div className='flex flex-row items-center'>
        <p style={{color:"black",fontWeight:"600",fontSize:"12px"}}>This material is not available in your materials list</p>
        <Link to="/materials/AddMaterial">
        <p style={{color:"#2CAE66",fontWeight:"600",fontSize:"12px"}} className='cursor-pointer pl-2'>Add this material</p>
        </Link>
    </div>
  )
}

export default AddThisMaterial