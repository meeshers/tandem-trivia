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

  render() {
    const { questions, options } = this.state;
    return (
      <div>
        <h2>{questions}</h2>
        {options.map((option, key) => (
          <p key={key}>{option}</p>
        ))}
        <button>Submit</button>
      </div>
    )
  }
}

export default Trivia;