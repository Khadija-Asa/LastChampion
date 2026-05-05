import { esportList } from "../datas/esportData";
import Tournament from "./Tournament";

const Esport = () => {
  return (
    <div className="theme theme_esport">
      <Tournament
        title="Choose your 8 favorites E-Sport Teams"
        data={esportList}
      />
    </div>
  );
};

export default Esport;
