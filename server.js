require("dotenv").config();
const express = require("express");
const weatherData = require("./assets/weather.json");
const cors = require("cors");
const axios = require("axios");
const { response } = require("express");
const server = express();
server.use(cors());
const PORT = process.env.PORT;

class Data {
  constructor(item) {
    (this.datetime = item.datetime),
      (this.description = item.weather.description);
  }
}
// class MovieData {
//   constructor(item) {
//     this.title = item.title,
//       this.img = `https://image.tmdb.org/t/p/w500${item.poster_path}`
//   }
// }

server.get("/", (req, res) => {
  res.send("test route");
});

server.get("/weatherAll", (req, res) => {
  res.send(weatherData);
});

server.get("/weather", (req, res) => {
  const key = process.env.WEATHER_KEY;
  const lat = req.query.lat;
  const lon = req.query.lon;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;
  axios.get(url).then((response) => {
    let result = response.data.data.map((item) => {
      return new Data(item);
    });
    res.send(result);
  });
});

// server.get("/weather", (req, res) => {
//   const lat = req.query.lat;
//   const lon = req.query.lon;
//   console.log(weatherData);
// console.log(lat);
// console.log(lon);

//   if (lat && lon) {


//     try {
//       const reponseData = weatherData.data.map((obj) => new Data(obj));
//       res.json(reponseData);
//     }
//     catch (error) {
//       res.send(error.message);
//     };
//   } else {
//     res.send("please provide a proper lat and lon ");
//   }
// });




server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});