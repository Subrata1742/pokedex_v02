"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { Volume2 } from "lucide-react";

export const Cry = ({ id }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const audioSrc = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Button
      className=" bg-transparent border text-white "
      onClick={togglePlayPause}
    >
      <audio ref={ref} src={audioSrc} onEnded={handleAudioEnded} />
      {isPlaying ? <Volume2 /> : <Music />}
    </Button>
  );
};
