import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cry } from "./cry";
import { PokedexEntry } from "./PokedexEntry";
import { Separator } from "@/components/ui/separator";
const Detail = ({ P }) => {
  return (
    <div>
      <Card className=" bg-slate-600/40 w-full gap-2 rounded-b-none text-white border-slate-700 ">
        <CardHeader>
          <h1 className="text-xl  text-center font-semibold">Description</h1>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <div className="flex flex-col ">
            <p className="text-md text-center italic">{P.description}</p>
          </div>
          <Separator className="mt-4 opacity-75 bg-slate-700" />
          <div className="flex flex-row w-full justify-around mt-4 mb-2">
            <div className="flex flex-col">
              <h1 className="px-2 text-center border-slate-100/60 py-2 w-24 text-lg border rounded-xl">
                {P.height / 10} m
              </h1>
              <h3 className="text-sm opacity-80 text-center"> Height</h3>
            </div>
            {/* <Separator orientation="vertical" /> */}
            <div className="flex flex-col">
              <h1 className="px-2 text-center border-slate-100/60 py-2 w-24 text-lg border rounded-xl">
                {P.weight / 10} kg
              </h1>
              <h3 className="text-sm opacity-80 text-center">Weight</h3>
            </div>
          </div>
          <Separator className="mt-2 opacity-75 bg-slate-700 " />
          <div className="flex flex-row w-full justify-around mt-4 mb-2">
            <Cry id={P.order} />
            <PokedexEntry P={P} />
          </div>
        </CardContent>
      </Card>
      <Card className=" bg-slate-600/35 h-[23vh] w-full gap-2 rounded-t-none text-white border-slate-700 ">
        <CardHeader>
          <h1 className="text-lg  text-center font-semibold">Abilities</h1>
        </CardHeader>

        <div className="flex flex-wrap justify-center items-center ">
          {P.abilities.map((ability, index) => (
            <div
              key={index}
              className={`p-2 w-[200px] border rounded-md m-1 ${
                ability.is_hidden ? "bg-slate-900/80" : "bg-transparent"
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
    </div>
  );
};

export default Detail;
