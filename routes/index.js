const express = require('express');
const router = express.Router();

//şifreleme
const bcrypt = require('bcrypt');

//jsonwebtoken
const jwt = require('jsonwebtoken');


//Models 
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'MovieDB API' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 11).then((hash) => {
    const user = new User({
      username,
      password: hash 
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data)
    }).catch((err) => {
      res.json(err)
    })
  });
});

router.get('/authenticate', (req, res, next) => {
  res.render('form');
});

router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    username
  }, (err, user) => {
    if (err){
      throw err;
    }
    if(!user){
      res.json({
        status: false,
        message: 'Authentication failed, user not found.',
        code: 20
      });
    }else{
      bcrypt.compare(password, user.password).then((result) => {
        if(!result) {
          res.json({
            status: false,
            message: 'Authentication failed, wrong password.',
            code: 21
          });
        }else{
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{
            expiresIn: 720 //token süresi verir (720 dakika: 12 saat)
          });
          // res.json({
          //   status: false,
          //   token
          // })
          res.redirect(`/api/movies/?token=${token}`)
        }
      });
    }

  });
});

module.exports = router;
