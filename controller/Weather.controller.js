const axios = require('axios');
const Data = require('../models/Weather.model');
require('dotenv').config();
const Cache = require('../helper/Cache');
const errorHandler= require('../helper/ErrorHandler');

const cacheObj = new Cache();

const weatherController =(req, res) => {
    const key = process.env.WEATHER_KEY;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const requestKey = `weather-${lat}-${lon}`;
    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 86400000)) {
      console.log("btata");
        res.send(cacheObj[requestKey]);
   }  else {
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;
    axios.get(url).then((response) => {
      let result = response.data.data.map((item) => {
        return new Data(item);
      });
      cacheObj[requestKey] = result;
      cacheObj[requestKey].timestamp = Date.now();
      res.send(result);
    }).catch((err)=> errorHandler(err,res))
  }
}
module.exports = weatherController;








// const axios = require('axios');
// const Data = require('../models/Weather.model');
// require('dotenv').config();

// const weatherController =(req, res) => {
//     const key = process.env.WEATHER_KEY;
//     const lat = req.query.lat;
//     const lon = req.query.lon;
//     let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;
//     axios.get(url).then((response) => {
//       let result = response.data.data.map((item) => {
//         return new Data(item);
//       });
//       res.send(result);
//     }).catch((err)=> errorHandler(err,res))
//   }
// module.exports = weatherController;



