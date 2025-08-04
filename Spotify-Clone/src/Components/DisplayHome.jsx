import React from 'react'
import Navbar from './Navbar'
import MusicCarousal from './MusicCarousal'
const DisplayHome = () => {
  return (
    <>
    <Navbar/>
    <div className='px-6 pt-4 '>
        <MusicCarousal/>
    </div>
    </>
  )
}

export default DisplayHome