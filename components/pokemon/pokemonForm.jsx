import React from "react";
import Image from "next/image";
import Link from "next/link";
import typeImg from "@/lib/Type";

import { usePokemon } from "@/context/pokemonProvider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PokemonForm = ({ id }) => {
  const { pokemon } = usePokemon();
  const P = pokemon.find((p) => p.name === id);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full  justify-items-center px-8 md:px-18  items-center md:gap-4 mt-8">
      {P &&
        P.varieties.map((poke, index) => (
          <Card
            key={index}
            className="animate-fadeInUp bg-slate-600/40 w-[31.5vw] h-[22vh] md:h-full md:w-full gap-0.5  border-slate-700 shadow-lg flex flex-col text-white"
          >
            <Link
              className=" items-center"
              href={`/pokemon/${poke.pokemon.name}`}
            >
              <CardHeader>
                <CardTitle className="capitalize text-xs font-bold text-center md:text-xl md:py-2 shadow mx-auto ">
                  {poke.pokemon.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-2">
                {/* {console.log(P.pokemon.name)} */}
                <Image
                  src={pokemon.find((p) => p.name === poke.pokemon.name).image}
                  alt={poke.pokemon.name}
                  width={170}
                  height={200}
                  quality={100}
                  priority
                />
              </CardContent>
              <div className=" flex justify-center gap-1">
                {pokemon
                  .find((p) => p.name === poke.pokemon.name)
                  .types.map((type, index) => (
                    <Badge
                      key={index}
                      className="bg-transparent p-1 md:p-2 capitalize"
                    >
                      <img
                        className="w-12 h-3.5 md:w-24 md:h-6 border border-blue-900 rounded"
                        src={typeImg[type] ? typeImg[type] : "/placeholder.png"}
                        alt={type}
                      />
                    </Badge>
                  ))}
              </div>
            </Link>
          </Card>
        ))}
    </div>
  );
};
export default PokemonForm;
