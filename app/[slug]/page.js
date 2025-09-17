"use client";
import React, { useEffect } from "react";
import { usePokemon } from "@/context/pokemonProvider";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Eye } from "lucide-react";
import { Info } from "lucide-react";
import { LucideRadar } from "lucide-react";
import { House } from "lucide-react";
import PokemonModel from "../../components/slug/model";

import typeImg from "@/lib/Type";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import EvolutionPage from "../../components/slug/evolutionPage";
import { Atom } from "lucide-react";
import { Moves } from "../../components/slug/moves";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Swords } from "lucide-react";
import { useParams } from "next/navigation";
import PokemonForm from "../../components/slug/pokemonForm";
import Detail from "../../components/slug/Detail";
import Stats from "../../components/slug/Stats";

const PokemonPage = ({ params }) => {
  const { slug } = useParams();
  // const slug = React.use(params).slug;
  const { pokemon, loading, forms } = usePokemon();

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
  
  
  const p = forms.find((p) => p.id.toString() === P.id);
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          <Card className="bg-slate-950/55 border-slate-700 shadow-lg  text-white">
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
                          className="w-24 h-6 border border-slate-900 rounded"
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
              <PokemonModel P={P.id} poke={P} />
              <div className="flex gap-2">
                {formsName &&
                  formsName.map((f, i) => (
                    <Button
                      key={i}
                      onClick={() => {
                        document.querySelector("model-viewer").src = f.model;
                      }}
                      className="p-2 bg-slate-950/70 text-white rounded capitalize"
                    >
                      {mega(f)}
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-950/55 h-full text-white border-slate-700 shadow-lg md:col-span-2 flex flex-col">
            <CardHeader>
              <div className="flex ml-16 flex-row gap-0 items-center">
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
                    className="justify-start p-2 px-4 bg-slate-700/60 data-[state=active]:bg-slate-900"
                  >
                    <Info className="  text-sky-200 " />
                  </TabsTrigger>
                  <TabsTrigger
                    value="stats"
                    className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-slate-900"
                  >
                    <LucideRadar className="text-sky-200  " />
                  </TabsTrigger>
                  <TabsTrigger
                    value="evolution"
                    className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-slate-900"
                  >
                    <Atom className="text-sky-200  " />
                  </TabsTrigger>
                  <TabsTrigger
                    value="moves"
                    className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-slate-900"
                  >
                    <Swords className="text-sky-200  " />
                  </TabsTrigger>
                  <TabsTrigger
                    value="Form"
                    className="justify-start  p-2 px-4 bg-slate-700/60 data-[state=active]:bg-slate-900"
                  >
                    <Swords className="text-sky-200  " />
                  </TabsTrigger>
                </TabsList>
                <Separator orientation="vertical" className="bg-slate-700" />
                {/* Info Tab */}

                <TabsContent
                  value="info"
                  className="flex-auto mx-6 ml-9 min-h-[300px] "
                >
                  <Detail P={P} />
                </TabsContent>

                {/* Stats Tab */}
                <TabsContent
                  value="stats"
                  className=" min-h-[300px] flex items-center justify-center"
                >
                  <Stats P={P}/>
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
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <Button variant="default" className="pr-3 pl-2 bg-slate-900 hover:bg-slate-800">
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
