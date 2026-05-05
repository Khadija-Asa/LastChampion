import { yugiohList } from "../datas/yugiohData";
import Tournament from "./Tournament";

const Yugioh = () => {
  return (
    <div className="theme theme_yugioh">
      <Tournament
        title="Choose your 8 favorites Yu-Gi-Oh's card"
        data={yugiohList}
      />
    </div>
  );
};

export default Yugioh;
