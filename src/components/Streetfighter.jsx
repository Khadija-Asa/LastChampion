import { streetFighterList } from "../datas/streetFighterData";
import Tournament from "./Tournament";

const Streetfighter = () => {
  return (
    <div className="theme theme_streetfighter">
      <Tournament title="Choose your 8 favorites Street Fighters" data={streetFighterList} />
    </div>
  )    
};

export default Streetfighter;