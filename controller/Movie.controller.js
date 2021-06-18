const axios = require('axios');
const MovieData = require('../models/Movie.model');
require('dotenv').config();

const MovieController = (req, res) => {

    const key = process.env.MOVIE_KEY;
    let cityName = req.query.searchQuery;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${cityName}`;
    axios.get(url).then((response) => {
        console.log(response);
        let result = response.data.results.map((item) => {
            return new MovieData(item)
        });
        res.send(result);
    }).catch((err) => errorHandler(err, res))
}

module.exports = MovieController;