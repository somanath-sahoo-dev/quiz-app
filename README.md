# Quiz App

A browser-based multiple-choice quiz application built with HTML, CSS and JavaScript, featuring randomized questions and options, timed questions, scoring, and persistent quiz history.

## Features

- Multiple-choice questions
- Positive/negative scoring
- Restart functionality
- Score tracking
- Random order of questions
- Randomized order of options to each question
- 15-second timer for each question
- Persistent quiz history
- Quiz attempts saved using localStorage
- View results of previous quiz attempts
- Individual review of saved attempts
- Close review functionality

## Technologies

- HTML
- CSS
- JavaScript

## How It Works

The quiz stores questions and their options in a JavaScript array of objects.

Questions are selected randomly, and the answer options are shuffled before being displayed.

The user's selected answer is compared with the correct answer stored in the question object, and the score is updated accordingly. If the user selects a wrong option or fails to answer within the specified time, -1 is added to the score.

When the user clicks restart button, the quiz restarts fresh.

After a quiz is completed, the attempt is saved to localStorage.

Each attempt stores information such as:
- Score
- Total questions
- Percentage
- Time taken
- Date of attempt
- Answers selected for each question

The saved attempts are displayed in the Quiz History section.
The user can select "View Result" for any attempt to see its saved answers.


## What I Learned

- DOM manipulation
- Event listeners
- Arrays and objects
- Functions
- Conditional logic
- Managing application state
- Math.random()
- Array manipulation
- Spread syntax
- setInterval()
- clearInterval()
- localStorage
- JSON.stringify() and JSON.parse()
- dataset and data-* attributes
- Array.find()
- Date.now()
- Dynamic DOM element creation
- createElement()
- appendChild()
- CSS Grid and Flexbox