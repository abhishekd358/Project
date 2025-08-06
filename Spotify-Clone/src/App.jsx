import React, { useContext } from 'react'
import Sidebar from './Components/Sidebar'
import MusicPlayer from './components/MusicPlayer.jsx'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'

const App = () => {
  const {audioref, track}= useContext(PlayerContext)
  return (
    <div className='h-screen bg-black text-white'>
      <div className='h-[90%] flex'>

      <Sidebar/>
      <Display/>
      </div>
      <MusicPlayer/>
      <audio ref={audioref} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default App