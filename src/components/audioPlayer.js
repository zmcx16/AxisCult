import React, { useState, useEffect } from 'react'

function AudioPlayer({ langFont }) {

  const url = '/sample.mp3'

  const [audioPlayer, setAudioPlayer] = useState()
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setAudioPlayer(new Audio(url))
  }, [])

  return (
    <>
      <button onClick={() => {
        setIsPlaying(true)
        audioPlayer.play();
      }}>Play</button>
      <button onClick={() => {
        setIsPlaying(false)
        audioPlayer.pause();
      }}>Pause</button>
    </>
  )  
}

export default AudioPlayer