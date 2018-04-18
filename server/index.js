const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const getMoviesFromAPI = require('../lib/movieAPI.js');
const axios = require('axios');
const db = require('../database/index.js');
const dbMethods = require('../database/dbMethods.js');
const Promise = require('bluebird');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });


app.get('/movies', async (req, res) => {
        try {
          let results = await dbMethods.retrieveAllMoviesFromDB();
          let parsedResults = results.map( (object) => {
            let obj = {};
            obj.title = object.title;
            obj.description = object.description;
            obj.poster_url = object.poster_url;
            return obj;
          });

          res.json(parsedResults);

        } catch(error) {
          res.sendStatus(400);
        }
})

app.post('/movie', async (req, res) => {
  let {title, description} = req.body;
  let confirmedInsertion = false;
  try {
    confirmedBoolean = await dbMethods.insertIntoDB({title, description});
  } catch (error) {
    res.sendStatus(400);
  }

  if (confirmedBoolean) {
    try {
      let movies = await (
        () => {
          return new Promise ((resolve, reject) => {
            axios.get('http://localhost:3000/movies')
              .then( (response) => {
                resolve(response.data);
              })
              .catch( (error) => {
                reject(error);
              })
          })
        })()
      res.json(movies);
    } catch (error) {
    }
  }
  res.sendStatus(400);
})

app.get('/load', async (req, res) => {
  try {
    let results = await getMoviesFromAPI();
    let movies = results.map( (element) => {
       let {title, overview, poster_path} = element;
       return {title, description: overview, poster_url: poster_path};
     });
     
    try {
      let completedArray = await Promise.all(movies.map( ({title, description, poster_url}) => {
            return dbMethods.insertIntoDB({title, description, poster_url });
      }))
      res.json(movies);
    } catch(error) {
     res.sendStatus(404);
    }
  } catch(error) {
    res.sendStatus(404);
  }
})
