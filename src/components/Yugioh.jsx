import React from "react";
import { yugiohList } from "../datas/yugiohData";
import Tournament from "./Tournament";

const Yugioh = () => {
  return (
    <>
      <Tournament title="Choose your 8 favorites Yu-Gi-Oh's cards" data={yugiohList} />;
    </>
  )
    
};

export default Yugioh;