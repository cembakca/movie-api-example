const express = require('express');
const router = express.Router();

//models
const Movie = require('../models/Movie');

//GET All Movies
router.get('/', (req, res, next) => {
  const promise = Movie.find( { });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//GET Top 10 Movies
router.get('/top10', (req, res, next) => {
  //const promise = Movie.find( { }).limit(10).sort({ imdb_score: 1 }); //büyükten küçüğe sıralar.
  const promise = Movie.find( { }).limit(10).sort({ imdb_score: -1 }); //küçükten büyüğe sıralar.

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


//GET A Movie
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie) {
      //hata kodunu kendine göre verip dökümante et.
      next({ message : 'The movie was not found.', code: 10 });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

//PUT (Update) A Movie
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id, 
    req.body,
    {
      //güncelleme sonrası güncel datayı basması için yapıldı.
      new: true
    }
  );

  promise.then((movie) => {
    if(!movie) {
      //hata kodunu kendine göre verip dökümante et.
      next({ message : 'The movie was not found.', code: 10 });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

//DELETE A Movie
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) => {
    if(!movie) {
      //hata kodunu kendine göre verip dökümante et.
      next({ message : 'The movie was not found.', code: 10 });
    }
    res.json({ status : 1 });
  }).catch((err) => {
    res.json(err);
  });
});

//POST A Movie
router.post('/', (req, res, next) => {
  //const { title, category, country, year, imdb_score, date} = req.body;
  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then((data) => {
    res.json({ status: 1});
  }).catch((err) => {
    res.json(err);
  });
  
});

//BETWEEN Movies between two dates
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const { start_year, end_year } = req.params;
  
  const promise = Movie.find(
    { 
      //$gte operatörü büyük veya eşit demek.
      //$lte operatörü küçük veya eşit demek.
      year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
    }
  );

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


module.exports = router;
