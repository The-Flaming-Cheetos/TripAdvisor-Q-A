//attractions.csv
id, title, reviewCount, duration, address, hours, days, description

1, Winchester Mystery House, 11, 1, 6416 Clarissa Ville, New Lon, Maryland, 10:00 AM - 4:00 PM, Monday - Friday, Velit tempore distinctio earum

//users.csv
id, user, location, contributions, votes, profilePic

1, Kristy Willms, Wintheisermouth, Pennsylvania, 153, 65, https://tripuserphotos.s3-us-west-1.amazonaws.com/25.jpg

//questions.csv
id, userID, text, date, attractionID

21, 31, is this amazing???, Dec 2020, 1

//answers.csv
id, questionID, userID, text, votes, voted, date

101, 21, 31, duh!, 0, 0, Dec 2020

//Constraints
CREATE CONSTRAINT attractionIdConstraints ON (attraction:Attraction) ASSERT attraction.id IS UNIQUE

CREATE CONSTRAINT userIdConstraint ON (user:User) ASSERT user.id IS UNIQUE

CREATE CONSTRAINT questionIdConstraint ON (question:Question) ASSERT question.id IS UNIQUE

CREATE CONSTRAINT answerIdConstraint ON (answer:Answer) ASSERT answer.id IS UNIQUE

// Indexing
CREATE INDEX FOR (u:User) ON (u.name)

//Loading CSV

//attractions.csv
USING PERIODIC COMMIT 1000
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
})

//users.csv
USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM "file:///users.csv" AS csvLine
CREATE (u: User {
  id: toInteger(csvLine.id),
  user: csvLine.user,
  location: csvLine.location,
  contributions: toInteger(csvLine.contributions),
  votes: toInteger(csvLine.votes),
  profilePic: csvLine.profilePic
})

//questions.csv
USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM "file:///questions.csv" AS csvLine
CREATE (q: Question {
  id: toInteger(csvLine.id),
  userID: toInteger(csvLine.userID),
  text: csvLine.text,
  date: csvLine.date,
  attractionID: toInteger(csvLine.attractionID)
})

//answers.csv
USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM "file:///answers.csv" AS csvLine
CREATE (a: Answers {
  id: toInteger(csvLine.id),
  questionID: toInteger(csvLine.questionID),
  userID: toInteger(csvLine.userID),
  text: csvLine.text,
  votes: toInteger(csvLine.votes),
  voted: toInteger(csvLine.voted),
  date: csvLine.date
})

MATCH (user:User {id: toInteger(csvLine.id)}), (question:Question {userID: toInteger(csvLine.userID)})
CREATE (user)-[:ASKED]->(question)

MATCH (question:Question {attractionID: toInteger(csvLine.attractionID)}), (attraction:Attraction {id: toInteger(csvLine.id)})
CREATE (question)-[:QUESTIONS_ABOUT_ATTRACTION]->(attraction)

MATCH (answer:Answer {questionID: toInteger(csvLine.questionID)}), (question:Question {id: toInteger(csvLine.id)})
CREATE (answer)-[:ANSWER_FOR]->(question)

MATCH (answer:Answer {userID: toInteger(csvLine.userID)}), (user:User {id: toInteger(csvLine.id)})
CREATE (answer)-[:ANSWERED_BY]->(user)