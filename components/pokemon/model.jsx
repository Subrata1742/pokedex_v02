"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { usePokemon } from "@/context/pokemonProvider";
import { LoaderCircle } from "lucide-react";

export default function PokemonModel({ P, poke }) {
  const id = P;
  const { forms } = usePokemon();
  const [modelUrl, setModelUrl] = useState(null);
  const [fallback, setFallback] = useState(false);
  const viewerRef = useRef(null);

  const p = forms.find((p) => p.id.toString() === id);
  const formsName = p ? p.forms : null;

  if (!forms.length)
    return (
      <p>
        <LoaderCircle className="animate-spin w-10 h-10 text-white" />
      </p>
    );

  // find correct form model
  function normalizeFormName(poke, form) {
    const slugForm = poke.includes("-")
      ? poke.substring(poke.indexOf("-") + 1)
      : "regular";

    if (slugForm && form.formName === slugForm) return true;

    if (slugForm === "hisui" && form.formName === "hisuian") return true;

    if (slugForm === "alola" && form.formName === "alolan") return true;
    if (slugForm === "gmax" && form.formName === "gmax") return true;
    if (!(slugForm === " ") && form.formName === "unique") return true;
    if (!(slugForm === " ") && form.formName === "multiform") return true;
    if (slugForm === "altered" && form.formName === "regular") return true; //giratina

    if (
      slugForm === "mega-x" &&
      form.name.toLowerCase().includes("mega") &&
      form.name.toLowerCase().includes("x")
    )
      return true;

    if (slugForm === "mega" && form.name.toLowerCase().includes("mega"))
      return true;

    if (
      slugForm === "mega-y" &&
      form.name.toLowerCase().includes("mega") &&
      form.name.toLowerCase().includes("y")
    )
      return true;
    return false;
  }

  useEffect(() => {
    if (!poke.name || !formsName) return;

    const match = formsName.find((f) => normalizeFormName(poke.name, f));
    setModelUrl(match?.model);
    if (!match) {
      setFallback(true);
    }
    // if (match) {
    //   const viewer = document.querySelector("model-viewer");
    //   if (viewer) {
    //     viewer.src = match.model;
    //   }
    // }
  }, [poke.name, formsName]);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer) return;

    const handleError = () => {
      console.warn("Model failed to load, falling back to image...");
      setFallback(true);
    };

    viewer.addEventListener("error", handleError);
    return () => {
      viewer.removeEventListener("error", handleError);
    };
  }, [modelUrl]);

  if (fallback) {
    return (
      <div className="bobbing">
        <Image
          src={poke.image}
          alt={poke.name}
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <>
      <style>{`
        .bobbing {
          animation: bobbing 2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes bobbing {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
         }
        model-viewer::part(default-progress-bar) {
           display: none !important;
        }
      `}</style>

      <div className="bobbing w-full   md:w-fit ">
        <model-viewer
          ref={viewerRef}
          src={modelUrl}
          alt={poke.name}
          className="w-[400px] h-[400px]  md:scale-100 scale-70 flex pr-8 md:pr-0 justify-center items-center"
          rotation-per-second="30deg"
          camera-controls
          disable-zoom
          disable-pan
          min-camera-orbit="auto 90deg auto"
          max-camera-orbit="360deg 90deg auto"
          exposure="0.2"
          shadow-intensity="0.1"
          shadow-softness="0.01"
          environment-image="https://modelviewer.dev/shared-assets/environments/neutral.hdr"
          effect="bloom"
          // onError={() => setFallback(true)}   // ⬅ fallback when model fails
        ></model-viewer>
      </div>
    </>
  );
}
