const db = require('./index.js');

const insertIntoDB = ({title, description, poster_url}) => {
  return new Promise ( (resolve, reject) => {
    description = description.replace(/"/g, '\\"');

    let query =  `INSERT INTO movies (title, description, poster_url) VALUES ("${title}", "${description}", "${poster_url}")`;

    db.queryAsync(query)
    .then( (success) => {
      resolve(true);
    })
    .catch( (error) => {
      reject(error);
    })
  });

};

const retrieveAllMoviesFromDB = () => {
  let query = `SELECT * FROM movies`;

  return new Promise( (resolve, reject) => {

    db.queryAsync(query)
    .then( (success, ...args) => {
      resolve(success)
    })
    .catch( (error) => {
      throw new Error;
    })
  });

};

module.exports = {
  insertIntoDB,
  retrieveAllMoviesFromDB
}
