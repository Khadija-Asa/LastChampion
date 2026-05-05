import { tournamentsList } from "../datas/tournamentsData";
import Tournament from "./Tournament";

const Tournaments = () => {
  return (
    <div className="theme theme_tournaments">
      <Tournament
        title="Choose your 8 favorites Esport Tournaments"
        data={tournamentsList}
      />
    </div>
  );
};

export default Tournaments;
