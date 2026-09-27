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
let reviewBox = document.querySelector(".review-box");
let finalResult = document.querySelector(".final-result");
let reviewList = document.querySelector(".review-list");
let resultRestart = document.querySelector(".result-restart");
let historyList = document.querySelector(".history-list");
let closeReview = document.querySelector(".close-review");
let home = document.querySelector(".home");
let dashboard = document.querySelector(".dashboard");
let quizHist = document.querySelector(".quiz-history");
let quizView = document.querySelector(".quiz");
let views = document.querySelectorAll(".view");
let navBtns = document.querySelectorAll(".nav");
let totalAttempts = document.querySelector("#totalAttempts");
let totalQuesAns = document.querySelector("#totalQuesAns")
let correctAns = document.querySelector("#correctAns")
let overallAccuracy = document.querySelector("#overallAccuracy")
let overallPercent = document.querySelector("#overallPercent")
let v1 = document.querySelector("#v1");
let v2 = document.querySelector("#v2");
let v3 = document.querySelector("#v3");
let v4 = document.querySelector("#v4");
let v5 = document.querySelector("#v5");
let scoreCanvas = document.querySelector("#scoreChart");
let timeCanvas = document.querySelector("#timeChart");

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

for(let view of views) {
        view.style.display = "none";
}
home.style.display = "block";


function showView() {
    for(let btn of navBtns) {
        btn.addEventListener("click", function(event) {
                for(let view of views) {
                    view.style.display = "none";
                }
            const btnId = event.target.id;
            const targetDiv = document.querySelector("." + btnId);
            if(targetDiv) {
                targetDiv.style.display = "block";
            }
        });
    };
}

function getDashboardStats() {
    const history = getQuizHistory();

    const totalAttempts = history.length;
    const totalQues = (history.length)*15;
    let totalScore = 0;
    let totalQuesAns = 0;
    let correctAns = 0;
    let timeTaken = [];
    history.forEach(element => {
        for(let i=0;i<element.answers.length;i++) {
            if(element.answers[i].selected !== "No answer") {
                totalQuesAns++;
            }
            if(element.answers[i].selected === element.answers[i].correct) {
                correctAns++;
            }
        }
        totalScore += element.score;
        timeTaken.push(element.timetaken);
    });

    const overallAccuracy = (correctAns/totalQuesAns) * 100;
    const overallPercent = (totalScore/totalQues) * 100;
    const skippedAns = totalQues - totalQuesAns;
    const wrongAns = totalQuesAns - correctAns;

    return  {
        totalAttempts,
        totalQuesAns,
        correctAns,
        overallAccuracy,
        overallPercent,
        skippedAns,
        wrongAns,
        timeTaken
    } 
}

function updateDashboard() {
    const stats = getDashboardStats();

    v1.innerText = stats.totalAttempts;
    v2.innerText = stats.totalQuesAns;
    v3.innerText = stats.correctAns;
    v4.innerText = stats.overallAccuracy.toFixed(1)+"%";
    v5.innerText = stats.overallPercent.toFixed(1)+"%";

    new Chart (scoreCanvas, {
        type: "doughnut",

        data: {
            labels: ["Correct", "Wrong", "Skipped"],
            datasets: [
                {
                data: [stats.correctAns, stats.wrongAns, stats.skippedAns],
                }
            ]
        }
    });

        const attempts = stats.timeTaken.map((_, index) => `Attempt ${index + 1}`);

    new Chart(timeCanvas, {
        type: "line",

        data: {
            labels: attempts,

            datasets: [
                {   
                    label: "Time Taken (seconds)",
                    data: stats.timeTaken
                }
            ]
        }
    });
}



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

    for(let attempt of history) {
        let item = document.createElement("div");
        item.classList.add("history-card");
        let resBtn = document.createElement("button");
        resBtn.classList.add("result-button");
        resBtn.textContent = "View Result";
        resBtn.dataset.attemptId = attempt.attemptId;
        resBtn.addEventListener("click", function () {
            const clickedId = resBtn.dataset.attemptId;
            const selectedAttempt = history.find(function(attempt) {
                return attempt.attemptId === Number(clickedId);
            })
            reviewBox.style.display = "block";
            finalResult.innerText = `
            Score: ${selectedAttempt.score}
            Total Questions: ${selectedAttempt.totalQues}
            `;
            reviewList.innerHTML = "";
            for(let answer of selectedAttempt.answers) {
                let newLi = document.createElement("li");
                newLi.innerText = `
                Question: ${answer.question}
                Selected: ${answer.selected}
                Correct Ans: ${answer.correct}
                `;

                reviewList.appendChild(newLi);
            }
        })
        

        item.innerText = `
        Score: ${attempt.score}/${attempt.totalQues}
        Percentage: ${attempt.percentage.toFixed(1)}%
        Time Taken: ${attempt.timetaken}s
        Date: ${new Date(attempt.date).toLocaleString()}
        `

        historyList.appendChild(item);
        item.appendChild(resBtn);
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
    reviewBox.style.display = "none";
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
    
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    history.push(quizResult);
    localStorage.setItem("quizHistory", JSON.stringify(history));

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
    reviewBox.style.display = "none";
    h3.innerText = `Score ${score}`;
    quizStartTime = Date.now();
    randomQues();
})

closeReview.addEventListener("click", function() {
    reviewBox.style.display = "none";
})

displayQuizHistory();
showView();
updateDashboard();