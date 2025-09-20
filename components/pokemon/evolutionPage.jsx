import React from "react";
import Link from "next/link";
import Image from "next/image";
import typeImg from "@/lib/Type";
import { usePokemon } from "@/context/pokemonProvider";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";

import { ArrowBigRight } from "lucide-react";
import { ArrowBigDown } from "lucide-react";

const EvolutionPage = ({ id }) => {
  const { pokemon } = usePokemon();
  const P = pokemon.find((p) => p.name === id);

  return (
    <ScrollArea className=" overflow-auto">
      <div className="flex flex-col md:flex-row justify-center max-h-[60vh]  pt-72 md:pt-0 items-center gap-2 md:mt-8">
        {P?.evolve.map((poke, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2"
          >
            <Card className="animate-fadeInUp bg-slate-600/40 gap-0.5 border-slate-700 w-[45.5vw] h-[27.5vh] md:h-full md:w-full shadow-lg flex flex-col text-white">
              <Link className=" items-center" href={`/${poke.name}`}>
                <CardHeader>
                  <CardTitle className="capitalize font-bold text-center text-sm md:text-xl md:py-2 shadow mx-auto ">
                    {poke.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mb-2">
                  {console.log(P.name.split("-").shift())}
                  <Image
                    src={
                      pokemon.find(
                        (p) => p.name.split("-").shift() === poke.name
                      ).image
                    }
                    alt={poke.name}
                    width={170}
                    height={200}
                    quality={100}
                    priority
                  />
                </CardContent>
                <div className=" flex justify-center gap-0">
                  {pokemon
                    .find((p) => p.name.split("-").shift() === poke.name)
                    .types.map((type, index) => (
                      <Badge
                        key={index}
                        className=" bg-transparent p-1 md:p-2 capitalize"
                      >
                        <img
                          className="w-12 h-3.5 md:w-24 md:h-6 border border-blue-900 rounded"
                          src={
                            typeImg[type] ? typeImg[type] : "/placeholder.png"
                          }
                          alt={type}
                        />
                      </Badge>
                    ))}
                </div>
              </Link>
            </Card>
            {index < P.evolve.length - 1 && (
              <ArrowBigRight className="md:not-sr-only sr-only" />
            )}
            {index < P.evolve.length - 1 && (
              <ArrowBigDown className="not-sr-only md:sr-only" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default EvolutionPage;
