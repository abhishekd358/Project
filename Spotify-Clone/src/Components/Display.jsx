import React from 'react'

import DisplayHome from './DisplayHome'
import { Routes, Route } from 'react-router-dom'
const Display = () => {
  return (
    <div className='w-[100%] m-2 rounded bg-[#121212] overflow-auto lg:w-[75%] text-white'>
      <Routes>
        <Route path='/' element={<DisplayHome/>}/>
      </Routes>
    </div>
  )
}

export default Display