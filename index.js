import express from "express";
import path from "path";
import cors from "cors";
import {
  getGeoData,
  getCurrentWeather,
  getForecast,
  location,
  weather,
  forecast,
  latitude,
  longitude,
} from "./fetch";

const PORT = Bun.env.PORT;

const app = express();

app.use(cors({ origin: "https://world-wide-weather.com/", crednetials: true }));

app.use(express.static(path.join(import.meta.dir, "/public")));

app.get("/weather", (req, res) => {
  try {
    console.log("New weather API ping:");
    if (req.query.country !== "USA") {
      console.log({
        country: req.query.country,
        city: req.query.city,
      });
    } else if (req.query.country === "USA") {
      console.log({
        country: req.query.country,
        state: req.query.state,
        city: req.query.city,
      });
    }
    getGeoData(req.query).then(() => {
      getCurrentWeather(latitude, longitude).then(() => {
        getForecast(latitude, longitude).then(() => {
          res.status(200).json([location, weather, forecast]);
        });
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`API server listening on port ${PORT}`));
