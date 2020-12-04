DROP DATABASE IF EXISTS questionsAndAnswers;

CREATE DATABASE questionsAndAnswers;

USE questionsAndAnswers;

CREATE TABLE attractions (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200),
  reviewCount INT,
  duration INT,
  address VARCHAR(200),
  hours VARCHAR(200),
  days VARCHAR(200),
  description VARCHAR(2000),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  location VARCHAR(100),
  contributions INT,
  votes INT,
  profilePic VARCHAR(300),
  PRIMARY KEY (id)
);

CREATE TABLE questions (
  id INT NOT NULL AUTO_INCREMENT,
  userID INT,
  text VARCHAR(2000),
  date VARCHAR(100),
  attractionID INT,
  PRIMARY KEY (id),
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (attractionID) REFERENCES attractions(id)
);

CREATE TABLE answers (
  id INT NOT NULL AUTO_INCREMENT,
  questionsID INT,
  userID INT,
  text VARCHAR(2000),
  votes INT,
  voted boolean,
  date VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (questionsID) REFERENCES questions(id),
  FOREIGN KEY (userID) REFERENCES users(id)
);


