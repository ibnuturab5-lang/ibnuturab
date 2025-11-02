import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import MainLayout from '../Layouts/MainLayout'
import FeaturedProduct from '../components/FeaturedProduct'

const Home = () => {
  return (
    <MainLayout>
       <Hero/>
       <FeaturedProduct/>
    </MainLayout>
  )
}

export default Home