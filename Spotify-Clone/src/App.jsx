import React from 'react'
import Sidebar from './Components/Sidebar'
import MusicPlayer from './components/MusicPlayer'
import Display from './components/Display'

const App = () => {
  return (
    <div className='h-screen bg-black text-white'>
      <div className='h-[90%] flex'>

      <Sidebar/>
      <Display/>
      </div>
      <MusicPlayer/>
    </div>
  )
}

export default App