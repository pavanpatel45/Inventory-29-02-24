import React from 'react'
import profile from '../Icons/profile.jpg'
import arrowDown from '../Icons/down-arrow.png'
import notification from '../Icons/notification.png'
export default function NavbarTop() {
  return (
    <div className=' flex flex-row justify-between h-16 items-center pl-2 pr-2 bg-white'>
        <div >
            <div className='  text-base-600'>Product</div>
        </div>
        <div className='flex flex-row gap-4'>
            <div className=''><img src={notification}/></div>
            <div className='  flex flex-row items-center gap-4 rounded-3xl pl-2 pr-2 pt-1 pb-1' style={{backgroundColor:"#ECECEC"}}>
                <div height="40px" width="40px"><img src={profile}  className='rounded-full h-10 w-10'/></div>
                <div className='text-sm-400'>Zayn Bates</div>
                <div><img src={arrowDown}/></div>
            </div>
        </div>
    </div>
  )
}
