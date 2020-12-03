const express = require('express');
const app = express();
const db = require('../database/index.js');
const port = 3200;
const cors = require('cors')

app.use(express.static("client/dist"));
app.use(express.json());
app.use(cors());

// app.get("/api/trips/questionsAndAnswers", (req, res) => {
//   res.sendFile("../client/dist/bundle.js");
// })

app.get("/api/trips/questionsAndAnswers/count", (req, res) => {
  console.log(req.body);
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

app.get("/api/trips/questionsAndAnswers/questions", (req, res) => {
  db.getFilteredQuestions(req.query.start, req.query.end, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result);
    }
  })
})

app.get("/api/trips/questionsAndAnswers/answers", (req, res) => {
  db.getAnswers(req.query.questionID, (err, result) => {
    if (err) {
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
      console.log(newResult)
      res.send(newResult);
    }
  })
})

app.post("/api/trips/questionsAndAnswers/add", (req, res) => {
  db.insertNewQuestion(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
})

app.post("/api/trips/questionsAndAnswers/addAnswer", (req, res) => {
  db.insertNewAnswer(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully added an answer");
    }
  })
})

app.put("/api/trips/questionsAndAnswers/addVote", (req, res) => {
  db.addVote(req.body.answerID, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully up-voted");
    }
  })
})

app.put("/api/trips/questionsAndAnswers/subtractVote", (req, res) => {
  db.subtractVote(req.body.answerID, (err, result) => {
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




