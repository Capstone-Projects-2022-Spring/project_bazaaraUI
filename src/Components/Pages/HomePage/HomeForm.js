import React from 'react'
import List from '../../List/list'
import Navbar from '../../NavBar/Navbar'
import Footer from '../../Footer/Footer'
import CAROUSEL from '../../Carousel'
import ShoppingListView from '../ShoppingLists/ShoppingListView'


const HomeForm = () => {
  return (
    <>
     <Navbar/>
    <section className="max-w-[1200px] m-auto my-6">
    {/* remove my6 class */}
      

        <main className="flex flex-col  max-w-sm md:max-w-lg m-auto bg-purple-100 rounded text-center my-4 p-5">
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
        <main className="flex flex-col bg-purple-100 md:max-w-lg rounded text-center  flex-col max-w-sm m-auto p-5">
          <div className="text-bold text-color">List</div>
          <List/>
          <List/>
          <List/>
        </main>
        
        {/* create a slide show of company */}


    </section>

    <CAROUSEL/>
    <Footer />
    </>  )
}

export default HomeForm