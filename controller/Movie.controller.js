const axios = require('axios');
const MovieData = require('../models/Movie.model');
require('dotenv').config();
const Cache = require('../helper/Cache');
const errorHandler= require('../helper/ErrorHandler');
const cacheObj = new Cache();

const MovieController = (req, res) => {

    const key = process.env.MOVIE_KEY;
    let cityName = req.query.searchQuery;
    const requestKey = `movie-${cityName}`;

    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 86400000)) {
       console.log("bandura");
        res.json(cacheObj[requestKey]);
    } else {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${cityName}`;
    axios.get(url).then((response) => {
        let result = response.data.results.map((item) => {
            return new MovieData(item)
        });
        cacheObj[requestKey]= result;
        cacheObj[requestKey].timestamp = Date.now();
        res.send(result);
    }).catch((err)=> errorHandler(err,res))
}
}
module.exports = MovieController;



// const axios = require('axios');
// const MovieData = require('../models/Movie.model');
// require('dotenv').config();

// const MovieController = (req, res) => {

//     const key = process.env.MOVIE_KEY;
//     let cityName = req.query.searchQuery;

//     let url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${cityName}`;
//     axios.get(url).then((response) => {
//         console.log(response);
//         let result = response.data.results.map((item) => {
//             return new MovieData(item)
//         });
//         res.send(result);
//     }).catch((err) => errorHandler(err, res))
// }

// module.exports = MovieController;