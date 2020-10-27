import React, { Component } from 'react';
import data from '../data/data.json';

class Trivia extends Component {
  state = {
    counter: 0,
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    answer: null,
    score: 0,
    isEnd: false,
    prevQuestions: [],
    disable: true,
    submitted: false,
    isCorrect: false,
  }

  loadTrivia = () => {
    const { prevQuestions } = this.state;
    //randomize the starting question
    const random = Math.floor(Math.random() * (data.length -1));
    // need to combine incorrect + correct into a single array
    const choices = data[random].incorrect;
    choices.push(data[random].correct);
    this.shuffleOptions(choices);

    // push the question into previous questions to prevent it from being asked again
    prevQuestions.push(data[random]);

    this.setState(() => {
      return {
        disable: true,
        currentQuestion: random,
        questions: data[random].question,
        answer: data[random].correct,
        options: choices,
      }
    })
  }

  //check if the component mounted
  componentDidMount() {
    this.loadTrivia();
  }

  //proceed to the next question relative to starting point
  nextQuestion = () => {
    // push question into the prevQuestions
    const { prevQuestions } = this.state;

    prevQuestions.push(this.state.currentQuestion + 1);

    //need to check if currentQuestion + 1 will go out of bounds
    //if at the end of the json data, set current question to 0th index
    if (this.state.currentQuestion + 1 === data.length) {
      this.setState({
        currentQuestion: 0,
        counter: this.state.counter + 1,
        isCorrect: false,
      })
    } else {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        counter: this.state.counter + 1,
        isCorrect: false,
      })
    }
  }

  //check if component updated
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.score)
    const { currentQuestion } = this.state;

    const choices = data[currentQuestion].incorrect;
    // this logic will prevent the correct answer from being appended every time component is updated on every user click
    let update = true;
    for (let i = 0; i < choices.length; i++) {
      if (choices[i] === data[currentQuestion].correct) {
        update = false;
      }
    }
    if (update === true) {
      choices.push(data[currentQuestion].correct);
      this.shuffleOptions(choices);
    }

    

    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disable: true,
          questions: data[currentQuestion].question,
          answer: data[currentQuestion].correct,
          options: choices,
          submitted: false,
        }
      })
    }
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disable: false,
    })
  }

  confirmAnswer = () =>{
    const { userAnswer, answer, score, submitted} = this.state;

    //increment the score if correct
    if(userAnswer !== answer){
      console.log('incorrect!')
      this.setState({
        submitted: true,
      })
    } else {
      this.setState({
        score: score + 1,
        submitted: true,
        isCorrect: true,
      })
    }
  }

  finishHandler = () => {
    //check if it reached 10 questions
    if (this.state.counter === 9) {
      this.setState({
        isEnd: true,
      })
    }

    //check if the last answer is correct because finish is different from nextQuestion
    if (this.state.userAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1,
      })
    }
  }

  //shuffle the answers
  shuffleOptions = arr => {
    arr.sort(() => Math.random() - 0.5);
  }

  render() {
    const { questions, options, userAnswer, isEnd, score, disable, counter, answer, submitted } = this.state;

    const isRight = this.state.isCorrect;

    //check if the quiz is over
    if (isEnd) {
      return (
        <div>
          <h2>GAME OVER!</h2>
          <p>Your score is {score} out of 10!</p>
        </div>
      )
    }

    return (
      <div>
        <h2>{questions}</h2>
        <span>{`Question ${counter + 1} of 10`}</span>
        {options.map((option, key) => (
          <p
            className={`ui floating message options 
              ${userAnswer === option ? "selected" : null}
              ${answer === option ? "correct" : null}`}
            key={key}
            onClick={() => this.checkAnswer(option)}
            style={{border: isRight ? '2px solid green': '2px solid #5a8bbb'}}
          >
            {option}
          </p>
        ))}

        {/* when submit is clicked, it will check if answer is correct */}
        {counter < 19 && <button
          disabled={disable}
          className='ui teal button submit'
          onClick={this.confirmAnswer}
        >Submit</button>}

        {/* after submit is clicked, show next button when less than 10 */}
        {counter < 9 && submitted === true &&
          <button
            disabled={disable}
            className='ui teal button next'
            onClick={this.nextQuestion}>Next</button>}
        {/* show finish button at last question */}
        {counter === 9 &&
          <button
            disabled={disable}
            className='ui teal button finish'
            onClick={this.finishHandler}
          >Finish</button>}

      </div>
    )
  }
}

export default Trivia;