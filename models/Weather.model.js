
class Data {
    constructor(item) {
      (this.datetime = item.datetime),
        (this.description = item.weather.description);
    }
  }
  module.exports = Data;   