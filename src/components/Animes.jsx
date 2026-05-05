import { animeList } from "../datas/animesData";
import Tournament from "./Tournament";

const Animes = () => {
  return (
    <div className="theme theme_animes">
      <Tournament title="Choose your 8 favorites anime" data={animeList} />
    </div>
  );
};

export default Animes;
