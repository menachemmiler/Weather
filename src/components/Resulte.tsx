import MyError from "../types/MyError";
import Weather from "../types/Weather";

interface ResultePrpops {
  data: Weather | MyError| GeolocationPositionError;
}

const Resulte = ({ data }: ResultePrpops) => {
  if ("main" in data && (data.cod == 200 || data.cod == "200")) {
    return (
      <div className="resulte">
        <div className="fullWidth">city {data.name}</div>
        <div className="fullWidth">
          description {data.weather[0].description}
        </div>
        <div className="fullWidth">temp {data.main.temp}</div>
        <div className="fullWidth">title {data.weather[0].main}</div>
        <div className="fullWidth">
          icon{" "}
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
        </div>
      </div>
    );
  }

  console.log(data)
  return <div className="resulte">{data.message}</div>;
};

export default Resulte;
