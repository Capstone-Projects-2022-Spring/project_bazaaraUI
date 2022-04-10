import React,{useState,useEffect,useRef} from 'react'
import Navbar from '../../NavBar/Navbar'
import Footer from '../../Footer/Footer'
import Quagga from 'quagga'; 

const Report = () => {
    const firstUpdate = useRef(true);
    const [isStart, setIsStart] = useState(false);
    const [barcode, setBarcode] = useState('');
    const [price,setPrice]=useState('')

    useEffect(() => {
      return () => {
        if (isStart) stopScanner();
      };
    }, []);
   
    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      if (isStart) startScanner();
    else stopScanner();
  }, [isStart])
  const _onDetected = res => {
    // stopScanner();
    setBarcode(res.codeResult.code);
  };
  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            facingMode: 'environment' // or user
          }
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: 'large', // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false
            }
          }
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader',
            'i2of5_reader',
            '2of5_reader',
            'code_93_reader'
          ]
        }
      },
      err => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
    Quagga.onProcessed(result => {
    //error fixed by comment
 
      if (result) {
        if (result.boxes) {
        //error fixed by comment
        }
        // error fixed by comment
        }
      });
    };
    const stopScanner = () => {
        Quagga.offProcessed();
        Quagga.offDetected();
        Quagga.stop();
      };
    const handleSubmit=()=>{
        if(barcode.length>0 && price.length>0){
            alert('Report sent successfully')
            setBarcode('')
            setPrice('')
        }else{
            alert('Please Enter Price!!')
        }
    }
  return (
    <>
        <Navbar />
            <section className='min-h-[600px] flex flex-col justify-center space-y-4 items-center'>
                <main className='max-w-md flex flex-col space-y-4 bg-purple-300 p-4 rounded '> 
                    <div> Scan Product Barcode
                    </div>

                    <div >
                    <button onClick={() => {setIsStart(true);setBarcode('');setPrice('')}} className='bg-green-400 text-white rounded p-2 text-center'>Click here to scan</button>
                    {isStart && <>
      <div id="scanner-container"  />
      <span>Barcode: {barcode}</span>
    </>}
                    </div>

                    <div >
                    <button onClick={()=>setIsStart(false)} className='bg-green-400 text-white rounded p-2 text-center'>Capture</button>
                    </div>

                    <div className='grid grid-cols-2'>
                        <div>UPC Code: </div>
                        <div className='bg-white p-2 flex space-x-2'>
                            <input type='text' value={barcode} className='outline-none px-2 bg-transparent' placeholder=''/>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-2'>
                        <div>Enter Item Price: </div>
                        <div className='bg-white p-2 flex space-x-2'>$
                            <input value={price} onChange={(e)=>setPrice(e.target.value)} type='number' className='outline-none px-2 bg-transparent' placeholder=''/>
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