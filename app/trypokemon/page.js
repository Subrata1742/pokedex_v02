"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

export default function pDetailPage() {
  const p = {
    name: "Chikorita",
    level: 8,
    type: "Grass",
    exp: 314,
    nextLevel: 105,
    size: "M",
    trainer: "Harmony",
    id: "170597",
    sprite: "/chikorita.png", // place image in /public
    stats: [
      { stat: "HP", value: 45 },
      { stat: "Attack", value: 49 },
      { stat: "Defense", value: 65 },
      { stat: "Sp. Atk", value: 49 },
      { stat: "Sp. Def", value: 65 },
      { stat: "Speed", value: 45 },
    ],
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-sky-900 to-blue-800 text-white">
      <div className="h-full flex flex-col p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">SUMMARY</h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {/* Pokémon Card */}
          <Card className="bg-blue-950/50 border-blue-700 shadow-lg md:col-span-1 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-lg font-semibold">{p.name}</span>
                <Badge className="bg-green-600">{p.type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center">
              <Image
                src={p.sprite}
                alt={p.name}
                width={200}
                height={200}
                className="drop-shadow-lg"
              />
              <p className="mt-3 text-sm">Lv. {p.level}</p>
            </CardContent>
          </Card>

          {/* Info / Stats Card */}
          <Card className="bg-blue-950/50 border-blue-700 shadow-lg md:col-span-2 flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <Tabs defaultValue="info" className="h-full flex flex-col">
                {/* Tabs List */}
                <TabsList className="flex gap-2">
                  <TabsTrigger value="info" className="flex-1">
                    Info
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex-1">
                    Stats
                  </TabsTrigger>
                </TabsList>

                {/* Info Tab */}
                <TabsContent
                  value="info"
                  className="mt-4 min-h-[300px] space-y-3"
                >
                  <div className="flex justify-between">
                    <span>Current EXP</span>
                    <span>{p.exp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points to Level Up</span>
                    <span>{p.nextLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size Classification</span>
                    <span>{p.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Original Trainer</span>
                    <span>{p.trainer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ID No.</span>
                    <span>{p.id}</span>
                  </div>
                </TabsContent>

                {/* Stats Tab */}
                <TabsContent
                  value="stats"
                  className="mt-4 min-h-[300px] flex items-center justify-center"
                >
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={p.stats}>
                      <PolarGrid stroke="#64748b" />
                      <PolarAngleAxis dataKey="stat" stroke="#f1f5f9" />
                      <Radar
                        name={p.name}
                        dataKey="value"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button variant="default">Change Nickname</Button>
          <Button variant="secondary">Change Moves</Button>
          <Button variant="outline">Back</Button>
        </div>
      </div>
    </div>
  );
}
