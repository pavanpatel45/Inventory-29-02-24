import React,{useState} from 'react'
import Products from '../../Components/Products'
import FooterPagination from '../../Components/FooterPagination'
import NavbarProducts from '../../Components/NavbarProducts'

export default function ProductView() {
  const [selected, setSelected] = useState([])

  return (
    <div className='flex flex-col bg-white'>
      <div style={{height: "calc(100vh - 8rem)"}}  className={`overflow-auto scrollbar  `}>
       <NavbarProducts select={Boolean(selected.length)} count={selected.length}/>
       <Products selected={selected} setSelected={setSelected}/>
       </div>
       <div>
       <FooterPagination/>
       </div>
    </div>
  )
}
