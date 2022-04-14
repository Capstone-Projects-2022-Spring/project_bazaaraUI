import React,{useEffect} from 'react'
import List from '../../List/list'
import Navbar from '../../NavBar/Navbar'
import Footer from '../../Footer/Footer'
import CAROUSEL from '../../Carousel'
import ShoppingListView from '../ShoppingLists/ShoppingListView'
import axios from "axios";
import { CircularProgress } from '@mui/material'


const HomeForm = (props) => {

    const [list,setList]=React.useState([]);
    const [savings,setSavings]=React.useState();
    let loaded = false;

// integrating w/ backend

//for top3lists



async function requestHometop3Data() {
    let currentJWT = null;
    let currentUID = null;

    try {
        currentJWT = await props.auth.currentUser.getIdToken(true);
    } catch (err) {
        console.log(err.message);
    }
     
    //console.log(currentJWT)
    try {
        currentUID = await props.auth.currentUser.uid;
        try {
            await axios.get(`https://bazaara-342116.uk.r.appspot.com/lists/top3/${currentUID}`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
                "Authorization": currentJWT,
              }
            }).then((response) => {

                console.log("TOP 3 : ",response);

                setList(response.data.message.top3Lists)
                    this.state.loaded = true;
                    this.forceUpdate();


            });
          } catch (err) {
              console.log(err.message);
              return err.message;
          }
    } catch (err) {
        console.log(err.message);
        //window.location.replace('/');
    }

  }

// for savings 
async function requestHomesavingsData() {
    
    while(loaded = false) {
        
    }
    let currentJWT = null;
    let currentUID = null;

    try {
        currentJWT = await props.auth.currentUser.getIdToken(true);
    } catch (err) {
        console.log(err.message);
    }
     
    //console.log(currentJWT)
    try {
        currentUID = await props.auth.currentUser.uid;
        try {
            await axios.get(`https://bazaara-342116.uk.r.appspot.com/user/${currentUID}/savings`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
                "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
                "Authorization": currentJWT,
              }
            }).then((response) => {

                console.log("Savings",response);

                setSavings(response.data.message.savings)
                    // this.state.loaded = true;
                    // this.forceUpdate();


            });
          } catch (err) {
              console.log(err.message);
              return err.message;
          }
    } catch (err) {
        console.log(err.message);
        //window.location.replace('/');
    }

  }
 
  
  //api func calls
  
useEffect(()=>{

    setTimeout(() => { requestHomesavingsData(); }, 500);
    //requestHometop3Data();


  
},[])

  return (
    <>
     <Navbar/>
    <section className="max-w-[1200px] min-h-screen m-auto my-6">
    {/* remove my6 class */}
    

        <main className="flex flex-col  max-w-sm md:max-w-lg m-auto bg-purple-100 rounded text-center my-4 p-5">
            <div className="text-bold  text-color">Total Savings</div>
            <div className="flex  items-center justify-evenly p-3">
                <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Weekly</div>
                  {savings &&  <div className="text-bold">$ {savings.weekly}</div>}
                    
                </div>
                <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Monthly</div>
                    {savings && <div className="text-bold">$ {savings.monthly}</div>}
                    
                </div> <div className="flex-col items-center justify-betweeen">
                    <div className="text-bold">Yearly</div>
                    {savings && <div className="text-bold">$ {savings.yearly}</div>}
                    
                </div>
            </div>
        </main>
        <main className="flex flex-col bg-purple-100 md:max-w-lg rounded text-center  flex-col max-w-sm m-auto p-5">
          <div className="text-bold text-color">List</div>
          {list.map(item=><List key={item.id} label={item.label} price={item.savings} />)}
        </main>
        
        {/* create a slide show of company */}


    <CAROUSEL/>
    </section>

    <Footer />
    </>  )
}




export default HomeForm