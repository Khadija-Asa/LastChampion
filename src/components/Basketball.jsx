import { basketballList } from "../datas/basketballData";
import Tournament from "./Tournament";

const Basketball = () => {
  return (
    <div className="theme theme_basketball">
      <Tournament data={basketballList} />
    </div>
  );
};

export default Basketball;
