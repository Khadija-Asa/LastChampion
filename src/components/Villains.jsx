import React from "react";
import { villainsList } from "../datas/villainsData";
import Tournament from "./Tournament";

const Villains = () => {
  return (
    <div className="theme_villains">
      <Tournament title="Choose your 8 favorites villains" data={villainsList} />;
    </div>
  )
    
};

export default Villains;