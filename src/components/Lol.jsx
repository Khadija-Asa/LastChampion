import React from "react";
import { lolList } from "../datas/lolData";
import Tournament from "./Tournament";

const Lol = () => {
  return (
    <div className="theme_lol">
      <Tournament title="Choose your 8 favorites animes" data={lolList} />;
    </div>
  )
    
};

export default Lol;