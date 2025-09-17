import { usePokemon } from "@/context/pokemonProvider";
import React from "react";
import typeImg from "@/lib/Type";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowBigRight } from "lucide-react";

const EvolutionPage = ({ id }) => {
  const { pokemon } = usePokemon();
  const P = pokemon.find((p) => p.name === id);
 
  return (
    <div className="flex flex-row justify-center items-center gap-2 mt-8">
      {P?.evolve.map((poke, index) => (
        <div key={index} className="flex flex-row justify-center items-center gap-2">
          <Card className="bg-slate-950/55 gap-0.5  border-slate-700 shadow-lg flex flex-col text-white">
            <Link className=" items-center" href={`/${poke.name}`}>
              <CardHeader>
                <CardTitle className="capitalize font-bold text-center text-xl py-2 shadow mx-auto ">
                  {poke.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-2">
                {console.log(P.name.split("-").shift())}
                <Image
                  src={pokemon.find((p) => p.name.split("-").shift() === poke.name).image}
                  alt={poke.name}
                  width={170}
                  height={200}
                  quality={100}
                  priority
                />
              </CardContent>
              <div className=" flex justify-center gap-1">
                {pokemon
                  .find((p) => p.name.split("-").shift() === poke.name)
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
          {index < P.evolve.length - 1 && <ArrowBigRight />}
        </div>
      ))}
    </div>
  );
};

export default EvolutionPage;
