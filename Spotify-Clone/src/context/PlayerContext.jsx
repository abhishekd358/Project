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


  // time showing logic
// useEffect(() => {
//   audioref.current.ontimeupdate = () => {
//     seekBar.current.style.width = (Math.floor(audioref.current.currentTime) / Math.floor(audioref.current.duration)) * 100 + "%";

//     setTime({
//       currentTime: {
//         second: Math.floor(audioref.current.currentTime % 60),
//         minute: Math.floor(audioref.current.currentTime / 60),
//       },
//       totalTime: {
//         second: Math.floor(audioref.current.duration % 60),
//         minute: Math.floor(audioref.current.duration / 60),
//       },
//     });
//   };

//
  

// }, [audioref]);

// ++++++++++++ if not want following useeffect to hide NaNa problem then try above useeffect++++++++++++++++++++++

 //   for hidding the meta data loading by broweser which will not show the song time as NaNa:NaNa
useEffect(() => {
  const audio = audioref.current;

  // 1. Define the function BEFORE using it
  const handleLoadedMetadata = () => {
    setTime((prev) => ({
      ...prev,
      totalTime: {
        second: Math.floor(audio.duration % 60),
        minute: Math.floor(audio.duration / 60),
      },
    }));
  };

  // 2. Set up time update
  if (audio) {
    audio.ontimeupdate = () => {
      seekBar.current.style.width =
        (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100 + "%";

      setTime((prev) => ({
        ...prev,
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
      }));
    };

    // 3. Add loadedmetadata listener
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
  }

  return () => {
    if (audio) {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }
  };
}, [track]); // <--- Use [track], NOT [audioref]



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
