const faker = require("faker");
const mysql = require("mysql");
const urls = require("./urls.js")

const db = mysql.createConnection({
  user: "root",
  password: "    ",
  database: "questionsAndAnswers"
})



const users = () => {
  for (var i = 0; i < 30; i++) {
    var randomName = faker.name.findName();
    var randomLocation = faker.address.city() + ", " + faker.address.state();
    var numberContributions = faker.random.number(1000);
    var profilePhoto = urls.urls[i];
    db.query(`INSERT INTO users (username, location, contributions, profilePic, votes) VALUES ("${randomName}", "${randomLocation}", "${numberContributions}", "${profilePhoto}", "${faker.random.number(200)}");`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("GREAT SUCCESS")
      }
    })
  }
}

const attractions = () => {
  var randomLocation = faker.address.streetAddress() + ", " + faker.address.city() + ", " + faker.address.state();
  db.query(`INSERT INTO attractions (title, reviewCount, duration, address, hours, days, description) VALUES ("Winchester Mystery House", "${faker.random.number(20)}", "${faker.random.number(10)}", "${randomLocation}", "10:00 AM - 4:00 PM", "Monday - Friday", "${faker.lorem.paragraphs()}");`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("GREAT SUCCESS");
    }
  })
}

const questions = () => {
  for (var i = 0; i < 20; i++) {
    var date = faker.date.past();
    var randomDate = date.toString().split(" ")
    db.query(`INSERT INTO questions (userID, text, date, attractionID) VALUES ("${faker.random.number(29) + 1}", "${faker.lorem.paragraph()}", "${randomDate[1] + ' ' + randomDate[3]}", 1)`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("GREAT SUCCESS");
      }
    })
  }
}

const answers = () => {
  for (var i = 0; i < 100; i++) {
    var randomDate = faker.date.past().toString().split(" ")
    db.query(`INSERT INTO answers (questionsID, userID, text, votes, voted, date) VALUES ("${faker.random.number(19) + 1}", "${faker.random.number(29) + 1}", "${faker.lorem.paragraph()}", "${faker.random.number(50)}", false, "${randomDate[1] + ' ' + randomDate[3]}")`)
  }
}

users();
attractions();
questions();
answers();
console.log("NO ERRORS PRESENT! YAY!")