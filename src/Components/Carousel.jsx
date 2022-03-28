import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CAROUSEL = () => {
    const responsive = {
        desktop: {
            breakpoint: {max:5000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <>
            <main className='max-w-[1200px] m-auto my-3'>

                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    
                    keyBoardControl={true}
                    focusOnSelect={true}
                    transitionDuration={500}

                >
                    <div className='bg-purple-100 mx-2 max-w-sm h-[200px] rounded p-2 flex items-center justify-center flex-col space-y-3 '>
                        <div className='text-lg uppercase'>Purpose</div>
                        <div className='text-sm text-center'>Bringing your favorite stores in one place.</div>
                    </div>

                    <div className='bg-purple-100 mx-2 max-w-sm h-[200px] rounded p-2 flex flex-col items-center justify-center  space-y-3'>
                        <div className='text-lg uppercase'>3 Simple Steps</div>
                        <div className='text-sm text-center'>1. Check Savings.</div>
                        <div className='text-sm text-center'>2. Manage Lists.</div>
                        <div className='text-sm text-center'>3. EZ Product Search.</div>

                    
                    </div><div className='bg-purple-100 mx-2 max-w-sm h-[200px] rounded p-2 flex flex-col items-center justify-center space-y-3 '>
                        <div className='text-lg uppercase'>Contact</div>
                        <div className='text-sm text-center'>Email: bazaara@email.com</div>
                    </div>
                </Carousel>
            </main>
        </>
    )
}

export default CAROUSEL