import { moviesList } from "../datas/moviesData";
import Tournament from "./Tournament";

const Movies = () => {
  return (
    <div className="theme theme_movies">
      <Tournament title="Choose your 8 favorites Movies" data={moviesList} />
    </div>
  ) 
};

export default Movies;