const mongoose = require('mongoose');


module.exports = () => {
  mongoose.connect("mongodb://movie_user:123456@ds253959.mlab.com:53959/movie-api", {useMongoClient: true})
  mongoose.connection.on('open', () => {
    //console.log("MongoDB connected!");
  });
  mongoose.connection.on('error', (err) => {
    console.log("MongoDB error:", err);
  });

  mongoose.Promise = global.Promise;
}