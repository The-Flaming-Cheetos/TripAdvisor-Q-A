const express = require('express');
const app = express();
const db = require('../database/Postgres/model.js');
const port = 3200;
const cors = require('cors')

app.use(express.static("client/dist"));
app.use(express.json());
app.use(cors());


app.get("/api/:attractionId/questions/count", (req, res) => {
  db.getQuestionCount((err, result) => {
    if (err) {
      res.send("Oh no!")
    } else {
      var newObject = {};
      newObject.number = Object.values(result[0])[0];
      var pageLimit = 5;
      var newResult = Math.ceil(Object.values(result[0])[0] / pageLimit);
      var newArray = [];
      for (var i = 1; i <= newResult; i++) {
        newArray.push(i);
      }
      newObject.pages = newArray
      res.send(newObject);
    }
  })
})

app.get("/api/:attractionId/questionsAndAnswers/questions", (req, res) => {
  db.getFilteredQuestions(req.query.start, req.query.end, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result);
    }
  })
})

app.get("/api/:attractionId/questionsAndAnswers/:questionId/answers", (req, res) => {
  let questionId = req.params.questionId
  db.getAnswers(questionId, (err, result) => {
    if (err) {
      console.error(err)
      res.send("No answers for this question!")
    } else {
      var newResult = {};
      newResult.answers = result;
      newResult.showAllAnswers = false;
      var mostVoted = result[0];
      for (var i = 1; i < result.length; i++) {
        if (result[i].votes > mostVoted.votes) {
          mostVoted = result[i];
        }
      }
      newResult.mostVoted = mostVoted;
      res.send(newResult);
    }
  })
})

app.post("/api/:attractionId/questionsAndAnswers/question", (req, res) => {
  let attractionId = req.params.attractionId
  db.insertNewQuestion(attractionId, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
})

app.post("/api/:attractionId/questionsAndAnswers/:questionId/answers", (req, res) => {
  let questionId = req.params.questionId
  db.insertNewAnswer(questionId, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully added an answer");
    }
  })
})

app.put("/api/:attractionId/questionsAndAnswers/:answerId/upVote", (req, res) => {
  let answerId = req.params.answerId
  db.addVote(answerId, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully up-voted");
    }
  })
})

app.put("/api/:attractionId/questionsAndAnswers/:answerId/downVote", (req, res) => {
  let answerId = req.params.answerId
  db.subtractVote(answerId, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully down-voted");
    }
  })
})

app.listen(port, () => {
  console.log("Listening on port " + port);
})




