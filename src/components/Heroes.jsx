import { heroesList } from "../datas/heroesData";
import Tournament from "./Tournament";

const Heroes = () => {
  return (
    <div className="theme theme_heroes">
      <Tournament
        title="Choose your 8 favorites Super-heroes"
        data={heroesList}
      />
    </div>
  );
};

export default Heroes;
