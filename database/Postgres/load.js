const pool = require('./index.js')

const usersPath = __dirname + '/csvData/users.csv';
const attractionsPath = __dirname + '/csvData/attractions.csv';
const questionsPath = __dirname + '/csvData/questions.csv';
const answersPath = __dirname + '/csvData/answers.csv';

console.log(usersPath)
const loadUsers = () => {
  pool.query(`COPY users(username,location,contributions,votes,profilePic) FROM '${usersPath}' DELIMITER '|' CSV HEADER;`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Users Loaded');
    }
  })
}

const loadAttractions = () => {
  pool.query(`COPY attractions(title,reviewCount,duration,address,hours,days,description) FROM '${attractionsPath}' DELIMITER '|' CSV HEADER;`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Attraction Loaded');
    }
  })
}

const loadQuestions = () => {
  pool.query(`COPY questions(userID,text,date,attractionID) FROM '${questionsPath}' DELIMITER '|' CSV HEADER;`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Questions Loaded');
    }
  })
}

const loadAnswers = () => {
  pool.query(`COPY answers(questionsID,userID,text,votes,voted,date) FROM '${answersPath}' DELIMITER '|' CSV HEADER;`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Answers Loaded');
    }
  })
}

// loadAttractions();
// loadUsers();
// loadQuestions();
loadAnswers();
console.log('all data loaded into Postgres')
