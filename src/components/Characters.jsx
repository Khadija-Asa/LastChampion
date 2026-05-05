import { charactersList } from "../datas/charactersData";
import Tournament from "./Tournament";

const Characters = () => {
  return (
    <div className=" theme theme_characters">
      <Tournament
        title="Choose your 8 favorites Characters"
        data={charactersList}
      />
    </div>
  );
};

export default Characters;
