## Create Questions

Users are able to ask questions regarding the attraction

```POST /api/:attractionId/questionsAndAnswers/question```

### Parameters

None

### Returns

Returns a success message

```javascript
'Successfully posted question'
```
or
```javascript
'Successfully added user and posted question'
```

### Status codes

* **200:** Successfully post the question
* **404:** Unsuccessful attempt due to missing resource

## Create Answers

Users are able to answer any existing questions

```/api/:attractionId/questionsAndAnswers/:questionId/answers```

### Parameters

None

### Returns

Returns a success message

```javascript
'Successfully added an answer'
```

### Status codes

* **200:** Successfully post the answer
* **404:** Unsuccessful attempt due to missing resource

## Update up-votes/down-votes on answers

Users are able to up-vote/down-vote answers.

```PUT /api/:attractionId/questionsAndAnswers/:questionId/upVote```
```PUT /api/:attractionId/questionsAndAnswers/:questionId/downVote```

### Parameters

None

### Returns

Returns a success message

```javascript
'Successfully up-voted'
```
or
```javascript
'Successfully down-voted'
```

### Status codes

* **200:** Successfully post the helpful or not helpful flag
* **404:** Unsuccessful attempt due to missing resource

## Read Questions and Answers

Question and Answers are uploaded once the page is refreshed

```GET /api/:attractionId/questionsAndAnswers/questions```
```GET /api/:attractionId/questionsAndAnswers/questions/answers```

### Parameters

*Questions:*
* *start:* The id of the first review to display
* *end:* The id of the last review to display

*Answers:*
* *questionID:* The id of the question that needs an answer

### Returns

Returns a list of questions and answers.

Questions:
```javascript
[{
  id: 5,
  username: 'Clinton Deckow',
  location: 'Riceport, Nebraska',
  contributions: 697,
  votes: 152,
  profilePic: 'https://tripuserphotos.s3-us-west-1.amazonaws.com/any.jpeg',
  userID: 9,
  text:
    'Eum expedita ad labore iste at libero magni. Doloribus ea quam aliquam cum sint quidem non perspiciatis. Assumenda laudantium enim delectus. Eum sed omnis.',
  date: 'Jan 2020',
  attractionID: 1
}]
```

Answers:
```javascript
[{
  id: 88,
  username: 'Miss Iris Smitham',
  location: 'Jailynchester, Arizona',
  contributions: 92,
  votes: 51,
  profilePic: 'https://tripuserphotos.s3-us-west-1.amazonaws.com/43.jpg',
  questionsID: 1,
  userID: 2,
  text:
  'Nihil aspernatur harum rem optio sunt necessitatibus iusto. Qui illo voluptas sunt provident minus. Eos laboriosam iusto unde repudiandae vitae sed.',
  voted: 1,
  date: 'Aug 2020'
}]
```

### Status codes

* **200:** Successfully post the helpful or not helpful flag
* **404:** Unsuccessful attempt due to missing resource

## Delete Questions and Answers

Users are able to delete questions and answers.


