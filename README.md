# Quiz App

A simple multiple-choice quiz application built with HTML, CSS and JavaScript.

## Features

- Multiple-choice questions
- Positive/negative scoring
- Restart functionality
- Score tracking
- Random order of questions
- Randomized order of options to each question
- 15-second Timer for each question

## Technologies

- HTML
- CSS
- JavaScript

## How It Works

The quiz stores questions and their options in a JavaScript array of objects.

Questions are selected randomly, and the answer options are shuffled before being displayed.

The user's selected answer is compared with the correct answer stored in the question object, and the score is updated accordingly. If the user selects a wrong option or doesn't select an option within the specified time, -1 gets added to the score.

When the user clicks restart button, the quiz restarts fresh.


## What I Learned

- DOM manipulation
- Event listeners
- Arrays and objects
- Functions
- Conditional logic
- Managing application state
- Math.random()
- Array manipulation
- Array destructuring/spread syntax
- setInterval()
- clearInterval()