import React from "react";
import { pokemonList } from "../datas/pokemonsData";
import Tournament from "./Tournament";

const Pokemon = () => {
  return (
    <>
      <Tournament title="Choose your 8 favorites Pokemons" data={pokemonList} />;
    </>
  )
};

export default Pokemon;
