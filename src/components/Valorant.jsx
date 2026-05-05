import { valorantList } from "../datas/valorantData";
import Tournament from "./Tournament";

const Valorant = () => {
  return (
    <div className="theme theme_valorant">
      <Tournament
        title="Choose your 8 favorites Valorant Agents"
        data={valorantList}
      />
    </div>
  );
};

export default Valorant;
