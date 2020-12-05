const faker = require('faker');
const { Pool } = require('pg');
const urls = require('./urls.js');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'jasperchen',
  host: 'localhost',
  database: 'qanda',
  port: 5432
})

const usersStream = fs.createWriteStream(path.join(__dirname, 'csvData/users.csv'));
const attractionsStream = fs.createWriteStream(path.join(__dirname, 'csvData/attractions.csv'));
const questionsStream = fs.createWriteStream(path.join(__dirname, 'csvData/questions.csv'));
const answersStream = fs.createWriteStream(path.join(__dirname, 'csvData/answers.csv'));

usersStream.write('username,location,contributions,votes,profilePic \n')
attractionsStream.write('title,reviewCount,duration,address,hours,days,description \n')
questionsStream.write('userid,text,date,attractionid \n')
answersStream.write('questionsid,userid,text,votes,voted,date \n')

const dataIterations = 10000000;

const writeUsers = (writeStream, encoding, callback) => {
  let i = dataIterations;
  let username = faker.name.findName();
  let location = faker.address.city() + ', ' + faker.address.state();
  let contributions = faker.random.number(1000);
  let votes = faker.random.number(200);
  let profilePic = urls.urls[faker.random.number(29)];

  const write = () => {
    let ok = true;
    do {
      i--;
      let user = `${username},${location},${contributions},${profilePic},${votes}\n`;
      if(i === 0){
        writeStream.write(user, encoding, callback)
      } else{
        ok = writeStream.write(user, encoding)
      }
    } while(i > 0 && ok);
    if (i > 0) {
      writeStream.once('drain', write);
    }
  }
  write()
}

const writeAttractions = (writeStream, encoding, callback) => {
  let i = dataIterations;
  let title = 'Winchester Mystery House'
  let reviewCount = faker.random.number(20);
  let duration = faker.random.number(10);
  let address = faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.state();
  let hours = '10:00 AM - 4:00 PM';
  let days = 'Monday - Friday';
  let description = faker.lorem.paragraphs();

  const write = () => {
    let ok = true;
    do {
      i--;
      let attraction = `${title},${reviewCount},${duration},${address},${hours},${days},${description}\n`;
      if(i === 0){
        writeStream.write(attraction, encoding, callback)
      } else{
        ok = writeStream.write(attraction, encoding)
      }
    } while(i > 0 && ok);
    if (i > 0) {
      writeStream.once('drain', write);
    }
  }
  write()
}

const writeQuestions = (writeStream, encoding, callback) => {
  let i = dataIterations;
  let userid = faker.random.number(29) + 1;
  let text = faker.lorem.paragraph();
  let date = faker.date.past();
  let attractionid = 1;

  const write = () => {
    let ok = true;
    do {
      i--;
      let question = `${userid},${text},${date},${attractionid}\n`;
      if(i === 0){
        writeStream.write(question, encoding, callback)
      } else{
        ok = writeStream.write(question, encoding)
      }
    } while(i > 0 && ok);
    if (i > 0) {
      writeStream.once('drain', write);
    }
  }
  write()
}

const writeAnswers = (writeStream, encoding, callback) => {
  let i = dataIterations;
  let questionsid = faker.random.number(19) + 1;
  let userid = faker.random.number(29) + 1;
  let text = faker.lorem.paragraph();
  let votes = faker.random.number(50);
  let voted = false;
  let date = faker.date.past().toString().split(' ');

  const write = () => {
    let ok = true;
    do {
      i--;
      let answer = `${questionsid},${userid},${text},${votes},${voted},${date}\n`;
      if(i === 0){
        writeStream.write(answer, encoding, callback)
      } else{
        ok = writeStream.write(answer, encoding)
      }
    } while(i > 0 && ok);
    if (i > 0) {
      writeStream.once('drain', write);
    }
  }
  write()
}

writeUsers(usersStream, 'utf-8', () => {
  usersStream.end();
  console.log('Users uploaded')
  writeAttractions(attractionsStream, 'utf-8', () => {
    attractionsStream.end();
    console.log('Attractions Uploaded');
    writeQuestions(questionsStream, 'utf-8', () => {
      questionsStream.end();
      console.log('Questions uploaded');
      writeAnswers(answersStream, 'utf-8', () => {
        answersStream.end();
        console.log('Answers uploaded');
      })
    })
  })
})