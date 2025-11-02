import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = ({children}) => {
  return (
    <div> <Navbar/>
    <div className='py-16'>
       {children}
    </div>
    <Footer/>
    </div>
  )
}

export default MainLayout