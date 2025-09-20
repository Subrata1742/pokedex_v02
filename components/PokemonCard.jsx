import React from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoritesButton";
import typeImg from "@/lib/Type";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useUser } from "@clerk/nextjs";

const PokemonCard = ({ p }) => {
  const user = useUser();
  return (
    <Card className="animate-fadeInUp bg-slate-950/55 gap-0.5 border-slate-700 w-[31.5vw] h-[22vh] md:h-full md:w-full shadow-lg flex flex-col text-white">
      <Link className=" items-center" href={`/pokemon/${p.name}`}>
        <CardHeader>
          <CardTitle className="capitalize text-xs font-bold text-center md:text-xl md:py-2 shadow mx-auto ">
            {p.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="mb-2">
          <Image
            src={p.image ? p.image : "/placeholder.png"}
            alt={p.name}
            width={250}
            height={250}
            quality={100}
            priority
          />
        </CardContent>
        <div className=" flex justify-center mx-5  gap-0">
          {p.types.map((type, index) => (
            <Badge
              key={index}
              className=" bg-transparent p-1 md:p-2 capitalize"
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
      <FavoriteButton
        name={p.name}
        image={p.image}
        order={p.order}
        user={user?.user?.id}
      />
    </Card>
  );
};

export default PokemonCard;
