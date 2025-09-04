import React from "react";
import { consolesList } from "../datas/consolesData";
import Tournament from "./Tournament";

const Consoles = () => {
  return (
    <div className="theme_consoles">
      <Tournament title="Choose your 8 favorites Game Consoles" data={consolesList} />
    </div>
  )
    
};

export default Consoles;