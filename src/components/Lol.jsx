import { lolList } from "../datas/lolData";
import Tournament from "./Tournament";

const Lol = () => {
  return (
    <div className="theme theme_lol">
      <Tournament title="Choose your 8 favorites Lol Champions" data={lolList} />
    </div>
  ) 
};

export default Lol;