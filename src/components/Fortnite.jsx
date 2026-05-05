import { fortniteList } from "../datas/fortniteData";
import Tournament from "./Tournament";

const Fortnite = () => {
  return (
    <div className="theme theme_fortnite">
      <Tournament
        title="Choose your 8 favorites Fortnite skins"
        data={fortniteList}
      />
    </div>
  );
};

export default Fortnite;
