import { footballList } from "../datas/footballData";
import Tournament from "./Tournament";

const Football = () => {
  return (
    <div className="theme theme_football">
      <Tournament
        title="Choose your 8 favorites Football Players"
        data={footballList}
      />
    </div>
  );
};

export default Football;
