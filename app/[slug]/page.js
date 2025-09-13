"use client";
// import Image from "next/image";
import React from "react";
import { usePokemon } from "@/context/pokemonProvider";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Info } from "lucide-react";
import { LucideRadar } from "lucide-react";
import { House } from "lucide-react";
import PokemonModel from "../component/model";
// import "@google/model-viewer";

const PokemonPage = ({ params }) => {
  const { slug } = React.use(params);

  const { pokemon, loading, forms } = usePokemon();
  // const [PokemonModel, setPokemonModel] = useState([])

  const P = pokemon.find((p) => p.name === slug);
  function formatThreeDigitNumber(i) {
    return String(i).padStart(3, "0");
  }
   
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!P) {
    return <p>Pokémon not found.</p>;
  }
function formatStatName(name) {
  const mapping = {
    "special-attack": "Sp.Atk",
    "special-defense": "Sp.Def",
    hp: "HP",
    speed: "Speed",
  };
  return mapping[name] || name.charAt(0).toUpperCase() + name.slice(1);
}
const chartData = P.stats.map((s) => ({
    ...s,
    name: formatStatName(s.name),
  }));
  const p = forms.find((p) => p.id === P.order);
   const formsName = p ? p.forms : null;
   const mega = (f) => {
     if (f.formName === "xy") {
        if(f.name === "Mega Mewtwo X" || f.name === "Mega Charizard X"){
          return "Mega x";
        }
        if (f.name === "Mega Mewtwo Y" || f.name === "Mega Charizard Y") {
          return "Mega y";
        }
        return "Mega";
     }
     return f.formName;
   };
  return (
    <div className="h-screen w-screen  text-white">
      <div className="h-full flex flex-col p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">SUMMARY</h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {/* Pokémon Card */}
          <Card className="bg-blue-950/80 border-blue-700 shadow-lg md:col-span-1 flex flex-col text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg font-semibold capitalize">
                  {P.name}
                </span>
                {P.types.map((type, index) => (
                  <Badge key={index} className="bg-green-600 capitalize">
                    {type}
                  </Badge>
                ))}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center">
              <PokemonModel P={P.order} />
             <div className="flex gap-2">
              {formsName.map((f, i) => (
                <Button
                key={i}
                onClick={() => {
                  document.querySelector("model-viewer").src = f.model;
                }}
                className="p-2 bg-blue-950/70 text-white rounded capitalize"
                >{mega(f)}
           
          </Button>
        ))}
        </div> 
            </CardContent>
          </Card>

          {/* Info / Stats Card */}
          <Card className="bg-blue-950/80 text-white border-blue-700 shadow-lg md:col-span-2 flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg text-center font-semibold">
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <Tabs
                defaultValue="info"
                corientation="vertical"
                className="flex flex-row h-fit"
              >
                {/* Tabs List */}
                <TabsList className="grid grid-cols-1 col-span-1 w-fit bg-transparent h-full gap-4 ">
                  <TabsTrigger
                    value="info"
                    className="justify-start data-[state=active]:bg-blue-950/75"
                  >
                    <Info className="  text-sky-200 " />
                  </TabsTrigger>
                  <TabsTrigger
                    value="stats"
                    className="justify-start data-[state=active]:bg-blue-950/75"
                  >
                    <LucideRadar className="text-sky-200 " />
                  </TabsTrigger>
                </TabsList>

                {/* Info Tab */}

                <TabsContent
                  value="info"
                  className="flex-auto mx-4 min-h-[300px] "
                >
                  {" "}
                  <div className="flex flex-row gap-4">
                    <div
                      className={cn(
                        "flex items-center gap-1 bg-sky-200 text-sky-950 text-xs font-semibold px-2 py-1 rounded-r-full rounded-l-md shadow-sm",
                        "w-fit"
                      )}
                    >
                      <Eye className="w-3 h-3" />
                      <span>{formatThreeDigitNumber(P.order)}</span>
                    </div>
                    <h1 className=" capitalize text-xl text-white font-bold">
                      {P.name}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 w-full items-center justify-center">
                    <h3>{P.species}</h3>

                    <div className="flex flex-wrap gap-2">
                      {P.types.map((type, index) => (
                        <Badge
                          key={index}
                          className="bg-slate-700 text-sm capitalize"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Card className=" bg-blue-900/35 w-full gap-2 text-white border-blue-700 ">
                    <CardHeader>
                      <h1 className="text-lg  text-center font-semibold">
                        Description
                      </h1>
                    </CardHeader>
                    <div className="flex flex-col ">
                      <p className="text-sm text-center italic">
                        {P.description}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-around mt-4 mb-2">
                      <div className="flex flex-col">
                        <h1 className="px-4 py-2 border rounded-xl">
                          {P.height} m
                        </h1>
                        <h3 className="text-sm opacity-80 text-center">
                          {" "}
                          Height
                        </h3>
                      </div>
                      <div className="flex flex-col">
                        <h1 className="px-4 py-2 border rounded-xl">
                          {P.weight} kg
                        </h1>
                        <h3 className="text-sm opacity-80 text-center">
                          Weight
                        </h3>
                      </div>
                    </div>
                  </Card>
                  <Card className=" bg-blue-900/35  w-full gap-2 text-white border-blue-700 ">
                    <CardHeader>
                      <h1 className="text-lg  text-center font-semibold">
                        Abilities
                      </h1>
                    </CardHeader>

                    <div className="flex flex-wrap justify-center mb-4">
                      {P.abilities.map((ability, index) => (
                        <div
                          key={index}
                          className={`p-2 w-[200px] border rounded-md m-1 ${
                            ability.is_hidden
                              ? "bg-blue-900/80"
                              : "bg-transparent"
                          }`}
                        >
                          <h4 className="flex flex-row "><div>{ability.is_hidden ? <p className="text-gray-400">Hidden <span className="mx-1">|</span></p> : ""}</div>{ability.name}</h4>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Stats Tab */}
                <TabsContent
                  value="stats"
                  className=" min-h-[300px] flex items-center justify-center"
                >
                  {" "}
                  <div className="flex flex-col h-full w-full">
                    <div className="text-white text-center text-2xl text-bold">
                      Stats Overview
                    </div>
                    <ResponsiveContainer
                      width="100%"
                      height={280}
                      className="my-6"
                    >
                      <RadarChart data={chartData}>
                        <PolarGrid stroke="#64748b" />
                        <PolarAngleAxis dataKey="name" stroke="#f1f5f9" />
                        <Radar
                          name={P.name}
                          dataKey="value"
                          stroke="#22c55e"
                          fill="#22c55e"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          
          <Button variant="default" className="pr-3 pl-2">
            <Link
              href="/"
              className="flex flex-row justify-center items-center"
            >
              <House className="w-4 h-4 mr-1" />
              <h1 className="text-sm">Home</h1>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
