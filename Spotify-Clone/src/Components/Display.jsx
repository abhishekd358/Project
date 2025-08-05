import React from 'react'

import DisplayHome from './DisplayHome'
import { Routes, Route } from 'react-router-dom'
import SpecificAlbum from './SpecificAlbum'
const Display = () => {
  return (
    <div className='w-[100%] m-2 rounded-lg overflow-auto lg:w-[75%] text-white'>
      <Routes>
        <Route path='/' element={<DisplayHome/>}/>
        <Route path='/album/:albumName' element={<SpecificAlbum/>}/>
      </Routes>
    </div>
  )
}

export default Display