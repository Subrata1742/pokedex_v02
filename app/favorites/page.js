"use client";
import Link from "next/link";
import React, { use } from "react";
import { useState, useEffect } from "react";
import FavoriteButton from "../../components/FavoritesButton";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import typeImg from "@/lib/Type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePokemon } from "@/context/pokemonProvider";
const FavoritesPage = () => {
  const { pokemon } = usePokemon();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/data");
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);
  return (
    <div className="w-full max-w-full mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Favorites Page</h1>
      <Link href="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Favorite
        </button>
      </Link>
      {favorites.length === 0 ? (
        <p className="mt-4">No favorites added yet.</p>
      ) : (
        <ScrollArea className=" h-[88.5vh] w-[90vw] my-1  mx-auto">
          <div className="grid grid-cols-5  gap-4 p-4 mx-10">
            {favorites.map((p) => (
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
                    <div className=" flex my-1 justify-center gap-1">
                      {pokemon
                        .find((f) => f.name === p.name)
                        .types.map((type, index) => (
                          <Badge
                            key={index}
                            className=" bg-transparent capitalize"
                          >
                            <img
                              className="w-24 h-6 border border-blue-900 rounded"
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
