const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token, movieId, directorId;

//test

describe('/api/movies tests.', () => {
  before((done)=> {//test başlamadan önce yapılacak işlemler
    chai.request(server)
      .post('/authenticate')
      .send({ username:'tokendeneme', password:'123456' })
      .end((err, res) => {
        token= res.body.token;
        done();
      });
  }); 
  ///GET movies.
  describe('/GET movies.', () => {
    it('It should GET all movies', (done) => {
      chai.request(server)
        .get('/api/movies')
        .set('x-access-token', token) //token'ı ekledik.
        .end((err, res) => {
          res.should.have.status(200);//dönen değer kodu 200 (başarılı anlamında bir kod) olmalı.
          res.body.should.be.a('array'); //dönen değer bir array olmalı demek.
          done();
        });
    });
  });
  ///POST movies.
  describe('/POST movies.', () => {
    it('It should POST a movies', (done) => {
      const movie = {
        title: 'Sakar Şakir',
        director_id: '5add319cbf5f5918df29c14a',
        category: 'Action, Adventure, Komedi',
        country: 'Turkey',
        year: 1980,
        imdb_score: 8.8
      };
      chai.request(server)
        .post('/api/movies')
        .send(movie)
        .set('x-access-token', token) //token'ı ekledik.
        .end((err, res) => {
          res.should.have.status(200);//dönen değer kodu 200 (başarılı anlamında bir kod) olmalı.
          res.body.should.be.a('object'); //dönen değer bir nesne olmalı demek.
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          res.body.should.have.property('imdb_score'); 
          movieId = res.body._id;         
          done();
        });
    });
  });
  //GET/:movie_id movie
  describe('/GET/:movie_id movie', () => {
		it('it should GET a movie by the given id', (done) => {
			chai.request(server)
				.get('/api/movies/'+ movieId)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title');
					res.body.should.have.property('director_id');
					res.body.should.have.property('category');
					res.body.should.have.property('country');
					res.body.should.have.property('year');
					res.body.should.have.property('imdb_score');
					res.body.should.have.property('_id').eql(movieId);
					done();
				});
		});
  });
  //PUT/:movie_id movie
  describe('/PUT/:movie_id movie', () => {
    it('it should PUT a movie by the given id', (done) => {
      const movie = {
        title: 'Davaro',
        director_id: '5add319cbf5f5918df29c14a',
        category: 'Komedi',
        country: 'Turkey',
        year: 1982,
        imdb_score: 9.1
      };
      chai.request(server)
        .put('/api/movies/' + movieId)
        .send(movie)
        .set('x-access-token', token) //token'ı ekledik.
        .end((err, res) => {
          res.should.have.status(200);//dönen değer kodu 200 (başarılı anlamında bir kod) olmalı.
          res.body.should.be.a('object'); //dönen değer bir nesne olmalı demek.
          res.body.should.have.property('title').eql(movie.title);
          res.body.should.have.property('director_id').eql(movie.director_id);
          res.body.should.have.property('category').eql(movie.category);
          res.body.should.have.property('country').eql(movie.country);
          res.body.should.have.property('year').eql(movie.year);
          res.body.should.have.property('imdb_score').eql(movie.imdb_score);
          done();
        });
    });
  });
  //DELETE/:movie_id movie
  describe('/DELETE/:movie_id movie', () => {
    it('it should DELETE a movie by the given id', (done) => {
      const movie = {
        title: 'Davaro',
        director_id: '5add319cbf5f5918df29c14a',
        category: 'Komedi',
        country: 'Turkey',
        year: 1982,
        imdb_score: 9.1
      };
      chai.request(server)
        .delete('/api/movies/' + movieId)
        .send(movie)
        .set('x-access-token', token) //token'ı ekledik.
        .end((err, res) => {
          res.should.have.status(200);//dönen değer kodu 200 (başarılı anlamında bir kod) olmalı.
          res.body.should.be.a('object'); //dönen değer bir nesne olmalı demek.
          res.body.should.have.property('status').eql(1);
          done();
        });
    });
  });
});

describe('/api/directors tests.', () => {
  before((done)=> {
    chai.request(server)
      .post('/authenticate')
      .send({ username:'tokendeneme', password:'123456' })
      .end((err, res) => {
        token= res.body.token;
        done();
      });
  });
  //GET directors
  describe('/GET directors', () => {
    it('It should GET all movies', (done) => {
      chai.request(server)
      .get('/api/directors')
      .set('x-access-token', token)
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.a('object')
        done();
      });
    });
  });
  //POST director
  describe('POST director', () => {
    it('It should POST a movies', (done) => {
      const director = {
        name: 'Gamze',
        surname: 'Bakca',
        bio: 'Turkey',
      };
      chai.request(server)
        .post('/api/directors')
        .send(director)
        .set('x-access-token', token) //token'ı ekledik.
        .end((err, res) => {
          res.should.have.status(200);//dönen değer kodu 200 (başarılı anlamında bir kod) olmalı.
          res.body.should.be.a('object'); //dönen değer bir nesne olmalı demek.
          res.body.should.have.property('status').eql(1);
          directorId = res.body._id;         
          done();
        });
    });
  });

  describe('/GET/:director_id  movie', () => {
	  it('it should GET a director by the given id', (done) => {
		  chai.request(server)
			  .get('/api/directors/' + directorId)
			  .set('x-access-token', token)
			  .end((err, res) => {
          //res.should.have.status(200);
          res.body.should.be.a('object');
				  done();
			  });
	  });
  });
  //PUT/:director_id movie
  describe('/PUT/:movie_id movie', () => {
    it('it should PUT a movie by the given id', (done) => {
      const director = {
        name: 'Sultan',
        surname: 'Bakca',
        bio: 'Turkey',
      };
      chai.request(server)
        .put('/api/directors/' + directorId)
        .send(director)
        .set('x-access-token', token) //token'ı ekledik.
        .end((err, res) => {
          res.should.have.status(200);//dönen değer kodu 200 (başarılı anlamında bir kod) olmalı.
          res.body.should.be.a('object'); //dönen değer bir nesne olmalı demek.
          done();
        });
    });
  });
  //DELETE/:director_id  movie
  describe('/DELETE/:director_id  movie', () => {
    it('it should DELETE a director by the given id', (done) => {
      chai.request(server)
        .delete('/api/directors/' + directorId)
        .set('x-access-token', token) //token'ı ekledik.
        .end((err, res) => {
          res.should.have.status(200);//dönen değer kodu 200 (başarılı anlamında bir kod) olmalı.
          res.body.should.be.a('object'); //dönen değer bir nesne olmalı demek.
          done();
        });
    });
  });
  
});