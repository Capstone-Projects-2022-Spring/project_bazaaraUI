import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../NavBar/Navbar'
import Footer from '../../Footer/Footer'
import BarcodeScannerComponent from "react-qr-barcode-scanner";


const Report = () => {
  const firstUpdate = useRef(true);
  const [isStart, setIsStart] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('')
  const [streamenable, setstreamenable] = useState(false)


  const handleSubmit = () => {
    if (barcode.length > 0 && price.length > 0) {
      alert('Report sent successfully')
      setBarcode('')
      setPrice('')
      setIsStart(false)
      setstreamenable(false)
    } else {
      alert('Please Enter Price!!')
    }
  }
  return (
    <>
      <Navbar />
      <section className='min-h-screen flex flex-col justify-center space-y-4 items-center'>
        <main className='max-w-md flex flex-col space-y-4 bg-purple-300 p-4 rounded '>
          <div> Scan Product Barcode
          </div>
          {
            isStart ?
              <BarcodeScannerComponent
                width={500}
                height={500}
                stopStream={streamenable}
                onUpdate={(err, result) => {

                  if (result) setBarcode(result.text);
                  else setBarcode("");
                }}
              />
              : null
          }
          <div >
            <button onClick={() => { setIsStart(true); setBarcode(''); setPrice('') }} className='bg-green-400 text-white rounded p-2 text-center'>Click here to scan</button>
            {isStart && <>
              <div id="scanner-container" />
              <span>Barcode: {barcode}</span>
            </>}
          </div>

          <div >
            <button
              onClick={() => setstreamenable(true)}

              className='bg-green-400 text-white rounded p-2 text-center'
            >Capture</button>
          </div>

          <div className='grid grid-cols-2'>
            <div>UPC Code: </div>
            <div className='bg-white p-2 flex space-x-2'>
              <input type='text' value={barcode} className='outline-none px-2 bg-transparent' placeholder='' />
            </div>
          </div>

          <div className='grid grid-cols-2'>
            <div>Enter Item Price: </div>
            <div className='bg-white p-2 flex space-x-2'>$
              <input value={price} onChange={(e) => setPrice(e.target.value)} type='number' className='outline-none px-2 bg-transparent' placeholder='' />
            </div>
          </div>

          <div >
            <button onClick={handleSubmit} className='bg-green-400 text-white rounded p-2 text-center'>Report</button>
          </div>
        </main>
      </section>
      <Footer />

    </>
  )
}

export default Report