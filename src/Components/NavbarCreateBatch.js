import React from 'react'
import Button from './Button'
import {Link} from 'react-router-dom'
import plus from "../Icons/plus-outline.svg"
import "../CSS/CreateBatch.css"
import arrow from "../Icons/arrow-left.png"
export default function NavbarCreateBatch({title,btnTitle}) {
  return (
    <div className='flex flex-row justify-between items-center '>
       <div className='flex flex-row gap-2 ' style={{font:"16px"}}>
          <Link to="/sales/NewOrderRequest"> <img src={arrow}/></Link>
           <div style={{color:"black", fontFamily:"Roboto",fontWeight:"500", fontSize:"16px", lineHeight:"20px"}}>{title}</div>
       </div>
       <div className='flex flex-box'>
           <Link to="/materials/AddMaterial"><Button btnTitle={btnTitle}  icon={plus} className="text-style2 "/></Link>
       </div>
    </div>
  )
}
