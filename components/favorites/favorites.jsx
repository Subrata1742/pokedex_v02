"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import typeImg from "@/lib/Type";
import { usePokemon } from "@/context/pokemonProvider";

import FavoriteButton from "../../components/FavoritesButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useUser } from "@clerk/nextjs";

const FavoritesPage = () => {
  const { pokemon, loading } = usePokemon();
  const user = useUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/data?UserId=${user?.user?.id}`);
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [user?.user?.id]);

  if (loading)
    return (
      <div className="flex w-full h-screen justify-center items-center py-4">
        <img
          src="/image/PokemonLoader.png"
          className="animate-spin h-12 w-12 opacity-90"
          alt="Loader"
        />
      </div>
    );
  return (
    <div className="w-full max-w-full mx-auto text-center">
      <h1 className="text-2xl text-white font-bold mt-20 md:mt-14 pt-0 text-center">
        Favorites Page
      </h1>
      {favorites.length === 0 ? (
        <p className="h-[88.5vh] w-[100vw] mt-4">No favorites added yet.</p>
      ) : (
        <ScrollArea className="  h-[88.5vh] w-[97vw] md:w-[90vw] my-1 mx-2 md:mx-auto">
          <div className="grid grid-cols-3 gap-1 py-4 md:grid md:grid-cols-5 md:mx-10 md:gap-4 md:p-4 ">
            {favorites &&
              favorites.map((p) => (
                <div key={p.name}>
                  <Card className="animate-fadeInUp bg-slate-950/55 gap-0.5 border-slate-700 w-[31.5vw] h-[22vh] md:h-full md:w-full shadow-lg flex flex-col text-white">
                    <Link className=" items-center" href={`pokemon/${p.name}`}>
                      <CardHeader>
                        <CardTitle className="ccapitalize text-xs font-bold text-center md:text-xl md:py-2 shadow mx-auto ">
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
                      <div className=" flex justify-center mx-5  gap-0">
                        {pokemon
                          ?.find((f) => f.name === p.name)
                          ?.types.map((type, index) => (
                            <Badge
                              key={index}
                              className=" bg-transparent p-1 md:p-2 capitalize"
                            >
                              <img
                                className="w-12 h-3.5 md:w-24 md:h-6 border border-blue-900 rounded"
                                src={
                                  typeImg[type]
                                    ? typeImg[type]
                                    : "/placeholder.png"
                                }
                                alt={type}
                              />
                            </Badge>
                          ))}
                      </div>
                    </Link>
                    <FavoriteButton
                      name={p.name}
                      image={p.image}
                      order={p.order}
                      user={user.user.id}
                    />
                  </Card>
                </div>
              ))}
          </div>

          <ScrollBar className=" w-0" />
        </ScrollArea>
      )}
    </div>
  );
};

export default FavoritesPage;
