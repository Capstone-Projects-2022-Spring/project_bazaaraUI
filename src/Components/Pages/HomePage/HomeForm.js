import React from 'react'
import '../../../styles/utils.css'
import List from '../../List/list'
import Navbar from '../../NavBar/Navbar'


const HomeForm = () => {
  return (
    <>
     
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
        <main className="flex flex-col companyStatement">
            <div className="text-center  text-color">Mission</div>
            <br/>
            <div className='text-center text-xs'>
            Found 2022. Baazara App allows users to discover good deals at nearby location by saving both time and money.
            </div>
        </main>
    </section>
    </>  )
}

export default HomeForm