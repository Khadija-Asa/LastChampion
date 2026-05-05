import { fifaList } from "../datas/fifaData";
import Tournament from "./Tournament";

const Fifa = () => {
  return (
    <div className="theme theme_fifa">
      <Tournament
        title="Choose your 8 favorites Fifa26 Clubs"
        data={fifaList}
      />
    </div>
  );
};

export default Fifa;
