import React from 'react';

function Answer (props) {
  if(props.submitted===true){
    return(
      <p>The correct answer is {props.answer}</p>
    )
  } else {
    return null;
  }
}

export default Answer;