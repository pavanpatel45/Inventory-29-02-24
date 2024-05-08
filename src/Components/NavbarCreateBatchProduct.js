import React from 'react'
import Button from './Button'
import {Link} from 'react-router-dom'
import plus from "../Icons/plus-outline.svg"
import "../CSS/CreateBatch.css"
import arrow from "../Icons/arrow-left.png"
export default function NavbarCreateBatch({title,btnTitle, backLink}) {
  return (
    <div className='flex flex-row justify-between items-center '>
       <div className='flex flex-row gap-2 items-center' style={{font:"16px"}}>
          <Link to={backLink}> <img src={arrow} alt="icon"/></Link>
           <div style={{color:"#2D2D2D",fontFamily:"roboto", fontWeight:"500",fontSize:"16px", lineHeight:"22px"}}>{title}</div>
       </div>
       { btnTitle && <div className='flex flex-box'>
           <Link to="/products/createProduct"><Button btnTitle={btnTitle}  icon={plus} className="text-style2 "/></Link>
       </div>}
    </div>
  )
}
