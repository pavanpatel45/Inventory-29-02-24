import React from 'react'
import Button from './Button'
import {Link} from 'react-router-dom'
import "../CSS/NavbarMaterials.css";
export default function NavbarForm({title,btnTitle}) {
  return (
    <div className='flex flex-row justify-between items-center'>
       <div className='flex flex-row gap-2 ' style={{font:"16px"}}>
          <Link to="/sales/NewOrderRequest"> <div >&larr;</div></Link>
           <div style={{color:"#2D2D2D",fontFamily:"roboto", fontWeight:"500",fontSize:"16px", lineHeight:"22px"}}>{title}</div>
       </div>
       <div className='flex flex-box'>
           <Button btnTitle={btnTitle} className="NavbarForm"/>
       </div>
    </div>
  )
}
