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
const albumSongPlay = (index)=>{
    // console.log(index)
    setTrack(songsData[index]);
    play();

}



  // next song playing functionality
  const nextSong = () => {
    setTrack(songsData[(songsData.indexOf(track) + 1)]);
    play();
  };

  // time showing logic
useEffect(() => {
  audioref.current.ontimeupdate = () => {
    seekBar.current.style.width = (Math.floor(audioref.current.currentTime) / Math.floor(audioref.current.duration)) * 100 + "%";

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
    nextSong,
    albumSongPlay
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
