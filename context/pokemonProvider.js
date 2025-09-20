"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const PokemonContext = createContext();

export function usePokemon() {
  return useContext(PokemonContext);
}

export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState([]);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1300`
      );
      const data = await response.json();

      const pokemonData = await Promise.all(
        data.results.map(async (p) => {
          const detailRes = await fetch(p.url);
          const detail = await detailRes.json();

          const speciesRes = await fetch(detail.species.url);
          const species = await speciesRes.json();
          const evo = await fetch(species.evolution_chain.url);
          const evoData = await evo.json();
          const evolveData = evoData?.chain;

          const renderChain = (data) => {
            const pokemonList = [];
            const traverseChain = (node) => {
              pokemonList.push({
                name: node.species.name,
              });

              if (node.evolves_to.length > 0) {
                node.evolves_to.forEach(traverseChain);
              }
            };
            traverseChain(data);
            return pokemonList;
          };

          return {
            id: detail.species.url?.split("/").filter(Boolean).pop(),
            form: detail.forms,
            order: detail.id,
            name: detail.name,
            height: detail.height,
            weight: detail.weight,
            types: detail.types.map((t) => t.type.name),
            image: detail.sprites.other["official-artwork"].front_default,
            Shinyimage: detail.sprites.other["official-artwork"].front_shiny,
            stats: detail.stats.map((s) => ({
              name: s.stat.name,
              value: s.base_stat,
            })),
            description:
              species.flavor_text_entries
                .find((entry) => entry.language.name === "en")
                ?.flavor_text.replace(/[\n ,\f]/g, " ") || "",
            abilities: detail.abilities.map((a) => ({
              name: a.ability.name,
              is_hidden: a.is_hidden,
            })),
            cry: detail.cries.latest,
            species:
              species.genera.find((g) => g.language.name === "en")?.genus || "",
            evolve: renderChain(evolveData),
            detail: detail.moves,
            varieties: species.varieties,
          };
        })
      );

      setPokemon(pokemonData);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokemon-3d-api.onrender.com/v1/pokemon"
      );
      const data = await response.json();

      setForms(data);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(script);

    fetchPokemon();
    fetchData();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, loading, setLoading, forms }}>
      {children}
    </PokemonContext.Provider>
  );
}
