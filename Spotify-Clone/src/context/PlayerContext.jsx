import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioref = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  //   to manage the track and play pause functionality
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // function to play pause the current song
  const play = () => {
    audioref.current.play();
    setPlayStatus(true);
  };
  const pause = () => {
    audioref.current.pause();
    setPlayStatus(false);
  };

// for playing album listed song by 
const specificSongPlay = async(index)=>{
    // console.log(inde x)
    await setTrack(songsData[index])
    await play()

}



  // next song button functionality
  const nextSong = async() => {
    if(track.id< songsData.length-1){
        await setTrack(songsData[track.id+1])
        play()
    }
}

// previous song button
const previousSong = async() => {
    if(track.id>0){
        await setTrack(songsData[track.id-1])
        play()
    }
}


// seek song
const seekSong = async(e) => {
    audioref.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.clientWidth) * audioref.current.duration);
  } 


  // song time showing logic
useEffect(() => {
  // Time update logic
  audioref.current.ontimeupdate = () => {
    // Skip if duration isn't loaded yet (prevents NaN flash)
    if (!audioref.current.duration) return;

    seekBar.current.style.width =
      (Math.floor(audioref.current.currentTime) / Math.floor(audioref.current.duration)) * 100 + "%";

    setTime({
      currentTime: {
        second: Math.floor(audioref.current.currentTime % 60),
        minute: Math.floor(audioref.current.currentTime / 60),
      },
      totalTime: {
        second: Math.floor(audioref.current.duration % 60),
        minute: Math.floor(audioref.current.duration / 60),
      },
    });
  };

  // Load metadata to set total time early
  // audioref.current.onloadedmetadata = () => {
  //   setTime((prev) => ({
  //     ...prev,
  //     totalTime: {
  //       second: Math.floor(audioref.current.duration % 60),
  //       minute: Math.floor(audioref.current.duration / 60),
  //     },
  //   }));
  // };
}, [audioref]);





  const contextValue = {
    audioref,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    specificSongPlay,
    nextSong,
    previousSong,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
