"use client";
import { usePokemon } from "@/context/pokemonProvider";
import Link from "next/link";
import React from "react";
import FavoritesButton from "../../../components/FavoritesButton";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import typeImg from "@/lib/Type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export default function Page({ params }) {
  const { slug } = React.use(params);
  const { pokemon } = usePokemon();

  return (
    <ScrollArea className=" h-[88.5vh] w-[90vw] my-1  mx-auto">
      <div className="grid grid-cols-5  gap-4 p-4 mx-10">
        {pokemon
          .filter((p) => p.name.startsWith(slug))
          .map((p) => (
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
                          src={
                            typeImg[type] ? typeImg[type] : "/placeholder.png"
                          }
                          alt={type}
                        />
                      </Badge>
                    ))}
                  </div>
                </Link>
                <FavoritesButton
                  name={p.name}
                  image={p.image}
                  order={p.order}
                />
              </Card>
            </div>
          ))}
      </div>

      <ScrollBar className="w-0" />
    </ScrollArea>
  );
}
