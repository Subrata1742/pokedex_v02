import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";
import { CirclePause } from "lucide-react";

export const PokedexEntry = ({ P }) => {
  const [IsSpeaking, setIsSpeaking] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setTtsSupported(true);
    }
  }, []);

  const playDescription = (p) => {
    if (ttsSupported) {
      const description = ` ${p.name} is a ${p.species} . ${p.description}`;
      const utterance = new SpeechSynthesisUtterance(description);
      const voices = window.speechSynthesis.getVoices();

      const desiredVoiceName = "Microsoft Zira Desktop - English";
      const selectedVoice = voices.find(
        (voice) => voice.name === desiredVoiceName
      );

      utterance.voice = selectedVoice || voices[0];
      utterance.lang = selectedVoice?.lang || "en-US";
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);

      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };
  const stopDescription = () => {
    if (IsSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  return (
    <>
      {IsSpeaking ? (
        <Button
          className=" bg-transparent  border text-white "
          onClick={stopDescription}
        >
          <CirclePause />
        </Button>
      ) : (
        <Button
          className=" bg-transparent  border text-white "
          onClick={() => playDescription(P)}
        >
          <CirclePlay />
        </Button>
      )}
    </>
  );
};
