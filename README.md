# Tandem for 400!

## Introduction

A trivia based game created in React that pulls data from an external JSON file.

## Technologies
* HTML/CSS
* React.js
* JSX
* Javascript
* Semantic UI

## How to run code
* Clone the repo.
* Run `npm i` or `npm install` inside of the project directory to install dependencies
* Run `npm start` to start playing!
  * if `npm start` does not open a tab in your default browser, please go to [http://localhost:3000](http://localhost:3000)

## Issues/Concerns
* After clicking the 'submit' button, both 'submit' and 'next' are displayed. The original intention was to hide the 'submit' button after clicking it.
  * Since the 'submit' button is still present, the user can keep clicking on it to accumulate their score even though they already submitted their answer.
* `componentDidUpdate()` will run multiple times depending on how many times a multiple choice answer is clicked - this could possibly effect performance (?)
* More refactoring can be done.

## Additional Features
These are features I would like to improve upon in the future:
* Question randomizer (it currently goes in order based on the random starting point)
* Applying styles to the multiple choice selection itself to display the correct answer instead of displaying the correct answer in a separate component

