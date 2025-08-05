import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData} from '../assets/assets';
import Navbar from './Navbar'
import { PlayerContext } from '../context/PlayerContext';
const SpecificAlbum = () => {
    const {albumName} = useParams();
    // console.log(albumName);
    // specific album data
    const eachAlbum = albumsData.find((album) => album.name === albumName);
    // console.log(eachAlbum);

    // playing album song
    const {specificSongPlay} = useContext(PlayerContext);


  return (
    <div style={{ backgroundImage:  `linear-gradient(${eachAlbum.bgColor}, #121212)`}}>

        <Navbar/>
        {/* upper div */}
        <div id='main-upper-div' className='block md:flex items-center gap-5 mx-7 pt-5 '>
            {/* image  */}
            
                <img className='w-40 md:w-60 shadow-lg shadow-gray-950/40' src={eachAlbum.image} alt="" />
            
            {/* album all description div */}
            <div className='mt-5'>
                <p className='text-sm md:text-lg mb-1 font-semibold'>Playlist</p>
                <h1 className='text-5xl md:text-7xl font-bold mb-2'>{eachAlbum.name}</h1>
                <p className='opacity-80'>{eachAlbum.desc}</p>
                {/* sub embedded description likes duration etc */}
                <div className='flex items-center gap-1 mt-1 opacity-90'>
                    <img src={assets.spotify_logo} alt="" width='20' />
                    <p className='font-bold'>Spotify</p>
                    <p> • {eachAlbum.likes}</p>
                    <p> • {eachAlbum.total_songs},</p>
                    <p> {eachAlbum.duration}</p>
                </div>

            </div>
        </div>

        {/* song title, Dated added, album name etc */}
        <div className='grid grid-cols-3 mx-5 sm:grid-cols-4 mb-4 pl-2 text-[#a7a7a7] mt-5'>

            <p><b className='mr-4'>#</b>Title</p>
            <p>Album</p>
            <p className='hidden sm:block'>Date Added</p> 
            <img className='m-auto w-4' src={assets.clock_icon} alt="" />
        </div>
        <hr />
        {/* showing song list */}

        {songsData.map((song, index) =>(
            <div onClick={()=>specificSongPlay(index)} className='grid grid-cols-3 mx-5 sm:grid-cols-4 gap-2 p-2 items-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer' key={index}>
                <div className="flex items-center text-white">
                    <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                    <img className="w-10 h-10 mr-4" src={song.image} alt="" />
                    <span className="text-sm">{song.name}</span>
            </div>
                <p className='text-[15px]'>{albumName}</p>
                <p className='text-[15px] hidden sm:block'>5 days ago</p>
                <p className='text-[15px] text-center'>{song.duration}</p>
            </div>
        ))}
    </div>
  )
}

export default SpecificAlbum