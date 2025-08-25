import React from "react";
import { streetFighterList } from "../datas/streetFighterData";
import Tournament from "./Tournament";

const Streetfighter = () => {
  return (
    <div className="theme_streetfighter">
      <Tournament title="Choose your 8 favorites Street Fighters" data={streetFighterList} />;
    </div>
  )
    
};

export default Streetfighter;