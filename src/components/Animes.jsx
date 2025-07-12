import React from "react";
import { animeList } from "../datas/animesData";
import Tournament from "./Tournament";

const Animes = () => {
  return (
    <>
      <Tournament title="Choose your 8 favorites animes" data={animeList} />;
    </>
  )
    
};

export default Animes;