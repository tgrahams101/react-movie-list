const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const getMoviesFromAPI = require('../lib/movieAPI.js');
const axios = require('axios');
const db = require('../database/index.js');
const dbMethods = require('../database/dbMethods.js');
const Promise = require('bluebird');

let movies = [
  {
    title: 'Black Panther',
    description: 'Wakanda is seeing the spotlight'
  },
  {
    title: 'Hunger Games',
    description: 'Which district is next'
  },
  {
    title: 'Maze Runner 2',
    description: 'Got to watch the sequel'
  }
]
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });


app.get('/movies', async (req, res) => {
  console.log('HIT THE GET MOVIES ROUTE!');
  // axios.get('http://localhost:3000/load')
  //   .then( (results) => {
  //     console.log(Array.isArray(results.data));
  //     let {data} = results;
  //     movies = data.map( (element) => {
  //       let {title, overview} = element;
  //       return {title, description: overview};
  //     });
  //
  //     res.json(movies);
  //   })
  //   .catch( (error) => {
  //     console.log('ERROR IN MOVIES ROUTE', error);
  //     res.sendStatus(404);
  //   })

    //PRIMITIVE VERSION
    // axios.get('http://localhost:3000/load')
    //   .then( async (response) => {
    //     movies = response.data.map( (element) => {
    //       let {title, overview} = element;
    //       return {title, description: overview};
    //     });
    //     console.log('THE MOVIES', movies);
        // console.log('MOVIES', movies);
        // let result = await Promise.all(
        //   movies.map(({title, description}) => {
        //   return dbMethods.insertIntoDB({title, description});
        //   })
        // );

        // *******************************NEED TO RUN FOLLOWING BLOCK TO INSERT INTO DB
        // try {
        //   movies.forEach( ({title, description}) => {
        //     dbMethods.insertIntoDB({title, description});
        //   });
        //   res.json(movies);
        // //
        // } catch(error) {
        //   console.log('CAUGHT ERROR IN HIGHER ORDER FUNCTION', error);
        //   res.sendStatus(404);
        //
        // }
        // ********************************************
        // console.log('RESULT FROM PROMISIFYING ALL', result);
        // IGNORE LINE ABOVE...APPARENTLY EXPRESS DOESNT THROW ERROR WHEN YOU HAVE AN UNDEFINED VARIABLE
        try {
          let results = await dbMethods.retrieveAllMoviesFromDB();
          let parsedResults = results.map( (object) => {
            console.log('THE ROW OBJECT', object.title);
            let obj = {};
            obj.title = object.title;
            obj.description = object.description;
            return obj;
            // return {object.title, object.description};
          });
          console.log('RESULTS AFTER AWAITING FOR RETRIEVAL OF MOVIES RECORDS', parsedResults);
          res.json(parsedResults);
        } catch(error) {
          res.sendStatus(400);
        }


      // })
      // .catch( (error) => {
      //   res.send(400);
      // })

})

app.post('/movie', async (req, res) => {
  console.log('HIT THE POST MOVIES ROUTE', req.body, req.query);
  let {title, description} = req.body;
  let confirmedInsertion = false;
  try {
    confirmedBoolean = await dbMethods.insertIntoDB({title, description});
  } catch (error) {
    console.log('THIS CATCH BLOCK')
    res.sendStatus(400);
  }
  // movies.push({title, description});
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
      console.log('AFTER CONFIRMED BOOLEAN', movies);
      res.json(movies);
    } catch (error) {
    }
  }
  console.log('THIRD CATCH BLOCK');
  res.sendStatus(400);
})

app.get('/load', async (req, res) => {
  try {
    let results = await getMoviesFromAPI();
    // console.log('IN THE LOAD METHOD', Array.isArray(results), results);
    // ;
    let movies = results.map( (element) => {
       let {title, overview} = element;
       return {title, description: overview};
     });
    try {
     // Promise.all(movies.map( ({title, description}) => {
     //   return dbMethods.insertIntoDB({title, description});
     // }))
     //  .then( (collection) => {
     //    console.log('COLLECTION OF PROMISES', collection);
     //    res.json(movies);
     //  })

    //

      let completedArray = await Promise.all(movies.map( ({title, description}) => {
            return dbMethods.insertIntoDB({title, description});
      }))
      console.log('COMPLETED ARRAY BRO', completedArray);
      res.json(movies);
    } catch(error) {
     console.log('CAUGHT ERROR IN HIGHER ORDER FUNCTION', error);
     res.sendStatus(404);
    }
  } catch(error) {
    res.sendStatus(404);
  }
})
