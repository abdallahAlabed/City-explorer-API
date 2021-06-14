require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherData = require("./data/weather.json");

const server = express();
server.use(cors());
const PORT = process.env.PORT ;

server.get("/", (req, res) => {
  res.send("This is Home page");
});

server.get("/weather", (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  if (lat == weatherData.lat && lon == weatherData.lon && searchQuery == weatherData.city_name) {
    res.send(weatherData.data);
  } else {
    res.status(500).send("Error, city not found");
  }
});

server.get("*", (req, res) => {
  res.status(404).send("Sorry, this page not found");
});

server.listen(PORT, () => {
  console.log(`Listing on port: ${PORT}`);
});