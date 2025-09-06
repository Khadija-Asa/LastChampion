import { retroList } from "../datas/retroData";
import Tournament from "./Tournament";

const Retro = () => {
  return (
    <div className="theme theme_retro">
      <Tournament title="Choose your 8 favorites Retro Games" data={retroList} />
    </div>
  ) 
};

export default Retro;