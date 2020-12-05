import React from 'react';
import axios from 'axios';
import QuestionList from './components/QuestionList.jsx';
import AskQuestion from './components/AskQuestion.jsx';
import styled, { css } from 'styled-components';
import "../dist/styles.css";

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  margin: 20px;
  padding: 10px;
  background-color: white;
  width: 900px;
  form {
    float:right;
  }
  .description {
    font-weight: 800
  }
  button {
    font-size: 24px;
    font-weight: 800;
  }
  .questionButton {
    top: 0px;
    right: 0px;
    padding: 8px 16px;
    font-weight: 700;
    font-family: inherit;
    border: 1px solid transparent;
    border-radius: 2px;
    background-clip: padding-box;
    box-sizing: border-box;
    font-size: 14px;
    text-align: center;
    border-color: #000;
    border-radius: 3px;
    background-color: #000;
    color: #fff;
  }
  .answerModalButton {
    padding: 8px 8px;
    font-weight: 700;
    font-family: inherit;
    border: 1px solid transparent;
    border-radius: 2px;
    background-clip: padding-box;
    box-sizing: border-box;
    font-size: 14px;
    text-align: center;
    border-color: #000;
    border-radius: 3px;
    z-index: 1;
  }
`

const Buttons = styled.div`
  border: 1px solid gray;
  margin: 20px;
  padding: 10px;
  background-color: white;
  width: 900px;
  text-align: center;
  .buttonNames {
    font-size: 24px;
    font-weight: 800;
  }
  .previous {
    padding: 8px 16px;
    font-weight: 700;
    font-family: inherit;
    border: 1px solid transparent;
    border-radius: 2px;
    background-clip: padding-box;
    box-sizing: border-box;
    font-size: 14px;
    text-align: center;
    border-color: #000;
    border-radius: 3px;
    background-color: #000;
    color: #fff;
    float: left;
  }
  .next {
    top: 0px;
    right: 0px;
    padding: 8px 16px;
    font-weight: 700;
    font-family: inherit;
    border: 1px solid transparent;
    border-radius: 2px;
    background-clip: padding-box;
    box-sizing: border-box;
    font-size: 14px;
    text-align: center;
    border-color: #000;
    border-radius: 3px;
    background-color: #000;
    color: #fff;
    float: right;
  }
`


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      totalQuestions: 0,
      questionToInsert: "",
      answerToInsert: "",
      pageLimit: 5,
      pages: [],
      answers: {},
      showAllAnswers: {},
      mostVoted: {},
      showFollow: {},
      showAnswerModal: {},
      showGuidelines: false,
      askQuestion: false,
      currentPage: 1
    }

    this.getQuestionsAndAnswers = this.getQuestionsAndAnswers.bind(this);
    this.changePage = this.changePage.bind(this);
    this.showAll = this.showAll.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.showAnswerModal = this.showAnswerModal.bind(this);
    this.nextOrPrevious = this.nextOrPrevious.bind(this);
    this.askQuestion = this.askQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.changeAnswer = this.changeAnswer.bind(this);
    this.changeVote = this.changeVote.bind(this);
  }

  // Insert Methods

  addQuestion() {
    axios.post("/api/1/questionsAndAnswers/question", {
      question: this.state.questionToInsert,
      username: "albertollini",
      location: "San Francisco, CA",
      profilePic: "https://artists.ultramusicfestival.com/wp-content/uploads/2018/05/illenium-2019.jpg",
      contributions: 172,
      votes: 50,
      date: new Date()
    })
    .then((result) => {
      console.log(result.data);
    })
  }

  changeQuestion(event) {
    this.setState({
      questionToInsert: event.target.value
    })
  }

  addAnswer(event) {
    axios.post(`/api/1/questionsAndAnswers/${event.target.name}/answers`, {
      answer: this.state.answerToInsert,
      username: "albertollini",
      location: "San Francisco, CA",
      profilePic: "https://artists.ultramusicfestival.com/wp-content/uploads/2018/05/illenium-2019.jpg",
      contributions: 172,
      votes: 50,
      date: new Date()
    })
    .then((result) => {
      var newAnswerModalObject = this.state.showAnswerModal;
      newAnswerModalObject[event.target.name] = false;
      this.setState({
        showAnswerModal: newAnswerModalObject
      })
      event.preventDefault();
    })
  }

  changeAnswer(event) {
    this.setState({
      answerToInsert: event.target.value
    })
  }

  changeVote(event) {
    if (event.target.id === "increase") {
      axios.put(`/api/1/questionsAndAnswers/${event.target.name}/upVote`)
      .then((result) => {
        this.getQuestionsAndAnswers(this.state.currentPage);
      })
    } else {
      axios.put(`/api/1/questionsAndAnswers/${event.target.name}/downVote`)
      .then((result) => {
        this.getQuestionsAndAnswers(this.state.currentPage);
      })
    }
  }

  // Toggles for Following/Reporting and Answers

  toggleFollow(event) {
    var newFollowObject = this.state.showFollow;
    newFollowObject[event.target.name] = !newFollowObject[event.target.name]
    this.setState({
      showFollow: newFollowObject
    })
  }

  showAll(event) {
    var showAllObject = this.state.showAllAnswers;
    showAllObject[event.target.name] = !showAllObject[event.target.name];
    this.setState({
      showAllAnswers: showAllObject
    })
  }

  // Modals

  askQuestion(event) {
    if (!this.state.askQuestion) {
      this.setState({
        askQuestion: true
      })
      event.preventDefault();
    }
  }

  showAnswerModal(event) {
    var newAnswerModalObject = this.state.showAnswerModal;
    newAnswerModalObject[event.target.name] = true;
    this.setState({
      showAnswerModal: newAnswerModalObject
    })
  }

  // Change pages

  changePage(event) {
    this.getQuestionsAndAnswers(event.target.innerHTML);
  }


  nextOrPrevious(event) {
    if (event.target.name === "previous") {
      if (Number(this.state.currentPage) > 1) {
        this.getQuestionsAndAnswers(this.state.currentPage - 1);
      }
    } else {
      if (this.state.currentPage < this.state.pages.length) {
        // this.getQuestionsAndAnswers(this.state.currentPage + 1);
      }
    }
  }

  // Main method

  getQuestionsAndAnswers(event) {
    if (event !== undefined) {
      var idStartPoint = 1 + (this.state.pageLimit * (Number(event) - 1));
      this.setState({
        currentPage: Number(event)
      })
    } else {
      var idStartPoint = this.state.currentPage;
    }
    axios.get("/api/1/questionsAndAnswers/questions", {
      params: {
        start: idStartPoint,
        end: idStartPoint + (this.state.pageLimit - 1),
      }
    })
    .then((result) => {
      this.setState({
        questions: result.data,
      })
      for (var i = 0; i < this.state.questions.length; i++) {
        axios.get(`/api/1/questionsAndAnswers/${this.state.questions[i].id}/answers`)
        .then((result) => {
          var newAnswers = this.state.answers;
          newAnswers[result.data.answers[0].questionsid] = result.data.answers;
          var mostVotedObject = this.state.mostVoted;
          mostVotedObject[result.data.answers[0].questionsid] = result.data.mostVoted
          var showFollowObject = this.state.showFollow;
          showFollowObject[result.data.answers[0].questionsid] = false;
          var showAnswerModalObject = this.state.showAnswerModal;
          showAnswerModalObject[result.data.answers[0].questionsid] = false;
          var showAllObject = this.state.showAllAnswers;
          showAllObject[result.data.answers[0].questionsid] = false;
          this.setState({
            answers: newAnswers,
            mostVoted: mostVotedObject,
            showAllAnswers: showAllObject,
            showFollow: showFollowObject,
            showAnswerModal: showAnswerModalObject
          })
        })
      }
    })
  }

  componentDidMount() {
    axios.get("/api/1/questions/count")
    .then((result) => {
      this.setState({
        pages: result.data.pages,
        totalQuestions: result.data.number
      })
      this.getQuestionsAndAnswers();
    })
  }

  render() {
    return (
      <Questions>
        <Header>
          <h1>Questions & Answers</h1>
          <span className="description">See all {this.state.totalQuestions} Questions</span>
          <form>
            <button className="questionButton" onClick={this.askQuestion}>Ask a Question</button>
            <button className="answerModalButton"><img width="18" height="15" src="https://img.icons8.com/fluent-systems-regular/24/000000/sort-down.png"/></button>
          </form>
        </Header>
        <QuestionList changeVote={this.changeVote} addAnswer={this.addAnswer} changeAnswer={this.changeAnswer} showAnswerModal = {this.state.showAnswerModal} toggleAnswerModal = {this.showAnswerModal} toggleFollow={this.toggleFollow} showFollow={this.state.showFollow} mostVoted={this.state.mostVoted} showAllAnswers={this.state.showAllAnswers} showAll={this.showAll} answers={this.state.answers} questions = {this.state.questions}/>
        {this.state.askQuestion
        ? <AskQuestion addQuestion={this.addQuestion} questionToInsert={this.state.questionToInsert} changeQuestion={this.changeQuestion} attraction={{title: "Winchester Mystery House"}}/>
        : <div></div>}
        <Buttons>
          <button onClick={this.nextOrPrevious} className="previous" name = "previous">Previous</button>
          {this.state.pages.map(page =>
            <button className="buttonNames" onClick={this.changePage}>{page}</button>
          )}
          <button onClick={this.nextOrPrevious} className="next" name = "next">Next</button>
        </Buttons>
      </Questions>
    )
  }
}

export default App;