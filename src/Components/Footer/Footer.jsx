import React from "react";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className='flex flex-col bg-zinc-900 font-regular text-white text-center p-3 mt-4 sticky bottom-0'>
            
                <div>BAZAARA</div>
                <div className='text-xs'> SAVE time, money, and energy.</div>
                <div className='text-xs '> Copyright © {currentYear} </div>
          
            
        </footer>
    );
}

export default Footer;