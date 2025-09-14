<<<<<<< HEAD
"use client";

import { usePokemon } from "@/context/pokemonProvider";
import { LoaderCircle } from "lucide-react";
// import { useEffect, useState } from "react";

// import "@google/model-viewer";

export default function PokemonModel({ P }) {
  const id = P; // Example: Bulbasaur
  // const [forms, setForms] = useState([]);
  const { forms } = usePokemon();

  
   const p = forms.find((p) => p.id === id);
   const formsName = p ? p.forms : null;

  if (!forms.length) return <p><LoaderCircle className="animate-spin w-10 h-10 text-white" /></p>;

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

      <div className="bobbing">
        <model-viewer
          src={formsName[0].model}
          alt={formsName[0].name}
          rotation-per-second="30deg"
          camera-controls
          disable-zoom
          disable-pan
          min-camera-orbit="auto 90deg auto"
          max-camera-orbit="360deg 90deg auto"
          style={{ width: "400px", height: "400px" }}
          exposure="0.2"
          shadow-intensity="0.1"
          shadow-softness="0.01"
          environment-image="https://modelviewer.dev/shared-assets/environments/neutral.hdr"

          effect="bloom"
        ></model-viewer>
      </div>

      {/* Toggle between forms */}
      {/* <div className="mt-4 flex gap-2">
        {formsName.map((f, i) => (
          <button
            key={i}
            onClick={() => {
              document.querySelector("model-viewer").src = f.model;
            }}
            className="p-2 bg-blue-500 text-white rounded"
          >
            {(f.formsName === "xy") ? "mega" : f.formName}
          </button>
        ))}
      </div> */}
    </>
  );
}
=======
"use client";

import { usePokemon } from "@/context/pokemonProvider";
import { LoaderCircle } from "lucide-react";
// import { useEffect, useState } from "react";

// import "@google/model-viewer";

export default function PokemonModel({ P }) {
  const id = P; // Example: Bulbasaur
  // const [forms, setForms] = useState([]);
  const { forms } = usePokemon();

  
   const p = forms.find((p) => p.id === id);
   const formsName = p ? p.forms : null;

  if (!forms.length) return <p><LoaderCircle className="animate-spin w-10 h-10 text-white" /></p>;

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

      <div className="bobbing">
        <model-viewer
          src={formsName[0].model}
          alt={formsName[0].name}
          rotation-per-second="30deg"
          camera-controls
          disable-zoom
          disable-pan
          min-camera-orbit="auto 90deg auto"
          max-camera-orbit="360deg 90deg auto"
          style={{ width: "400px", height: "400px" }}
          exposure="0.2"
          shadow-intensity="0.1"
          shadow-softness="0.01"
          environment-image="https://modelviewer.dev/shared-assets/environments/neutral.hdr"

          effect="bloom"
        ></model-viewer>
      </div>

      {/* Toggle between forms */}
      {/* <div className="mt-4 flex gap-2">
        {formsName.map((f, i) => (
          <button
            key={i}
            onClick={() => {
              document.querySelector("model-viewer").src = f.model;
            }}
            className="p-2 bg-blue-500 text-white rounded"
          >
            {(f.formsName === "xy") ? "mega" : f.formName}
          </button>
        ))}
      </div> */}
    </>
  );
}
>>>>>>> b75bd8257a3b4e6cc2dd7827c12450565484a99f
