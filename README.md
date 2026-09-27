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
- Single-page application (SPA) navigation
- Home / Welcome view
- Quiz view
- Quiz History view
- Developer performance dashboard
- Score analysis visualization
- Time analysis visualization

## Technologies

- HTML
- CSS
- JavaScript
- Chart.js

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
- Single-page application (SPA) architecture
- View switching with JavaScript
- **Data aggregation:** Learned how to process historical quiz data to calculate overall statistics such as total attempts, questions answered, correct, wrong, skipped, accuracy, and overall performance.
- **Derived statistics:** Learned how to calculate meaningful metrics from existing data instead of storing every metric separately.
- **Chart.js:** Learned how to integrate an external JavaScript library using a CDN and create data visualizations with `new Chart()`.
- **Canvas:** Learned the purpose of the `<canvas>` element and how Chart.js uses it to render charts.
- **Data visualization:** Learned how to represent quiz performance using different chart types, including doughnut and line charts.
- **Array methods for data processing:** Used methods such as `forEach()` and `map()` to process historical quiz data and generate chart data dynamically.
- **Dashboard architecture:** Learned how to create a data flow from `localStorage → quiz history → statistics → dashboard UI/charts`.