import { usePokemon } from "@/context/pokemonProvider";
import React from "react";
import typeImg from "@/lib/Type";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const PokemonForm = ({ id }) => {
  const { pokemon } = usePokemon();
  const P = pokemon.find((p) => p.name === id);

  return (
    <div className="grid grid-cols-3 w-ful justify-items-center px-18  items-center gap-4 mt-8">
      {P &&
        P.varieties.map((poke, index) => (
          <Card
            key={index}
            className="bg-slate-950/55 w-fit h-fit gap-0.5  border-slate-700 shadow-lg flex flex-col text-white"
          >
            <Link className=" items-center" href={`/${poke.pokemon.name}`}>
              <CardHeader>
                <CardTitle className="capitalize font-bold text-center text-lg py-2 shadow mx-auto ">
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
                    <Badge key={index} className=" bg-transparent capitalize">
                      <img
                        className="w-20 h-5 border border-blue-900 rounded"
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
