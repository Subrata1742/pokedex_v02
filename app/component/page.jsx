"use client";
import Link from "next/link";
import React, { useState ,useRef,useEffect} from "react";
import FavoriteButton from "./FavoritesButton";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { LoaderCircle } from "lucide-react";


import { usePokemon } from "./../../context/pokemonProvider";
const PokemonList = () => {
  const { pokemon, loading, setLoading } = usePokemon();
  const [visibleCount, setVisibleCount] = useState(20);
  const visiblePokemon = pokemon.slice(0, visibleCount);
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 20);
      setLoading(false);
    }, 800); // 800ms fake loading
  };
  const bottomElementRef = useRef(null);

  useEffect(() => {
    if (loading || visibleCount >= pokemon.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 20);
            setLoading(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (bottomElementRef.current) {
      observer.observe(bottomElementRef.current);
    }

    return () => {
      if (bottomElementRef.current) {
        observer.unobserve(bottomElementRef.current);
      }
    };
  }, [loading, pokemon, visibleCount, setLoading]);


  return (
    <div className="w-full max-w-full mx-auto">
      <div className="grid grid-cols-5  gap-4 p-4 mx-10">
        {visiblePokemon.map((p) => (
          <div key={p.name}>
            <Card className="bg-blue-950/70 gap-0.5 border-blue-700 shadow-lg flex flex-col text-white">
                <Link className=" items-center" href={`/${p.name}`}>
              <CardHeader>
                <CardTitle className="capitalize font-bold text-center text-xl py-2 shadow mx-auto ">{p.name}</CardTitle>
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
                </Link>
                <FavoriteButton name={p.name} image={p.image} order={p.order} />
            </Card>
          </div>
        ))}
      </div>
      
        {loading && <div className="flex  justify-center items-center py-4">
          <img src="/image/PokemonLoader.png" className="animate-spin h-12 w-12 opacity-90" alt="Loader" />
          {/* <LoaderCircle className="animate-spin text-white h-12 w-12" /> */}
          </div>}
        <div ref={bottomElementRef} className="h-10 w-full" />
        {/* {!loading && (
          <Button
            variant="default"
            onClick={handleLoadMore}
            className="mx-4 mb-4 px-4 py-2 border-blue-900    hover:bg-blue-700/50"
            disabled={loading}
          >
            {!loading && <RefreshCcw className=" w-6 h-6" />}
          </Button>
        )} */}
      </div>
    
  );
};

export default PokemonList;
