const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//models
const Director = require('../models/Director');

//GET All Directors
router.get('/', (req, res, next) => {
  //JOIN
  const promise = Director.aggregate( [
    {
      $lookup: {
        from: 'movies', //hangi collection?
        localField: '_id', //hangi alanla eşleştireceksin?
        foreignField: 'director_id', //movies collectionunda hangisi ile eşleşecek?
        as:'movies' //hangi değişkene atanacak?
      }
    }, 
    {
      $unwind: 
        {
          path: '$movies',
          preserveNullAndEmptyArrays: true //filmi olmayan yönetmenlerin de listelenmesini sağlar.
        }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        neme: '$_id.name',
        surneme: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies',
      }
    }

  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//GET A Director (and Director's Movies...)
router.get('/:director_id', (req, res, next) => {
  //JOIN
  const promise = Director.aggregate( [
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies', //hangi collection?
        localField: '_id', //hangi alanla eşleştireceksin?
        foreignField: 'director_id', //movies collectionunda hangisi ile eşleşecek?
        as:'movies' //hangi değişkene atanacak?
      }
    }, 
    {
      $unwind: 
        {
          path: '$movies',
          preserveNullAndEmptyArrays: true //filmi olmayan yönetmenlerin de listelenmesini sağlar.
        }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        neme: '$_id.name',
        surneme: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies',
      }
    }

  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//PUT (Update) A Director
router.put('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndUpdate(
    req.params.director_id, 
    req.body,
    {
      //güncelleme sonrası güncel datayı basması için yapıldı.
      new: true
    }
  );

  promise.then((director) => {
    if(!director) {
      //hata kodunu kendine göre verip dökümante et.
      next({ message : 'The director was not found.', code: 11 });
    }
    res.json(director);
  }).catch((err) => {
    res.json(err);
  });
});

//DELETE A Director
router.delete('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);

  promise.then((director) => {
    if(!director) {
      //hata kodunu kendine göre verip dökümante et.
      next({ message : 'The director was not found.', code: 11 });
    }
    res.json({ status : 1 });
  }).catch((err) => {
    res.json(err);
  });
});

//POST A Director 
router.post('/', (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data) => {
    res.json({ status: 1});
  }).catch((err) => {
    res.json(err);
  });
  
});

module.exports = router;
