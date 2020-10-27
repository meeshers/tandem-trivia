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
    const {currentQuestion} = this.state;
    const choices = data[currentQuestion].incorrect;
    choices.push(data[currentQuestion].correct);
    if(this.state.currentQuestion !== prevState.currentQuestion){
      this.setState(()=>{
        return {
          questions: data[currentQuestion].question,
          answer: data[currentQuestion].correct,
          options: choices,
        }
      })
    }
  }

  checkAnswer = (answer) =>{
    console.log(answer);
  }

  render() {
    const { questions, options } = this.state;
    return (
      <div>
        <h2>{questions}</h2>
        {options.map((option, key) => (
          <p
            className='ui floating message options'
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