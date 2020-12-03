const mysql = require("mysql");
const date = require("./convertToMonth.js");

const db = mysql.createConnection({
  user: "root",
  password: "    ",
  database: "questionsAndAnswers"
})

module.exports = {
  getQuestionCount: (callback) => {
    db.query(`SELECT COUNT(*) FROM questions;`, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result);
      }
    })
  },

  getFilteredQuestions: (start, end, callback) => {
    db.query(`SELECT users.*, questions.* FROM questions INNER JOIN attractions ON questions.attractionID = attractions.id INNER JOIN users ON questions.userID = users.id WHERE questions.id >= ${start} AND questions.id <= ${end};`, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result);
      }
    })
  },
  getAnswers: (questionID, callback) => {
    db.query(`SELECT users.*, answers.* FROM answers INNER JOIN users ON answers.userID = users.id INNER JOIN questions ON answers.questionsID = questions.id WHERE questions.id = "${questionID}" ORDER BY answers.votes DESC;`, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        if (result.length > 0) {
          callback(null, result);
        } else {
          callback(null, questionID);
        }
      }
    })
  },
  insertNewQuestion: (info, callback) => {
    db.query(`SELECT * FROM users WHERE username="${info.username}";`, (err, result) => {
      if (result.length > 0) {
        db.query(`INSERT INTO questions (userID, text, date, attractionID) VALUES ((SELECT id FROM users WHERE username="${info.username}"), "${info.question}", "${date.convertToMonth(info.date.substring(0, 10).split("-")[1]) + " " + info.date.substring(0, 10).split("-")[0]}", 1);`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, "Successfully posted question");
          }
        })
      } else {
        db.query(`INSERT INTO users (username, location, contributions, votes, profilePic) VALUES ("${info.username}", "${info.location}", "${info.contributions}", "${info.votes}", "${info.profilePic}");`, (err, result) => {
          if (err) {
            callback(err, null)
          } else {
            db.query(`INSERT INTO questions (userID, text, date, attractionID) VALUES ((SELECT id FROM users WHERE username="${info.username}"), "${info.question}", "${date.convertToMonth(info.date.substring(0, 10).split("-")[1]) + " " + info.date.substring(0, 10).split("-")[0]}", 1);`, (err, result) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, "Successfully added user and posted question");
              }
            })
          }
        })
      }
    })
  },
  insertNewAnswer: (info, callback) => {
    db.query(`SELECT * FROM users WHERE username="${info.username}";`, (err, result) => {
      if (result.length > 0) {
        db.query(`INSERT INTO answers (questionsID, userID, text, votes, voted, date) VALUES ((SELECT id FROM questions WHERE id=${Number(info.questionID)}), (SELECT id FROM users WHERE username="${info.username}"), "${info.answer}", 0, false, "${date.convertToMonth(info.date.substring(0, 10).split("-")[1]) + " " + info.date.substring(0, 10).split("-")[0]}");`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result);
          }
        })
      } else {
        db.query(`INSERT INTO users (username, location, contributions, votes, profilePic) VALUES ("${info.username}", "${info.location}", "${info.contributions}", "${info.votes}", "${info.profilePic}");`, (err, result) => {
          if (err) {
            callback(err, null)
          } else {
            db.query(`INSERT INTO answers (questionsID, userID, text, votes, voted, date) VALUES ((SELECT id FROM questions WHERE id=${Number(info.questionID)}), (SELECT id FROM users WHERE username="${info.username}"), "${info.answer}", 0, false, "${date.convertToMonth(info.date.substring(0, 10).split("-")[1]) + " " + info.date.substring(0, 10).split("-")[0]}");`, (err, result) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, result);
              }
            })
          }
        })
      }
    })
  },
  addVote: (answerID, callback) => {
    db.query(`SELECT voted FROM answers WHERE id=${answerID};`, (err, result) => {
      if (result[0].voted === 0) {
        db.query(`UPDATE answers SET votes = votes + 1, voted = true WHERE id = ${answerID}`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(err, result);
          }
        })
      } else if (result[0].voted === 1) {
        callback(null, "Already voted for this answer!")
      }
    })
  },
  subtractVote: (answerID, callback) => {
    db.query(`SELECT voted FROM answers WHERE id=${answerID};`, (err, result) => {
      if (result[0].voted === 0) {
        db.query(`UPDATE answers SET votes = votes - 1, voted = true WHERE id = ${answerID}`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(err, result);
          }
        })
      } else if (result[0].voted === 1) {
        callback(null, "Already voted for this answer!")
      }
    })
  }
}