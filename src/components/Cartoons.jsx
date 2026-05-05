import { cartoonsList } from "../datas/cartoonsData";
import Tournament from "./Tournament";

const Cartoons = () => {
  return (
    <div className="theme theme_cartoons">
      <Tournament
        title="Choose your 8 favorites Cartoons Characters"
        data={cartoonsList}
      />
    </div>
  );
};

export default Cartoons;
