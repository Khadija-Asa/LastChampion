import { pokemonList } from "../datas/pokemonsData";
import Tournament from "./Tournament";

const Pokemon = () => {
  return (
    <div className="theme theme_pokemon">
      <Tournament title="Choose your 8 favorites Pokemon" data={pokemonList} />
    </div>
  );
};

export default Pokemon;
