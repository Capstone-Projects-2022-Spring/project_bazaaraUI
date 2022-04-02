import React from 'react'
import Navbar from '../../NavBar/Navbar'
import Footer from '../../Footer/Footer'

const Report = () => {
  return (
    <>
        <Navbar />
            <section className='min-h-[600px] flex flex-col justify-center space-y-4 items-center'>
                <main className='max-w-md flex flex-col space-y-4 bg-purple-300 p-4 rounded '> 
                    <div> Scan Product Barcode
                    </div>
                    <div >
                    <button className='bg-purple-400 text-white rounded p-2 text-center'>Click here to scan</button>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div>Enter Item Price</div>
                        <div className='bg-white p-2 flex space-x-2'>$
                            <input type='number' className='outline-none px-2 bg-transparent' placeholder=''/>
                        </div>

                    </div>
                </main>
            </section>
        <Footer />
    </>
  )
}

export default Report