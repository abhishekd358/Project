import React from 'react'
import { assets, songsData } from '../assets/assets'
const MusicPlayer = () => {
  return (
    <div id='main-div' className='max-h-[10%] z-50 relative flex justify-between items-center px-10 py-2'>
        {/* left section */}
        <div id='left-div' className='hidden md:flex justify-center items-center gap-4'>
            <img src={songsData[0].image} alt="" className='w-15'/>
            <div>
                <h2 className='font-semibold'>{songsData[0].name}</h2>
                <p>{songsData[0].desc.slice(0,12)}</p>
            </div>
        </div>
        {/* --------------------------------------------- */}

    {/* center play music card */}
    <div id='music-div' className='flex flex-col gap-5 m-auto justify-center items-center'>
        <div id='controls' className='flex justify-between items-center gap-4'>
            <img src={assets.shuffle_icon} alt="" className='w-4 h-4 cursor-pointer'/>
            <img src={assets.prev_icon} alt="" className='w-4 h-4 cursor-pointer'/>
            <img src={assets.play_icon} alt="" className='w-4 h-4 cursor-pointer'/>
            <img src={assets.next_icon} alt="" className='w-4 h-4 cursor-pointer'/>
            <img src={assets.loop_icon} alt="" className='w-4 h-4 cursor-pointer'/>
        </div>

        <div className='flex items-center gap-5'>
            <p>01:02</p>
            <div className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                <hr className='h-1 border-none w-0 bg-green-800 rounded-full'/>
            </div>
            <p>03:00</p>
        </div>

    </div>

    {/* -------------------------------------------------- */}
        {/* other controls right side */}
        <div className='hidden md:flex justify-center items-center gap-3 opacity-75'>
             <img src={assets.plays_icon} alt="" className='w-4 h-4'/>
             <img src={assets.mic_icon} alt="" className='w-4 h-4'/>
             <img src={assets.queue_icon} alt="" className='w-4 h-4'/>
             
             <img src={assets.speaker_icon} alt="" className='w-4 h-4'/>

             <img src={assets.volume_icon} alt="" className='w-4 h-4'/>

             <div className='w-20 bg-slate-50 h-1 rounded'></div>
             <img src={assets.mini_player_icon} alt="" className='w-4 h-4'/>
             <img src={assets.zoom_icon} alt="" className='w-4 h-4'/>
        </div>

    </div>
  )
}

export default MusicPlayer