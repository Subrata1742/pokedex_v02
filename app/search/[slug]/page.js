"use client";
import React from "react";
import { usePokemon } from "@/context/pokemonProvider";
import PokemonCard from "@/components/PokemonCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Page({ params }) {
  const { slug } = React.use(params);
  const { pokemon, loading } = usePokemon();

  if (loading) {
    return (
      <div className="flex h-full w-full justify-center items-center py-4">
        <img
          src="/image/PokemonLoader.png"
          className="animate-spin h-12 w-12 opacity-90"
          alt="Loader"
        />
      </div>
    );
  }
  return (
    <ScrollArea className=" h-[88.5vh] w-[97vw] md:w-[90vw] my-1 mx-2 md:mx-auto">
      <div className="grid grid-cols-3 gap-1  md:grid md:grid-cols-5 md:mx-10 md:gap-4 md:p-4">
        {pokemon
          .filter((p) => p.name.startsWith(slug))
          .map((p) => (
            <div key={p.name}>
              <PokemonCard p={p} />
            </div>
          ))}
      </div>

      <ScrollBar className="w-0" />
    </ScrollArea>
  );
}
