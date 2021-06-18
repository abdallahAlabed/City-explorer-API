
class MovieData {
    constructor(item) {
      this.title = item.title,
        this.img = `https://image.tmdb.org/t/p/w500${item.poster_path}`
        this.overview = item.overview,
        this.vote_average = item.vote_average,
        this.popularity = item.popularity
    }
  }

  module.exports = MovieData; 