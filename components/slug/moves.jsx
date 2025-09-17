"use client";
import { usePokemon } from "@/context/pokemonProvider";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import typeImg from "@/lib/Type";
// import { ScrollArea } from "@/components/ui/scroll-area";

export const Moves = ({ id }) => {
  const { pokemon } = usePokemon(); // from context
  const [loading, setLoading] = useState(true);
  const [poke, setPoke] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const P = pokemon.find((p) => p.order === id);
      try {
        if (!pokemon) return; // no data yet
        setLoading(true);

        // fetch move details
        const movesWithDetails = await Promise.all(
          P.detail.map(async (move) => {
            const moveRes = await fetch(move.move.url);
            if (!moveRes.ok) throw new Error("Failed to fetch move details");

            const moveDetails = await moveRes.json();
            return {
              name: move.move.name,
              power: moveDetails.power,
              pp: moveDetails.pp,
              type: moveDetails.type.name,
              catagory: moveDetails.damage_class.name,
              acc: moveDetails.accuracy,
            };
          })
        );

        setPoke({
          name: pokemon.name,
          image: pokemon.image,
          moves: movesWithDetails,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemon]);

  const moveCatagory = (move) => {
    if (move?.catagory === "physical") {
      return (
        <div>
          <Image
            src="/catagory/physical.png"
            alt="physical"
            width={35}
            height={35}
            quality={100}
          />
        </div>
      );
    }
    if (move?.catagory === "special") {
      return (
        <div>
          <Image
            src="/catagory/special.png"
            alt="special"
            width={35}
            height={35}
            quality={100}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Image
            src="/catagory/status.png"
            alt="status"
            width={35}
            height={35}
            quality={100}
          />
        </div>
      );
    }
  };
  if (loading) return <div>Loading moves...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!poke) return <div>No data found</div>;

  return (
    // <div className="overflow-x-auto">
    <Table className="max-h-[60vh] w-[45vw] border bg-slate-600/40 border-gray-700 rounded-lg">
      <TableHeader className="sticky top-0 z-10 bg-gray-800">
        <TableRow>
          <TableHead className="w-[190px] text-white">Move</TableHead>
          <TableHead className="text-white">Type</TableHead>
          <TableHead className="text-white  w-[150px]">catagory</TableHead>
          <TableHead className="text-white  w-[90px]">Power</TableHead>
          <TableHead className="text-white  w-[70px] ">Acc.</TableHead>
          <TableHead className="text-right w-[50px] text-white">PP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {poke.moves.map((move, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium capitalize">
              {move.name}
            </TableCell>
            <TableCell>
              {
                <img
                  className="w-19 h-5 border border-slate-900 rounded"
                  src={
                    typeImg[move.type] ? typeImg[move.type] : "/placeholder.png"
                  }
                  alt={move.type}
                />
              }
            </TableCell>
            <TableCell>
              {
                moveCatagory(move)
                // move.catagory==="physical"?<img src="/catagory/physical.png" alt="physical"/>:""
              }
            </TableCell>
            <TableCell>{move.power || "—"}</TableCell>
            <TableCell>{move.acc}</TableCell>
            <TableCell className="text-right">{move.pp || "—"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
