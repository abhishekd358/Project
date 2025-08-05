import React from 'react'
import { albumsData,songsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const MusicCarousal = () => {
  const navigate = useNavigate();

  return (

    <div className='mb-4'>

      {/* Fetured Charts First Section Div */}
      <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
      <div className='flex overflow-x-auto scrollbar-hide gap-4'>
        {albumsData.map((album) => (
      <div onClick={()=>navigate(`/album/${album.name}`)} key={album.id} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded' src={album.image} alt="" />
      <p className='font-bold mt-2 mv-1'>{album.name}</p>
      <p className='text-slate-200 text-sm'>{album.desc}</p>
    </div>
    ))}
      </div>


      {/* Second Sectin divv Music Card Carousal */}
      <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits</h1>
      <div className='flex overflow-x-auto scrollbar-hide gap-4'>
        {songsData.map((song) => (
      <div key={song.id} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded' src={song.image} alt="" />
      <p className='font-bold mt-2 mv-1'>{song.name}</p>
      <p className='text-slate-200 text-sm'>{song.desc}</p>
    </div>
    ))}
      </div>





  </div>
  )
}

export default MusicCarousal