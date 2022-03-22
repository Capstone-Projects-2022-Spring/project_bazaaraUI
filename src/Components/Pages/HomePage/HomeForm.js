import React from 'react'
import '../../../styles/utils.css'
import List from '../../List/list'
import Navbar from '../../NavBar/Navbar'
import Footer from '../../Footer/Footer'


const HomeForm = () => {
  return (
    <>
     <Navbar/>
    <section className="home w-full min-h-full">
    {/* remove my6 class */}
      

        <main className="flex flex-col block max-w-sm m-auto bg-orange-50 rounded text-center my-4 p-5">
            <div className="text-bold  text-color">Total Savings</div>
            <div className="flex  items-center justify-evenly p-3">
                <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Weekly</div>
                    <div className="text-bold">$ 124.00</div>
                    
                </div>
                <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Monthly</div>
                    <div className="text-bold">$ 124.00</div>
                    
                </div> <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Yearly</div>
                    <div className="text-bold">$ 124.00</div>
                    
                </div>
            </div>
        </main>
        <main className="flex flex-col bg-orange-50 rounded text-center  flex-col max-w-sm m-auto p-5">
          <div className="text-bold text-color">List</div>
          <List/>
          <List/>
          <List/>
        </main>
        
        {/* create a slide show of company */}


    </section>

    <Footer />

    </>  )
}

export default HomeForm