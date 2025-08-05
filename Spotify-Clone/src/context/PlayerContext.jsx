import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";


export const PlayerContext = createContext();


const PlayerContextProvider = (props)=>{
          const audioref = useRef()
          const seekBg = useRef()
          const seekBar = useRef()
        //   to manage the track and play pause functionality
        const [track, setTrack] = useState(songsData[0]);
        const [playStatus, setPlayStatus] = useState(false);
        const [time, setTime] = useState({
            currentTime:{
                second:0,
                minute:0
            },
            totalTime:{
                second:0,
                minute:0
            }
        })



        // function to play pause the current song
        const play = ()=>{
            audioref.current.play()
            setPlayStatus(true);
        }
        const pause = ()=>{
            audioref.current.pause()
            setPlayStatus(false);
        }


        // next song playing functionality
        const nextSong = ()=>{
            setTrack(songsData[(songsData.indexOf(track)+1) % songsData.length])
            play();

        }

        // time showing logic
        useEffect(() => {
            setTimeout(()=>{
                audioref.current.ontimeupadte = ()=>{
                    setTime({
            currentTime:{
                second:Math.floo,
                minute:0
            },
            totalTime:{
                second:0,
                minute:0
            }
        })


                }
            }, 1000)

        }, [audioref])



            const contextValue = {
                audioref,
                seekBg,
                seekBar,
                track, setTrack,
                playStatus, setPlayStatus,
                time, setTime,
                play,pause,
                nextSong,
               
            
            }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
}

export default PlayerContextProvider;