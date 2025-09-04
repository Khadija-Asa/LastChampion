import React from "react";
import { yugiohList } from "../datas/yugiohData";
import Tournament from "./Tournament";

const Yugioh = () => {
  return (
    <div className="theme_yugioh">
      <Tournament title="Choose your 8 favorites Yu-Gi-Oh's cards" data={yugiohList} />
    </div>
  )
    
};

export default Yugioh;