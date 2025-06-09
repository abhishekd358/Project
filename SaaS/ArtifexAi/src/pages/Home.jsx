import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import WorkSection from '../components/WorkSection'
import CreateImageSection from '../components/CreateImageSection'
import TestimonalSection from '../components/TestimonalSection'
import BottomSection from '../components/bottomSection'

const Home = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <WorkSection/>
    <CreateImageSection/>
    <TestimonalSection/>
    <BottomSection/>
    </>
  )
}

export default Home