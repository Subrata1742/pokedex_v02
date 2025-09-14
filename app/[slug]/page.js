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
// import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Info } from "lucide-react";
import { LucideRadar } from "lucide-react";
import { House } from "lucide-react";
import PokemonModel from "../component/slug/model";
import { Cry } from "../component/slug/cry";
import { PokedexEntry } from "../component/slug/PokedexEntry";
import typeImg from "@/lib/Type";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
// import {pokeball} from "../../public/image/pokeball.png"
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
      if (f.name === "Mega Mewtwo X" || f.name === "Mega Charizard X") {
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
        <div className="flex flex-row ">
          <Image
            src={"/image/pokeball.png"}
            alt="Pokeball"
            width={20}
            height={20}
            className="w-8 h-8 mt-0.5 mx-2 animate-spin"
          />
          <div className="text-2xl text-center font-bold mb-6"> SUMMARY</div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {/* Pokémon Card */}
          <Card className="bg-blue-950/80 border-blue-700 shadow-lg  text-white">
            <CardHeader>
              <CardTitle className="flex flex-col w-full items-start justify-center gap-1">
                <div className="flex flex-row justify-between w-full gap-0  ">
                  <span className="text-xl font-semibold   capitalize">
                    {P.name}
                  </span>{" "}
                  <div className=" flex gap-1">
                    {P.types.map((type, index) => (
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
                </div>
                <p className="text-md opacity-75">{P.species}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center">
              <PokemonModel P={P.order} />
              <div className="flex gap-2">
                {formsName &&
                  formsName.map((f, i) => (
                    <Button
                      key={i}
                      onClick={() => {
                        document.querySelector("model-viewer").src = f.model;
                      }}
                      className="p-2 bg-blue-950/70 text-white rounded capitalize"
                    >
                      {mega(f)}
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Info / Stats Card */}
          <Card className="bg-blue-950/80 text-white border-blue-700 shadow-lg md:col-span-2 flex flex-col">
            <CardHeader>
              <div className="flex ml-16 flex-row gap-0 items-center">
                <div className="flex items-center rounded-l-sm rounded-r-xs bg-sky-200 font-bold w-[60px] h-[37px] text-blue-900">
                  {" "}
                  <Eye className="w-4 h-4 mx-2 " />
                  <span>{formatThreeDigitNumber(P.order)}</span>
                </div>
                <div class="w-0 h-0 border-t-[19px] border-t-transparent border-l-[30px] border-l-sky-200 border-b-[19px] border-b-transparent"></div>
                
                <h1 className=" ml-5 capitalize text-xl text-white font-bold">
                  {P.name}
                </h1>
              </div>
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
                    className="justify-start p-2 px-4 bg-blue-700/60 data-[state=active]:bg-slate-900"
                  >
                    <Info className="  text-sky-200 " />
                  </TabsTrigger>
                  <TabsTrigger
                    value="stats"
                    className="justify-start  p-2 px-4 bg-blue-700/60 data-[state=active]:bg-slate-900"
                  >
                    <LucideRadar className="text-sky-200  " />
                  </TabsTrigger>
                </TabsList>
                <Separator orientation="vertical" className="bg-blue-700" />
                {/* Info Tab */}

                <TabsContent
                  value="info"
                  className="flex-auto mx-6 ml-9 min-h-[300px] "
                >
                  <Card className=" bg-blue-900/35 w-full gap-2 text-white border-blue-700 ">
                    <CardHeader>
                      <h1 className="text-xl  text-center font-semibold">
                        Description
                      </h1>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center">
                      <div className="flex flex-col ">
                        <p className="text-md text-center italic">
                          {P.description}
                        </p>
                      </div>
                      <Separator className="mt-4 opacity-75 bg-blue-700" />
                      <div className="flex flex-row w-full justify-around mt-4 mb-2">
                        <div className="flex flex-col">
                          <h1 className="px-2 text-center border-blue-100/60 py-2 w-24 text-lg border rounded-xl">
                            {P.height/10} m
                          </h1>
                          <h3 className="text-sm opacity-80 text-center">
                            {" "}
                            Height
                          </h3>
                        </div>
                        {/* <Separator orientation="vertical" /> */} 
                        <div className="flex flex-col">
                          <h1 className="px-2 text-center border-blue-100/60 py-2 w-24 text-lg border rounded-xl">
                            {P.weight/10} kg
                          </h1>
                          <h3 className="text-sm opacity-80 text-center">
                            Weight
                          </h3>            
                        </div>
                      </div>
                      <Separator className="mt-2 opacity-75 bg-blue-700 " />
                      <div className="flex flex-row w-full justify-around mt-4 mb-2">
                        <Cry id={P.order} />
                        <PokedexEntry P={P} />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className=" bg-blue-900/35 mt-5 w-full gap-2 text-white border-blue-700 ">
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
                          <h4 className="flex flex-row ">
                            <div>
                              {ability.is_hidden ? (
                                <p className="text-gray-400">
                                  Hidden <span className="mx-1">|</span>
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            {ability.name}
                          </h4>
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
