import React from 'react'
import '../../../styles/utils.css'
import List from '../../List/list'
import './styles.css'
const HomeForm = () => {
  return (
    <>
    <section className="home w-full min-h-full my-6">
        <main className="flex flex-col text-center">
           <div className="t">Bazaara</div>
           <div className="subtitle">Get free cedits</div>
        </main>
        <main className="flex flex-col block max-w-sm m-auto bg-orange-50 rounded text-center my-4 p-5">
            <div className="text-bold">Total Savings</div>
            <div className="flex  items-center justify-evenly p-3">
                <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Weekly</div>
                    <div className="text-bold">$ 124.00</div>
                    
                </div>
                <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Weekly</div>
                    <div className="text-bold">$ 124.00</div>
                    
                </div> <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Weekly</div>
                    <div className="text-bold">$ 124.00</div>
                    
                </div>
            </div>
        </main>
        <main className="flex flex-col bg-orange-50 rounded text-center  flex-col max-w-sm m-auto p-5">
          <div className="text-bold">List</div>
          <List/>
          <List/>
          <List/>
        </main>
        <main className="flex flex-col block max-w-sm m-auto bg-orange-50 my-4 p-5">
            <div className=" text-center">Mission</div>
            <br/>
            <div className='text-center text-xs'>
            Found 2022. Baazara App allows users to discover good deals at nearby location by saving both time and money.
            </div>
        </main>
    </section>
    </>  )
}

export default HomeForm