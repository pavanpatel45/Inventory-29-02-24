import React from 'react'
export default function NavbarSideIcon({src,leftBorder}) {
  return (
    <div className='w-20 flex justify-center icon-container' >
     <div className='flex justify-center pt-2 pb-2 rounded-md w-10' ><img src={src}/></div> 
    </div>
  )
}
