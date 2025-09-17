"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import FavoriteButton from "./FavoritesButton";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import typeImg from "@/lib/Type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { LoaderCircle } from "lucide-react";

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
    <ScrollArea className=" h-[88.5vh] w-[90vw] my-1  mx-auto">
      <div className="grid grid-cols-5  gap-4 p-4 mx-10">
        {visiblePokemon.map((p) => (
          <div key={p.name}>
            <Card className="bg-slate-950/55 gap-0.5 border-slate-700 shadow-lg flex flex-col text-white">
              <Link className=" items-center" href={`/${p.name}`}>
                <CardHeader>
                  <CardTitle className="capitalize font-bold text-center text-xl py-2 shadow mx-auto ">
                    {p.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mb-2">
                  <Image
                    src={p.image ? p.image : "/placeholder.png"}
                    alt={p.name}
                    width={250}
                    height={250}
                    quality={100}
                    priority
                  />
                </CardContent>
                <div className=" flex justify-center gap-1">
                  {p.types.map((type, index) => (
                    <Badge key={index} className=" bg-transparent capitalize">
                      <img
                        className="w-24 h-6 border border-blue-900 rounded"
                        src={typeImg[type] ? typeImg[type] : "/placeholder.png"}
                        alt={type}
                      />
                    </Badge>
                  ))}
                </div>
              </Link>
              <FavoriteButton name={p.name} image={p.image} order={p.order} />
            </Card>
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
          {/* <LoaderCircle className="animate-spin text-white h-12 w-12" /> */}
        </div>
      )}
      <div ref={bottomElementRef} className="h-10 w-full" />
      <ScrollBar className="w-0" />
    </ScrollArea>
  );
};

export default PokemonList;
