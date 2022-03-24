import React from "react";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className='flex flex-col bg-orange-50 text-black text-center p-3'>
            
     
                <div>BAZAARA</div>
                <div className='text-xs'> SAVE time, money, and energy.</div>
                <div className='text-xs font-bold'> Copyright © {currentYear} </div>
          
            
        </footer>
    );
}

export default Footer;