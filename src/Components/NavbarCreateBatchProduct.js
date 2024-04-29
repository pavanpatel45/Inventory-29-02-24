import React from 'react'
import Button from './Button'
import {Link} from 'react-router-dom'
export default function NavbarCreateBatch({title,btnTitle}) {
  return (
    <div className='flex flex-row justify-between items-center '>
       <div className='flex flex-row gap-2 ' style={{font:"16px"}}>
          <Link to="/sales/NewOrderRequest"> <div >&larr;</div></Link>
           <div style={{color:"#2D2D2D"}}>{title}</div>
       </div>
       <div className='flex flex-box'>
           <Link to="/products/createProduct"><Button btnTitle={btnTitle}/></Link>
       </div>
    </div>
  )
}
