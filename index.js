import express from "express";
import path from "path";
import dayjs from "dayjs";
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

const approvedOrigins = [
  "https://world-wide-weather.com/",
  "https://www.api-of-all-trades.net/",
];

const callLogs = [];

const PORT = Bun.env.PORT;

const app = express();

app.use(cors({ origin: approvedOrigins, crednetials: true }));

app.use(express.static(path.join(import.meta.dir, "/public")));

app.get("/weather", (req, res) => {
  try {
    if (req.query.country !== "USA") {
      callLogs.push({
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        country: req.query.country,
        state: null,
        city: req.query.city,
      });
    } else if (req.query.country === "USA") {
      callLogs.push({
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        country: req.query.country,
        state: req.query.state,
        city: req.query.city,
      });
    } else {
      callLogs.push({
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        test: "Invalid query",
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

app.get("/logs", (req, res) => {
  console.log(req.query);
  if (
    req.query.user === Bun.env.USERNAME &&
    req.query.pass === Bun.env.PASSWORD
  ) {
    res.status(200).json(callLogs);
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.listen(PORT, () => console.log(`API server listening on port ${PORT}`));
