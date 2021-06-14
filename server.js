require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const weatherData = require('./data/weather.json');
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send('Hello Wolrd');
})

app.get('/weatherAll', (req, res) => {
    res.send(weatherData);
});

app.get('/weather-data', (req, res) => {
    let lat = req.query.lat;
    let lon = req - query.lon;
    let searchQuery = req.query.searchQuery;

    let result = "";

    if (lat == weatherData.lat && lon == weatherData.lon && searchQuery == weatherData.city_name) {
        result = weatherData.data;
    } else {
        result = "error";
    }
    res.send(result);
});
app.listen(PORT, () => {
    console.log(`srever started on ${PORT}`);
});