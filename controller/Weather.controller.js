const axios = require('axios');
const Data = require('../models/Weather.model');
require('dotenv').config();

const weatherController =(req, res) => {
    const key = process.env.WEATHER_KEY;
    const lat = req.query.lat;
    const lon = req.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;
    axios.get(url).then((response) => {
      let result = response.data.data.map((item) => {
        return new Data(item);
      });
      res.send(result);
    }).catch((err)=> errorHandler(err,res))
  }
module.exports = weatherController;