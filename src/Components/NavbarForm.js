import React from 'react'
import Button from './Button'
import {Link} from 'react-router-dom'
import "../CSS/NavbarMaterials.css";
import arrow from "../Icons/arrow-left.png"

export default function NavbarForm({title,btnTitle,className,btnType,backLink, nextLink}) {
  return (
    <div className='flex flex-row justify-between items-center'>
       <div className=' gap-2 flex flex-row items-center' style={{font:"16px"}}>
         <Link to={backLink}><img src={arrow} alt="icon"/></Link>
           <div style={{color:"#2D2D2D",fontFamily:"roboto", fontWeight:"500",fontSize:"16px", lineHeight:"22px"}}>{title}</div>
       </div>
       <div className='flex flex-row'>
        <Link to={nextLink}>
           <Button btnTitle={btnTitle} className={className} type={btnType}/>
           </Link>
       </div>
    </div>
  )
}
