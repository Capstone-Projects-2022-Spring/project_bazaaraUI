import React from 'react'
import "./NavBar.css"
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <>

      <nav>

      <main className="flex flex-col text-center">
           <div className="title">Bazaara</div>
           <div className="title">A Super-Charged Saving App</div>
        </main>

      <div>
        <Link to="/home">
          <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5833 25.1667V16.4167H18.4166V25.1667H25.7083V13.5H30.0833L15.5 0.375L0.916626 13.5H5.29163V25.1667H12.5833Z" fill="black" />
          </svg>
        </Link>
      </div>

        <div>
          <Link to="/shoppinglists"> 
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
          </Link>
        </div>
  
        <div>
        <Link to="/search">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/>
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
          </Link>
        </div>

        <div>
        <Link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
          <path d="M0 0h24v24H0z" fill="none"/><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
          </Link>
        </div>

      </nav>
    </>
  )
}

export default Navbar

