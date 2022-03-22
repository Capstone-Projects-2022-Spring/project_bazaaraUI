import React from 'react'
import "./NavBar.css"
import { Link } from "react-router-dom";
import { flexbox } from '@mui/system';


const Navbar = () => {
  const [show,setShow]=React.useState(false);
  const menu=['home','shoppinglists','search','logout'];
  return (
    <>

      <nav className='flex p-3 justify-between items-center bg-orange-50'>

      <main className="flex flex-col text-center">
           <div className="title">Bazaara</div>
           <div className="title">A Super-Charged Saving App</div>
       </main>
       <div onClick={()=>setShow(!show)} className='ham cursor-pointer'>
          
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
          
        </div>
        {menu.map((item,index)=><Link to={`/${item}`} className="desk-nav" >
        <div key={index} className='cursor-pointer  nav-item text-white p-3 text-upper'>{item}</div>
       </Link>
       )}

      </nav>
     {show && <main className='flex-col slate-50 text-white flex p-3'>
       {menu.map((item,index)=><Link to={`/${item}`} onClick={()=>setShow(!show)}>
        <div key={index} className='cursor-pointer nav-item text-white p-3 text-upper'>{item}</div>
       </Link>
       )}
      </main>}
    </>
  )
}

export default Navbar

