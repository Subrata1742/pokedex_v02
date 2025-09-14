"use client"
import { Button } from '@/components/ui/button';
import React,{useRef,useState} from 'react'
import { Music } from 'lucide-react';
import { Volume2 } from 'lucide-react';


export const Cry = ({id}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const ref = useRef(null);
  const audioSrc = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`; // Replace with your audio file URL

   const togglePlayPause = () => {
    // We figure out the next state *before* setting it.
    
    
    // We update the state, which will cause the component to re-render with the new icon.
    setIsPlaying(!isPlaying);

    // Based on the next state, we either play or pause the audio.
    if (!isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  // This function is attached to the <audio> element's onEnded event.
  // It ensures the icon resets when the audio finishes playing on its own.
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };
    

  return (
    <Button className=' bg-transparent border text-white ' onClick={togglePlayPause }>
      <audio ref={ref} src={audioSrc} onEnded={handleAudioEnded}/>
      {isPlaying?<Volume2/>:<Music/>}
      
    </Button>
  )
}
