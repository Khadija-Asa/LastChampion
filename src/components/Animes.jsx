import React from "react";
import { animeList } from "../datas/animesData";
import Tournament from "./Tournament";

const Animes = () => {
  return (
    <div className="theme_animes">
      <Tournament title="Choose your 8 favorites animes" data={animeList} />;
    </div>
  )
    
};

export default Animes;