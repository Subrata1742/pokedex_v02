"use client";
import React from "react";
import { usePokemon } from "@/context/pokemonProvider";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import PokemonModel from "@/components/pokemon/model";
import typeImg from "@/lib/Type";
import EvolutionPage from "@/components/pokemon/evolutionPage";
import { Moves } from "../../../components/pokemon/moves";
import PokemonForm from "../../../components/pokemon/pokemonForm";
import Detail from "../../../components/pokemon/Detail";
import Stats from "../../../components/pokemon/Stats";
import Shiny from "@/components/pokemon/Shiny";

import { Eye } from "lucide-react";
import { Info } from "lucide-react";
import { LucideRadar } from "lucide-react";
import { House } from "lucide-react";
import { Atom } from "lucide-react";
import { Swords } from "lucide-react";
import { Cat } from "lucide-react";
import { Sparkles } from "lucide-react";

const PokemonPage = ({ params }) => {
  const { slug } = useParams();
  // const slug = React.use(params).slug;

  const { pokemon, loading } = usePokemon();

  const P = pokemon.find((p) => p.name === slug);

  function formatThreeDigitNumber(i) {
    return String(i).padStart(3, "0");
  }

  if (loading) {
    return (
      <div className="flex  justify-center items-center py-4">
        <img
          src="/image/PokemonLoader.png"
          className="animate-spin h-12 w-12 opacity-90"
          alt="Loader"
        />
      </div>
    );
  }

  if (!P) {
    return <p className="text-white ">Pokémon not found.</p>;
  }

  return (
    <ScrollArea>
      <div className="h-screen w-screen pt-5 md:pt-2 text-white">
        <div className="h-full w-full flex flex-col   items-center md:items-start  md:p-6">
          <div className="flex flex-wrap w-full  justify-between items-center">
            <div className="flex mx-2 flex-row ">
              <Image
                src={"/image/pokeball.png"}
                alt="Pokeball"
                width={20}
                height={20}
                className="w-8 h-8 mt-0.5 mx-2 animate-spin"
              />
              <div className="text-2xl text-center font-bold mb-6">
                {" "}
                SUMMARY
              </div>
            </div>
            <Button
              variant="default"
              className="px-3  mb-4 mr-6 bg-slate-900 hover:bg-slate-800 not-sr-only md:sr-only"
            >
              <Link
                href="/"
                className="flex flex-row justify-center items-center"
              >
                <House className="w-4 h-4 " />
              </Link>
            </Button>
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3  gap-6 justify-items-center md:justify-center  md:w-full ">
            <Card className="bg-slate-950/55 border-slate-700 shadow-lg h-full md:h-[80vh] w-[90vw]   md:w-full text-white ">
              <CardHeader>
                <CardTitle className="flex flex-col w-full items-start justify-center gap-1">
                  <div className="flex flex-row justify-between w-full gap-0  ">
                    <span className="text-xl font-semibold   capitalize">
                      {P.name}
                    </span>{" "}
                    <div className=" flex gap-1">
                      {P.types.map((type, index) => (
                        <Badge
                          key={index}
                          className=" bg-transparent capitalize"
                        >
                          <img
                            className="w-17 md:w-24 h-4.5 md:h-6 border border-slate-900 rounded"
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
              <CardContent className="flex-1 flex flex-col px-0 items-center justify-center">
                <PokemonModel P={P.id} poke={P} />
              </CardContent>
            </Card>

            <Card className="bg-slate-950/55 md:h-full h-[80vh] w-[90vw] md:w-full px-0 mb-4 md:mb-0 text-white border-slate-700 shadow-lg md:col-span-2 flex flex-col">
              <CardHeader>
                <div className="flex ml-5 md:ml-16 flex-row gap-0 items-center">
                  <div className="flex items-center rounded-l-sm rounded-r-xs bg-sky-200 font-bold w-[60px] h-[37px] text-blue-900">
                    {" "}
                    <Eye className="w-4 h-4 mx-2 " />
                    <span>{formatThreeDigitNumber(P.order)}</span>
                  </div>
                  <div className="w-0 h-0 border-t-[19px] border-t-transparent border-l-[30px] border-l-sky-200 border-b-[19px] border-b-transparent"></div>

                  <h1 className=" ml-5 capitalize text-xl text-white font-bold">
                    {P.name}
                  </h1>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 md:px-6 ">
                <Tabs
                  defaultValue="info"
                  corientation="vertical"
                  className="flex md:flex-row flex-col h-fit"
                >
                  {/* Tabs List */}
                  <TabsList className="md:grid md:grid-cols-1 px-3 md:px-0 flex col-span-1 w-fit bg-transparent  h-full gap-1 md:gap-4 ">
                    <TabsTrigger
                      value="info"
                      className="justify-start p-2 px-4 bg-slate-700/60 data-[state=active]:bg-sky-200 text-sky-200 data-[state=active]:text-blue-900"
                    >
                      <Info />
                    </TabsTrigger>
                    <TabsTrigger
                      value="stats"
                      className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-sky-200  text-sky-200 data-[state=active]:text-blue-900"
                    >
                      <LucideRadar />
                    </TabsTrigger>
                    <TabsTrigger
                      value="evolution"
                      className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-sky-200  text-sky-200 data-[state=active]:text-blue-900"
                    >
                      <Atom />
                    </TabsTrigger>
                    <TabsTrigger
                      value="moves"
                      className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-sky-200  text-sky-200 data-[state=active]:text-blue-900"
                    >
                      <Swords />
                    </TabsTrigger>
                    <TabsTrigger
                      value="Form"
                      className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-sky-200  text-sky-200 data-[state=active]:text-blue-900"
                    >
                      <Cat />
                    </TabsTrigger>
                    <TabsTrigger
                      value="Shiny"
                      className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-sky-200  text-sky-200 data-[state=active]:text-blue-900"
                    >
                      <Sparkles />
                    </TabsTrigger>
                  </TabsList>
                  {/* <Separator orientation="vertical" className="bg-slate-700" /> */}
                  {/* Info Tab */}

                  <TabsContent
                    value="info"
                    className="flex-auto mx-4 md:mx-6 md:ml-9 min-h-[300px] "
                  >
                    <Detail P={P} />
                  </TabsContent>

                  {/* Stats Tab */}
                  <TabsContent
                    value="stats"
                    className=" min-h-[300px] flex items-center justify-center"
                  >
                    <Stats P={P} />
                  </TabsContent>
                  <TabsContent value="evolution">
                    <EvolutionPage id={P.name} />
                  </TabsContent>

                  <TabsContent
                    value="moves"
                    className="flex flex-col justify-center items-center"
                  >
                    <Moves id={P.order} />
                  </TabsContent>
                  <TabsContent value="Form">
                    <ScrollArea className="h-[450px]">
                      <PokemonForm id={P.name} />
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent
                    value="Shiny"
                    className="flex justify-center items-center"
                  >
                    <Shiny P={P} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className=" md:not-sr-only sr-only">
            <Button
              variant="default"
              className="pr-3 pl-2 mb-4 mr-4 mt-2 bg-slate-900 hover:bg-slate-800 "
            >
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
    </ScrollArea>
  );
};

export default PokemonPage;
