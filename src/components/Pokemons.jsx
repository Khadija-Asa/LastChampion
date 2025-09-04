import React from "react";
import { pokemonList } from "../datas/pokemonsData";
import Tournament from "./Tournament";

const Pokemon = () => {
  return (
    <div className="theme_pokemon">
      <Tournament title="Choose your 8 favorites Pokemons" data={pokemonList} />
    </div>
  )
};

export default Pokemon;
