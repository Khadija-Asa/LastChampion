import { playersList } from "../datas/playersData";
import Tournament from "./Tournament";

const Players = () => {
  return (
    <div className="theme theme_players">
      <Tournament title="Choose your 8 favorites E-Sport Players" data={playersList} />
    </div>
  )   
};

export default Players;