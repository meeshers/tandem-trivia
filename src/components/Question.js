import React from 'react';

function Question(props) {
  return (
    <>
      <h2>{props.question}</h2>
      <span>{`Question ${props.counter + 1} of 10`}</span>
    </>
  );
}

export default Question;