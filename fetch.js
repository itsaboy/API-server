const endpoint = Bun.env.ENDPOINT;
const key = Bun.env.KEY;

let location;
let weather;
let forecast;

let latitude;
let longitude;

const getGeoData = async (data) => {
  console.log("Geolocation API request...");

  location = "";
  weather = "";
  forecast = "";

  if (data.country !== "USA") {
    const req = `${endpoint}/geo/1.0/direct?q=${data.city},${data.country}&appid=${key}`;
    const res = await fetch(req);
    const geoData = await res.json();

    if (res.status === 200 && !geoData[0]) {
      console.log("Geolocation API error: invalid location");
      console.log(`${res.status} status`);
    } else if (res.status === 200) {
      location = {
        country: data.country,
        state: null,
        city: geoData[0].name,
      };

      latitude = geoData[0].lat;
      longitude = geoData[0].lon;

      console.log("Geolocation API success: outside USA");
    } else {
      console.log(`${res.status} status`);
    }
  } else if (data.country === "USA") {
    const req = `${endpoint}/geo/1.0/direct?q=${data.city},${data.state},${data.country}&appid=${key}`;
    const res = await fetch(req);
    const geoData = await res.json();

    if (res.status === 200 && !geoData[0]) {
      console.log("Geolocation API error: invalid location");
      console.log(`${res.status} status`);
    } else if (res.status === 200) {
      location = {
        country: data.country,
        state: data.state,
        city: geoData[0].name,
      };

      latitude = geoData[0].lat;
      longitude = geoData[0].lon;

      console.log("Geolocation API success: inside USA");
    } else {
      console.log(`${res.status} status`);
    }
  }
};

const getCurrentWeather = async (latitude, longitude) => {
  console.log("Current weather API request...");

  const req = `${endpoint}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`;
  const res = await fetch(req);
  const currentData = await res.json();

  if (res.status === 200) {
    weather = currentData;
    console.log("Current weather API success");
  } else {
    console.log("Current weather API error");
    console.log(`${res.status} status`);
  }
};

const getForecast = async (latitude, longitude) => {
  console.log("5-day forecast API request...");

  const req = `${endpoint}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`;
  const res = await fetch(req);
  const forecastData = await res.json();

  if (res.status === 200) {
    forecast = forecastData;
    console.log("5-day forecast API success");
  } else {
    console.log("5-day forecast API error");
    console.log(`${res.status} status`);
  }
};

export {
  getGeoData,
  getCurrentWeather,
  getForecast,
  location,
  weather,
  forecast,
  latitude,
  longitude,
};
