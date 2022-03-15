import React from 'react';
import "./ErrorStyles.css";
import '../../../styles/utils.css';
// import ErrorImage from "./error-image.png";


const ErrorPage = () => {
// function ErrorPage() {

  return (
    <>
      <section className="flex justify-center items-center bg-purple-50 w-full min-h-full">
        <main className="flex flex-col m-auto my-4 p-5 h-full justify-center items-center">
          <div className="heading text-center">
            404
          </div>

          <div className="subheading">
           <h6>OOPS, use MENU for different page.</h6>
          </div>

          {/* <div>
            <img src ="ErrorImage" alt="Error404Page"/>
          </div> */}
      </main>
      </section>
    
    </>
  )
}


export default ErrorPage
