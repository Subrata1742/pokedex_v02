"use client";
import React, { useState, useRef, useEffect } from "react";
import PokemonCard from "./PokemonCard";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { usePokemon } from "../context/pokemonProvider";
const PokemonList = () => {
  const { pokemon, loading, setLoading } = usePokemon();
  const [visibleCount, setVisibleCount] = useState(20);
  const visiblePokemon = pokemon.slice(0, visibleCount);

  const bottomElementRef = useRef(null);

  useEffect(() => {
    if (loading || visibleCount >= pokemon.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 20);
            setLoading(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (bottomElementRef.current) {
      observer.observe(bottomElementRef.current);
    }

    return () => {
      if (bottomElementRef.current) {
        observer.unobserve(bottomElementRef.current);
      }
    };
  }, [loading, pokemon, visibleCount, setLoading]);

  return (
    <ScrollArea className=" h-[88.7vh] md:bottom-1 top-3.5 md:top-0.5 w-[97vw] md:w-[90vw] my-1 mx-2 md:mx-auto">
      <div className="grid grid-cols-3 gap-1 py-4 md:grid md:grid-cols-5 md:mx-10 md:gap-4 md:p-4 ">
        {visiblePokemon.map((p) => (
          <div key={p.name}>
            <PokemonCard p={p} />
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex  justify-center items-center py-4">
          <img
            src="/image/PokemonLoader.png"
            className="animate-spin h-12 w-12 opacity-90"
            alt="Loader"
          />
        </div>
      )}
      <div ref={bottomElementRef} className="h-10 w-full" />
      <ScrollBar className="w-0" />
    </ScrollArea>
  );
};

export default PokemonList;
