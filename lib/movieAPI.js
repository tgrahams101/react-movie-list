const axios = require('axios');
const api_key = require('./api_key.js');

const getMoviesFromAPI = () => {

  return new Promise( (resolve, reject) => {

    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`;

    axios.get(url)
    .then( (response) => {
      resolve(response.data.results);
    })
    .catch( (error) => {
      reject(error);
    })
  })

}

module.exports = getMoviesFromAPI;
