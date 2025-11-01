import { youtubersList } from "../datas/youtubersData";
import Tournament from "./Tournament";

const Youtubers = () => {
  return (
    <div className="theme theme_youtubers">
      <Tournament title="Choose your 8 favorites Youtubers" data={youtubersList} />
    </div>
  )
};

export default Youtubers;