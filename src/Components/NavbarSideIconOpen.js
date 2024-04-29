import React from 'react'
import arrowDown from '../Icons/down-arrow.png'
export default function NavbarSideIconOpen({src,tittle,isArrowDown=true}) {
  return (
    <div className=' w-56 h-11 flex justify-between pt-2 pb-2 rounded-md items-center' style={{backgroundColor:"#F4F4F4"}}>
        <div className='flex gap-3 h-5 p-1 items-center'>
        <img src={src}/>
        <div>{tittle}</div>
        </div>
        {console.log(isArrowDown)}
        {isArrowDown &&
        <div className='flex h-5 p-1 items-center '>
         <img src={arrowDown} height="16px" width="16px"/>
         </div>}
    </div>
  )
}
