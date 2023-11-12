import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AudioPlayer from './components/AudioPlayer'
import audio from "./audio/audio.mp3"

function App() {
  
  return (
    <div className='container'>
      <AudioPlayer audioSrc={audio} />
        
    </div>
  )
}

export default App
