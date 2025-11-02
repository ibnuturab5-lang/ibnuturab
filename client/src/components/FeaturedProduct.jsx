import React from 'react'
import { CATEGORIES } from '../utils/data'

const FeaturedProduct = () => {
  return (
   <div className='mt-12 max-w-[1440px]  w-full  '>
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mx-auto px-2'>
      {CATEGORIES.map((item)=>(
        <div key={item.id} className='max-[400px]:w-44 w-48 sm:h-64 bg-white rounded-md overflow-hidden'>
             <div className=''>
              <img src={item.image} alt="image" className='sm:h-40 h-24 w-full object-cover ' /></div>
              <p className='font-bold px-3 '>{item.label}</p>    
              <p className=' px-3 pb-2'><span className='line-through text-slate-400 pr-2 '>${item.oldPrice}</span>${item.newPrice}</p>    
              <button className='px-4 py-2 bg-slate-800 hover:bg-slate-600 transition-colors text-slate-300 w-full rounded-md '>Add to Cart</button>   
        </div>
      ))}
    </div>
   </div>
  )
}

export default FeaturedProduct