import React, { Component } from 'react';
import data from '../data/data.json';

class Trivia extends Component {
  state = {
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    answer: null,
    score: 0,
    isEnd: false,
    prevQuestions: [],
  }

  loadTrivia = () => {
    const { currentQuestion, prevQuestions } = this.state;
    // need to combine incorrect + correct into a single array
    const choices = data[currentQuestion].incorrect;
    choices.push(data[currentQuestion].correct);

    // push the question into previous questions to prevent it from being asked again
    prevQuestions.push(data[currentQuestion]);

    this.setState(() => {
      return {
        questions: data[currentQuestion].question,
        answer: data[currentQuestion].correct,
        options: choices,
      }
    })
  }

  //check if the component mounted
  componentDidMount() {
    this.loadTrivia();
    console.log('mounted');
  }

  //proceed to the next question
  nextQuestion = () => {
    // push question into the prevQuestions
    const { prevQuestions } = this.state;
    prevQuestions.push(data[this.state.currentQuestion + 1]);
    // console.log(prevQuestions)

    // need to check if answers are correct
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
    console.log(this.state.currentQuestion);
  }

  //check if component updated
  componentDidUpdate(prevProps, prevState) {
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
    }

    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          questions: data[currentQuestion].question,
          answer: data[currentQuestion].correct,
          options: choices,
        }
      })
    }
    console.log('updated');
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
    })
  }

  finishHandler = () => {
    if(this.state.currentQuestion === 9) {
      this.setState({
        isEnd: true,
      })
    }
  }

  render() {
    const { questions, options, currentQuestion, userAnswer, isEnd, score } = this.state;

    if(isEnd){
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
        <span>{`Question ${currentQuestion + 1} of 10`}</span>
        {options.map((option, key) => (
          <p
            className={`ui floating message options ${userAnswer === option ? "selected" : null}`}
            key={key}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}

        {/* show next button when less than 10 */}
        {currentQuestion < 9 &&
          <button
            className='ui teal button'
            onClick={this.nextQuestion}>Next</button>}
        {/* show finish button at last question */}
        {currentQuestion === 9 &&
          <button 
          className='ui teal button'
          onClick={this.finishHandler}
          >Finish</button>}

      </div>
    )
  }
}

export default Trivia;