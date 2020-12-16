const date = require('./convertToMonth.js');
const pool = require('./index.js')

module.exports = {
  getQuestionCount: (callback) => {
    pool.query(`SELECT COUNT(*) FROM questions;`, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result.rows[0].count);
      }
    })
  },

  getFilteredQuestions: (start, end, callback) => {
    pool.query(`SELECT users.*, questions.* FROM questions INNER JOIN attractions ON questions.attractionID = attractions.id INNER JOIN users ON questions.userID = users.id WHERE questions.id >= ${start} AND questions.id <= ${end};`, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result.rows);
      }
    })
  },
  getAnswers: (questionID, callback) => {
    pool.query(`SELECT users.*, answers.* FROM answers INNER JOIN users ON answers.userID = users.id INNER JOIN questions ON answers.questionsID = questions.id WHERE questions.id = ${questionID} ORDER BY answers.votes DESC;`, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        if (result.rows.length > 0) {
          callback(null, result.rows);
        } else {
          callback(null, questionID);
        }
      }
    })
  },
  insertNewQuestion: (attractionId, info, callback) => {
    pool.query(`SELECT * FROM users WHERE username='${info.username}';`, (err, result) => {
      if (result.rows.length > 0) {
        pool.query(`INSERT INTO questions (userID, text, date, attractionID) VALUES ((SELECT id FROM users WHERE username='${info.username}'), '${info.question}', '${date.convertToMonth(info.date.substring(0, 10).split('-')[1]) + ' ' + info.date.substring(0, 10).split('-')[0]}', ${attractionId});`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, 'Successfully posted question');
          }
        })
      } else {
        pool.query(`INSERT INTO users (username, location, contributions, votes, profilePic) VALUES ('${info.username}', '${info.location}', '${info.contributions}', '${info.votes}', '${info.profilePic}');`, (err, result) => {
          if (err) {
            callback(err, null)
          } else {
            pool.query(`INSERT INTO questions (userID, text, date, attractionID) VALUES ((SELECT id FROM users WHERE username='${info.username}'), '${info.question}', '${date.convertToMonth(info.date.substring(0, 10).split('-')[1]) + ' ' + info.date.substring(0, 10).split('-')[0]}', ${attractionId});`, (err, result) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, 'Successfully added user and posted question');
              }
            })
          }
        })
      }
    })
  },
  insertNewAnswer: (questionId, info, callback) => {
    pool.query(`SELECT * FROM users WHERE username='${info.username}';`, (err, result) => {
      if (result.rows.length > 0) {
        pool.query(`INSERT INTO answers (questionsID, userID, text, votes, voted, date) VALUES ((SELECT id FROM questions WHERE id=${questionId}), (SELECT id FROM users WHERE username='${info.username}'), '${info.answer}', 0, false, '${date.convertToMonth(info.date.substring(0, 10).split('-')[1]) + ' ' + info.date.substring(0, 10).split('-')[0]}');`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.rows);
          }
        })
      } else {
        pool.query(`INSERT INTO users (username, location, contributions, votes, profilePic) VALUES ('${info.username}', '${info.location}', '${info.contributions}', '${info.votes}', '${info.profilePic}');`, (err, result) => {
          if (err) {
            callback(err, null)
          } else {
            pool.query(`INSERT INTO answers (questionsID, userID, text, votes, voted, date) VALUES ((SELECT id FROM questions WHERE id=${questionId}), (SELECT id FROM users WHERE username='${info.username}'), '${info.answer}', 0, false, '${date.convertToMonth(info.date.substring(0, 10).split('-')[1]) + ' ' + info.date.substring(0, 10).split('-')[0]}');`, (err, result) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, result.rows);
              }
            })
          }
        })
      }
    })
  },
  addVote: (answerID, callback) => {
    pool.query(`SELECT voted FROM answers WHERE id=${answerID};`, (err, result) => {
      if (result.rows[0].voted === false) {
        pool.query(`UPDATE answers SET votes = votes + 1, voted = true WHERE id = ${answerID}`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(err, result.rows);
          }
        })
      } else if (result.rows[0].voted === true) {
        callback(null, 'Already voted for this answer!')
      }
    })
  },
  subtractVote: (answerID, callback) => {
    pool.query(`SELECT voted FROM answers WHERE id=${answerID};`, (err, result) => {
      if (result.rows[0].voted === false) {
        pool.query(`UPDATE answers SET votes = votes - 1, voted = true WHERE id = ${answerID}`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(err, result.rows);
          }
        })
      } else if (result.rows[0].voted === true) {
        callback(null, 'Already voted for this answer!')
      }
    })
  },
  getQuestions: (questionId, callback) => {
    pool.query(`SELECT * FROM questions WHERE id=${questionId}`, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result.rows)
      }
    })
  }
}
