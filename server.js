require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
server.use(cors());
const weatherController = require('./controller/Weather.controller');
const movieController = require('./controller/Movie.controller');
const indexController = require('./controller/index.controller');
const PORT = process.env.PORT;



/////////////////////////////////////////////////////////////////////////

server.get("/",indexController);

/////////////////////////////////////////////////////////////////////////

server.get("/weather",weatherController);

/////////////////////////////////////////////////////////////////////////

server.get("/movies",movieController);

/////////////////////////////////////////////////////////////////////////

function errorHandler(err,res){
res.status(500).send("somthing went wrong ",err);
};
/////////////////////////////////////////////////////////////////////////
server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
/////////////////////////////////////////////////////////////////////////