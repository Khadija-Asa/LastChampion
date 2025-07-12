import React from "react";
import { heroesList } from "../datas/heroesData";
import Tournament from "./Tournament";

const Heroes = () => {
  return (
    <>
      <Tournament title="Choose your 8 favorites Super-heroes" data={heroesList} />;
    </>
  )
    
};

export default Heroes;