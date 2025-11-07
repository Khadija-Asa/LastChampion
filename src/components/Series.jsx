import { seriesList } from "../datas/seriesData";
import Tournament from "./Tournament";

const Series = () => {
  return (
    <div className=" theme theme_series">
      <Tournament title="Choose your 8 favorites series" data={seriesList} />
    </div>
  )
};

export default Series;