import React from 'react';

function Options(props) {
  return (
    <>
      {props.options.map((option, key) => (
        <p
          className={`ui floating message options 
              ${props.userAnswer === option ? "selected" : null}
              ${props.answer === option ? "correct" : null}`}
          key={key}
          onClick={() => props.checkAnswer(option)}
        >
          {option}
        </p>
      ))}
    </>
  );
}

export default Options;