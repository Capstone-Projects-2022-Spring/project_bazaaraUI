import React from 'react'

import { Link } from "react-router-dom";



const Navbar = () => {
  const [show,setShow]=React.useState(false);
  const menu=['home','shoppinglists','search','logout'];
  return (
    <>
      <main className='shadow-lg sticky top-0 left-0 w-full z-50 bg-white'>

      <nav className='flex p-3 justify-between max-w-[1200px] m-auto items-center'>

      <main className="flex flex-col items-start">
           {/* <img src='/logo.png' alt=''/> */}
           <div className='text-[36px] font-teko leading-6'>
             <span className='text-purple-500'>BAZA</span>
             <span>ARA</span>
           </div>
        <div className='text-sm'>A Super-Charged Savings App</div>
       </main>
       <div onClick={()=>setShow(!show)} className='md:hidden block cursor-pointer'>
          
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
          
        </div>
        <div className='md:flex ml-auto space-x-3 hidden'>

        {menu.map((item,index)=><Link to={`/${item}`} className="" >
        <div key={index} className='cursor-pointer   text-black p-3 uppercase'>{item}</div>
       </Link>
       )}
        </div>
        

      </nav>
      {show && <main className='flex-col bg-gray-50 text-gray-600 flex p-3'>
       {menu.map((item,index)=><Link to={`/${item}`} onClick={()=>setShow(!show)}>
        <div key={index} className='cursor-pointer font-bold  hover:bg-gray-100 p-3 uppercase'>{item}</div>
       </Link>
       )}
      </main>}
      </main>
     
    </>
  )
}

export default Navbar

