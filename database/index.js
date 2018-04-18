const Promise = require('bluebird');
const mysql = require('mysql');
const Pool = require('mysql/lib/Pool');
const Connection = require('mysql/lib/Connection');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'movies'
});
Promise.promisifyAll(mysql);
Promise.promisifyAll([Pool, Connection]);
const db = Promise.promisifyAll(connection);



db.connectAsync()
  .then( () => {
    console.log('successfully connected!')
  })
  .catch((error) => {
    console.log('ERROR IN CONNECTING', error)
  });

  module.exports = db;
