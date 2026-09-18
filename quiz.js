let start = document.querySelector(".start");
let div = document.querySelector(".question-box");
let pQues = document.querySelector(".ques");
let optA = document.querySelector(".A");
let optB = document.querySelector(".B");
let optC = document.querySelector(".C");
let optD = document.querySelector(".D");
let options = document.querySelectorAll(".option");
let submit = document.querySelector(".submit");
let h3 = document.querySelector(".score");
let h1 = document.querySelector("h1");
let restart = document.querySelector(".restart");
let time = document.querySelector("#time");
let resultBox = document.querySelector(".result-box");
let finalResult = document.querySelector(".final-result");
let reviewList = document.querySelector(".review-list");
let resultRestart = document.querySelector(".result-restart");
let historyList = document.querySelector(".history-list");

const quiz = [
    {
        question: "Which keyword is used to declare a variable that can be reassigned?",
        options: ["const","let","static","define"],
        answer: "let",
    },
    {
        question: "Which keyword is used to declare a variable that cannot be reassigned?",
        options: ["const","let","static","define"],
        answer: "const",
    },
    {
        question: "Which symbol is used for a single-line comment in JS?",
        options: ["<!-- --!>","//","/* */","##"],
        answer: "//",
    },
    {
        question: "Which method is used to select an HTML element by its ID?",
        options: ["getElementById()","getElement()","selectById()","queryId()"],
        answer: "getElementById()",
    },
    {
        question: "Which method can be used to select the first HTML element matching a CSS selector?",
        options: ["querySelector()","selectElement()","getSelector()","queryElement()"],
        answer: "querySelector()",
    },
    {
        question: "What does document.querySelector() return if no matching element is found?",
        options: ["0","false","undefined","null"],
        answer: "null",
    },
    {
        question: "Which property is commonly used to change the text inside an HTML element?",
        options: ["textContent","textChange","changeText","innnerHTMLText"],
        answer: "textContent",
    },
    {
        question: "Which method is used to add an event listener to an HTML element?",
        options: ["addEvent()","addEventListener()","createEvent()","listenEvent()"],
        answer: "addEventListener()",
    },
    {
        question: "Which event occurs when a user clicks an HTML element?",
        options: ["press","click","submit","mousePress"],
        answer: "click",
    },
    {
        question: "What does setTimeout() do?",
        options: ["Repeats a function continuously","Executes a function after a specified delay","Stops a function","Executes a function immediately"],
        answer: "Executes a function after a specified delay",
    },
    {
        question: "What does setInterval() do?",
        options: ["Executes a function repeatedly at a specified interval","Executes a function only once","Delays the entire program","Stops an interval"],
        answer: "Executes a function repeatedly at a specified interval",
    },
    {
        question: "Which function is used to stop a setInterval()?",
        options: ["stopInterval()","clearTimeout()","clearInterval()","cancelInterval()"],
        answer: "clearInterval()",
    },
    {
        question: "What is a Promise in JavaScript mainly used for?",
        options: ["Styling HTML elements","Handling asynchronous operations","Creating CSS animations","Declaring variables"],
        answer: "Handling asynchronous operations",
    },
    {
        question: "Which keyword is used to wait for a Promise to settle inside an async function?",
        options: ["wait","pause","await","defer"],
        answer: "await",
    },
    {
        question: "What does an async function always return?",
        options: ["A string","An array","A Promise","An object"],
        answer: "A Promise",
    }
];

// let randIdx = Math.floor(Math.random()*quiz.length); //0 to 14
// let currentQues = randIdx;
let currentQues;
let selectedAns = "";
let score = 0;
let usedQues = [];
let timerId;
let timeLeft;
let questionAnswered = false;
let reviewResults = [];
let quizAnswers = [];
let quizStartTime;
let timeTaken;

function getQuizHistory() {
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

    return history;
}

function displayQuizHistory() {
    const history = getQuizHistory();

    historyList.innerHTML = "";

    if(history.length === 0) {
        historyList.innerText = "No quiz attempts yet! Take your first Quiz!";
        return;
    }

    for(attempt of history) {
        let item = document.createElement("div");
        item.innerText = `
        Score: ${attempt.score}/${attempt.totalQues}
        Percentage: ${attempt.percentage.toFixed(1)}%
        Time Taken: ${attempt.timetaken}s
        Date: ${new Date(attempt.date).toLocaleString()}
        `

        historyList.appendChild(item);
    }
}

function randomQues() {
    let randIdx = Math.floor(Math.random()*quiz.length);

    while(usedQues.includes(randIdx)) {
        randIdx = Math.floor(Math.random()*quiz.length);
    }

    currentQues = randIdx;
    usedQues.push(randIdx);
    getQues();
}

function shuffledOptions(options) {  //Fisher-Yates Shuffle
    for(let i = options.length-1;i>0;i--) {
        let randomIndex = Math.floor(Math.random()*(i+1));

        let temp = options[i];
        options[i] = options[randomIndex];
        options[randomIndex] = temp;
    }

    return options;
}

function getQues() {
    start.style.display = "none";
    div.style.display = "block";
    resultBox.style.display = "none";
    selectedAns = "";
    questionAnswered = false;
    for(let option of options) {
        option.style.backgroundColor = "";
    }

    let copyOptions = [...quiz[currentQues].options];

    shuffledOptions(copyOptions);

    pQues.innerText = quiz[currentQues].question;
    optA.innerText = copyOptions[0];
    optB.innerText = copyOptions[1];
    optC.innerText = copyOptions[2];
    optD.innerText = copyOptions[3];

    startTimer();
}

function startTimer() {
    clearInterval(timerId);

    timeLeft = 15;
    time.innerText = timeLeft;

    timerId = setInterval(function() {
        timeLeft--;
        time.innerText = timeLeft;

        if(timeLeft === 0) {
            if (questionAnswered) {
                return;
            }
            questionAnswered = true;
            score--;
            h3.innerText = `Score ${score}`;
            reviewResults.push({
                question: quiz[currentQues].question,
                selected: "No answer",
                correct: quiz[currentQues].answer
            });
            quizAnswers.push({
                question: quiz[currentQues].question,
                selected: "No answer",
                correct: quiz[currentQues].answer
            });
            clearInterval(timerId);
            endQuiz();
        }
    },1000);
}

function checkAns() {
    for(let option of options) {
        option.addEventListener("click", function() {
            selectedAns = option.innerText;
            for(let otherOption of options) {
                otherOption.style.backgroundColor = "";
            }
            option.style.backgroundColor = "green";
        })
    }

    submit.addEventListener("click", submitAns);
}

function submitAns() {
    if (selectedAns === "") {
        alert("Please select an option first.");
        return;
    }
    if (questionAnswered) {
       return;
    }
    questionAnswered = true;
    if(selectedAns === quiz[currentQues].answer) {
       score++;
    } else {
       score--;
       reviewResults.push({
           question: quiz[currentQues].question,
           selected: selectedAns,
           correct: quiz[currentQues].answer
       });
    }
    quizAnswers.push({
        question: quiz[currentQues].question,
        selected: selectedAns,
        correct: quiz[currentQues].answer
    });
    h3.innerText = `Score ${score}`;
    endQuiz();
}


function endQuiz() {
    clearInterval(timerId);
    if(usedQues.length < quiz.length) {
       randomQues();
    }
    else {
       h1.innerText = "Quiz has finished."
       h3.innerText = "";
       div.style.display = "none";
       timeTaken = (Date.now() - quizStartTime)/1000;
       showResults();
    }
}

function showResults() {
    const quizResult = {
        score: score,
        totalQues: quiz.length,
        answers: quizAnswers,
        attemptId: Date.now(),
        percentage: (score/quiz.length)*100,
        date: new Date().toISOString(),
        timetaken: timeTaken
    }
    // console.log(quizResult);
    
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    history.push(quizResult);
    localStorage.setItem("quizHistory", JSON.stringify(history));

    resultBox.style.display = "block";
    finalResult.innerText = `Final Score: ${score}/${quiz.length}`;
    reviewList.innerHTML = "";

    if(reviewResults.length === 0) {
       reviewList.innerHTML = "<li>Great job! You answered everything correctly.</li>";
       return;
    }

    for(let result of reviewResults) {
       let item = document.createElement("li");
       item.innerText = `${result.question} | Your answer: ${result.selected} | Correct answer: ${result.correct}`;
       reviewList.appendChild(item);
    }
}


checkAns();
start.addEventListener("click", function() {
    quizStartTime = Date.now();
    randomQues();
});
restart.addEventListener("click", function() {
    // currentQues = 1;
    usedQues = [];
    h1.innerText = "Quiz App";
    selectedAns = "";
    score = 0;
    reviewResults = [];
    quizAnswers = [];
    resultBox.style.display = "none";
    h3.innerText = `Score ${score}`;
    quizStartTime = Date.now();
    randomQues();
})

resultRestart.addEventListener("click", function() {
    usedQues = [];
    h1.innerText = "Quiz App";
    selectedAns = "";
    score = 0;
    reviewResults = [];
    quizAnswers = [];
    resultBox.style.display = "none";
    h3.innerText = `Score ${score}`;
    quizStartTime = Date.now();
    randomQues();
})

console.log(getQuizHistory());

let history = getQuizHistory();

for(attempt of history) {
    console.log("score:", attempt.score);
    console.log("attempt:", attempt.attemptId);
    console.log("time-taken:", attempt.timetaken);
    console.log("Percentage:", attempt.percentage);
    console.log("Date:", attempt.date);
    // console.log("score:", attempt.score);
}

console.log(historyList);
console.log(history);

displayQuizHistory();
