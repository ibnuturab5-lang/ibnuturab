import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SLIDER_DATA } from '../utils/data'
import { LuDot } from 'react-icons/lu'
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md'

const Hero = () => {
    const [currentIndex, setCurrentIndex]=useState(2)
    const prevSlide=()=>{
        const isFirstSlide= currentIndex === 0;
        const newIndex = isFirstSlide ? SLIDER_DATA.length -1 : currentIndex-1;
        setCurrentIndex(newIndex)
    }
    const nextSlide=()=>{
        const isLastSlide= currentIndex === SLIDER_DATA.length -1;
        const newIndex = isLastSlide ? 0  : currentIndex+1;
        setCurrentIndex(newIndex)
    }
    const gotoSlide=(slideIndex)=>{
      setCurrentIndex(slideIndex)
    }
  return (
    <div  className=' max-w-[1440px] h-96 w-full mx-auto  p-4 relative group'>
        <div style={{backgroundImage: `url(${SLIDER_DATA[currentIndex].image})`}} className='w-full h-full rounded-2xl bg-center bg-cover duration-300'></div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white'>
            <MdOutlineArrowLeft onClick={prevSlide} size={30} />
        </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white'>
            <MdOutlineArrowRight size={30} onClick={nextSlide}/>
        </div>
        <div className='flex justify-center '>
          {SLIDER_DATA.map((slide, slideIndex)=>(
            <div key={slideIndex} className='cursor-pointer hover:text-red-300 text-4xl sm:text-6xl'><LuDot  onClick={()=>gotoSlide(slideIndex)}/></div>
          ))}
        </div>
{/* <img src="/pic9.jpg" alt="hero img" className='absolute h-96 w-full object-cover' /> */}

  {/* <div className='flex max-sm:flex-col gap-12 items-center '>
      <Link to={'/products'} className='max-sm:top-40 top-60 max-sm:left-4 left-20 relative px-5 py-3 text-xl w-48 flex items-center justify-center bg-teal-600 hover:bg-teal-800  text-slate-50 rounded-md'>Shop Now</Link>
    <Link to={'/products'} className='max-sm:top-40 top-60 max-sm:left-4 left-20 relative px-5 py-3 text-xl  bg-sky-600 hover:bg-sky-800 hover:text-teal-50 text-gray-50 rounded-md'>Explore Our Products</Link>
  </div> */}

    </div>
  )
}

export default Hero