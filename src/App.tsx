import "./App.css";
import Resulte from "./components/Resulte";
import Search from "./components/Search";
import Unit from "./components/Unit";
import { useEffect, useState } from "react";
import Weather from "./types/Weather";
import MyError from "./types/MyError";

function App() {
  const [currLocation, setCurrLocation] = useState("");
  const [data, setData] = useState<
    Weather | MyError | GeolocationPositionError
  >({
    cod: "500",
    message: "server error",
  } as MyError);
  const [units, setUnits] = useState("metric");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const getData = async () => {
    // בדוק אם יש מיקום מוגדר (או לפי שם או לפי קואורדינטות)
    if ((!lat || !lon) && currLocation === "") return;

    //אם המשתמש חיפש לפי עיר יש לזה העדפה גם אם יש לנו את המיקום הגיאוגרפי שלו
    //אחרת אנחנו מחפשים לפי המיקום שלו
    const url =
      currLocation == ""
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b1b15e88fa797225412429c1c50c122a1&units=${units}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${currLocation}&appid=b1b15e88fa797225412429c1c50c122a1&units=${units}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.cod === "200") return setData(json as Weather);
    setData(json as MyError);
    // let status = json.cod;
    console.log({ json });
  };

  //אחראי על הטעינה הראשונית של המזג אוויר לפי המיקום של המשתמש
  useEffect(() => {
    let latitude: number;
    let longitude: number;
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        (position) => {
          // Get the user's latitude and longitude coordinates
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

          // Do something with the location data, e.g. display on a map
          // console.log(`Latitude: ${latitude}, longitude: ${longitude}`);
          setLat(latitude);
          setLon(longitude);
          return getData();
        },
        // Error callback function
        (error: GeolocationPositionError) => {
          return setData(error as GeolocationPositionError);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
      return setData({
        cod: 1,
        message: "Geolocation is not supported by this browser.",
      } as MyError);
    }
  }, [lat, lon]); //מבצע טעינה ברגע שיש מיקום שמתקבל בטעינת הדף

  //אחראי על טעינת השינויים של המיקום\ שיטת מידה
  useEffect(() => {
    getData();
  }, [currLocation, units]);

  return (
    <div className="center">
      <Search setCurrLocation={setCurrLocation} />
      <Resulte data={data} />
      <Unit setUnits={setUnits} />
    </div>
  );
}

export default App;
