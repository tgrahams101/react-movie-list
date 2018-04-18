const db = require('./index.js');

const insertIntoDB = ({title, description}) => {
  return new Promise ( (resolve, reject) => {
    reject(new Error('Whoops'));
    // description = description.replace(/"/g, '\\"');
    //
    // let query =  `INSERT INTO movies (title, description) VALUES ("${title}", "${description}")`;
    //
    // db.queryAsync(query)
    // .then( (success) => {
    //   console.log('SUCCESS IN INSERTING INTO DATABASE', success);
    //   resolve(true);
    // })
    // .catch( (error) => {
    //   console.log('ERROR IN INSERTING INTO DATABASE', error);
    //   reject(error);
    // })
  });

};

const retrieveAllMoviesFromDB = () => {
  let query = `SELECT * FROM movies`;

  return new Promise( (resolve, reject) => {

    db.queryAsync(query)
    .then( (success, ...args) => {
      console.log('GOT ALL RECORDS FROM THE DATABASE', args.length, success);
      resolve(success)
    })
    .catch( (error) => {
      console.log('ERROR IN GETTING ALL RECORDS FROM THE DATABASE', error);
      throw new Error;
    })
  });

};

module.exports = {
  insertIntoDB,
  retrieveAllMoviesFromDB
}
