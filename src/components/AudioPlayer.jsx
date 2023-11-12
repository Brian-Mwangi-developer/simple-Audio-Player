import "./AudioPlayer.css";
import React from 'react'
import image from "../assets/testId.jpg"

const AudioPlayer = ({audioSrc}) => {
    //state management for player's state and current time
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    const audioRef = React.useRef(null);
    //function to seek to a specific time in the audio
    const handleSeek=(e)=>{
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };
    //function to update the current time and duration of the audio
    const handleTimeUpdate=()=>{
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };
    //function to handle playing the audio
    const handlePlay=()=>{
        audioRef.current.play();
        setIsPlaying(true)
    };
    //function to handle pausing the audio
    const handlePause=()=>{
        audioRef.current.pause();
        setIsPlaying(false);
    };
    //function to toggle between the play and pause state
    const handlePlayPause=()=>{
       if(isPlaying){
        handlePause();
       }else{
        handlePlay();
       }
    }
    //function to format the duration in 'mm:ss' format.
    function formatDuration(durationSeconds){
        const minutes =Math.floor(durationSeconds/60);
        const seconds =Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2,"0");
        return `${minutes}:${formattedSeconds}`;
    }
    //Use an effect to listen for 'timeupdate' events from the audio element and update
    React.useEffect(()=>{
        audioRef.current.addEventListener("timeupdate",handleTimeUpdate);
        //clean up the event listener when the component unmounts
        return ()=>{
            audioRef.current.removeEventListener("timeupdate",handleTimeUpdate);
        };
    },[])

  return (
    <div className="player-card">
       <img src={image} alt="cover image"/>
       {/* //input range for seeking within the audio track */}
       <input
       type="range"
       min="0"
       max={duration}
       value={currentTime}
       onChange={handleSeek}
       />
       {/* //the audio element for playing the audio */}
       <audio ref={audioRef} src={audioSrc} />
       {/* Display current and total duration of the track */}
       <div className="track-duration">
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
       </div>
    {/* play and pause button with a dynamic icon */}
    <button onClick={handlePlayPause}>
        <span className="material-symbols-rounded">
            {isPlaying ? "pause" : "play_arrow"}
        </span>
    </button>
    </div>
  )
}

export default AudioPlayer