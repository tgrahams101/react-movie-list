/* drop database if it exists */
DROP DATABASE IF EXISTS movies;
/* create database */
CREATE DATABASE movies;
/* use database */
USE movies;
/* create table movies
  column title is varchar
  column description is varchar
 */
CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description VARCHAR(2555),
  poster_url VARCHAR(1000)
);
