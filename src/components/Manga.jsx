import { mangaList } from "../datas/mangaData";
import Tournament from "./Tournament";

const Manga = () => {
  return (
    <div className="theme theme_manga">
      <Tournament title="Choose your 8 favorites Manga" data={mangaList} />
    </div>
  );
};

export default Manga;
