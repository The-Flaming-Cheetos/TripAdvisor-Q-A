const db = require('./neo4jindex.js')


db.session.writeTransaction((tx) => tx.run(`
LOAD CSV WITH HEADERS FROM "file:///attractions.csv" AS csvLine
CREATE (Attr: Attraction {
  id: toInteger(csvLine.id),
  title: csvLine.title,
  reviewCount: toInteger(csvLine.reviewCount),
  duration: toInteger(csvLine.duration),
  address: csvLine.address,
  hours: csvLine.hours,
  days: csvLine.days,
  description: csvLine.description
})`))
.catch((err)=> console.log(err))
.then((result)=> {
  console.log('Successfully imported attraction data')
  return db.session.writeTransaction((tx) => tx.run(`
  LOAD CSV WITH HEADERS FROM "file:///users.csv" AS csvLine
  CREATE (u: User {
    id: toInteger(csvLine.id),
    user: csvLine.user,
    location: csvLine.location,
    contributions: toInteger(csvLine.contributions),
    votes: toInteger(csvLine.votes),
    profilePic: csvLine.profilePic
  })`))
})
.catch((err) => console.log(err))
.then((result)=> {
  console.log('Successfully imported users data')
  return db.session.writeTransaction((tx) => tx.run(`
  LOAD CSV WITH HEADERS FROM "file:///questions.csv" AS csvLine
  CREATE (q: Question {
    id: toInteger(csvLine.id),
    userID: toInteger(csvLine.userID),
    text: csvLine.text,
    date: csvLine.date,
    attractionID: toInteger(csvLine.attractionID)
  })`))
})
.catch((err) => console.log(err))
.then((result) => {
  console.log('Successfully imported questions data')
  return db.session.writeTransaction((tx) => tx.run(`
  LOAD CSV WITH HEADERS FROM "file:///answers.csv" AS csvLine
  CREATE (a: Answers {
    id: toInteger(csvLine.id),
    questionID: toInteger(csvLine.questionID),
    userID: toInteger(csvLine.userID),
    text: csvLine.text,
    votes: toInteger(csvLine.votes),
    voted: toInteger(csvLine.voted),
    date: csvLine.date
  })`))
})