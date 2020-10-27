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
  }

  loadTrivia = () => {
    const { currentQuestion } = this.state;
    // need to combine incorrect + correct into a single array
    const choices = data[currentQuestion].incorrect;
    choices.push(data[currentQuestion].correct);
    console.log(choices);

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

  nextQuestion = () => {
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
    for(let i = 0; i < choices.length; i++){
      if(choices[i] === data[currentQuestion].correct){
        update = false;
      }
    }
    if(update === true) {
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

  render() {
    const { questions, options, currentQuestion, userAnswer } = this.state;
    return (
      <div>
        <h2>{questions}</h2>
        <span>{`Question ${currentQuestion +1} of 10`}</span>
        {options.map((option, key) => (
          <p
            className={`ui floating message options ${userAnswer === option ? "selected" : null}`}
            key={key}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}
        <button
          className='ui teal button'
          onClick={this.nextQuestion}>Next</button>
      </div>
    )
  }
}

export default Trivia;