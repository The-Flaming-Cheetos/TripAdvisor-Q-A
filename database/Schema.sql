DROP DATABASE IF EXISTS qanda;

CREATE DATABASE qanda;

\c qanda;

CREATE TABLE attractions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  reviewCount smallint,
  duration smallint,
  address VARCHAR(200),
  hours VARCHAR(200),
  days VARCHAR(200),
  description VARCHAR(2000)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  location VARCHAR(100),
  contributions smallint,
  votes smallint,
  profilePic VARCHAR(300)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  userID smallint REFERENCES users,
  text VARCHAR(2000),
  date VARCHAR(100),
  attractionID smallint REFERENCES attractions
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  questionsID smallint REFERENCES questions,
  userID smallint REFERENCES users,
  text VARCHAR(2000),
  votes smallint,
  voted boolean,
  date VARCHAR(100)
);