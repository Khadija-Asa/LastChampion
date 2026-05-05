import { onepieceList } from "../datas/onePieceData";
import Tournament from "./Tournament";

const Onepiece = () => {
  return (
    <div className="theme theme_onepiece">
      <Tournament
        title="Choose your 8 favorites One Piece characters"
        data={onepieceList}
      />
    </div>
  );
};

export default Onepiece;
