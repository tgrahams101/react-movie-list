// import axios from 'axios';
const axios = require('axios');
// import api_key from './api_key.js';
const api_key = require('./api_key.js');

const getMoviesFromAPI = () => {

  return new Promise( (resolve, reject) => {

    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`;

    axios.get(url)
    .then( (response) => {
      // console.log('FROM API CALL', response);
      resolve(response.data.results);
    })
    .catch( (error) => {
      console.log('ERROR FROM API CALL', error);
      reject(error);
    })
  })
  
}

module.exports = getMoviesFromAPI;
