import { videoGamesList } from "../datas/videoGamesData";
import Tournament from "./Tournament";

const Videogames = () => {
  return (
    <div className="theme theme_videogames">
      <Tournament title="Choose your 8 favorites  Video Games" data={videoGamesList} />
    </div>
  )  
};

export default Videogames;