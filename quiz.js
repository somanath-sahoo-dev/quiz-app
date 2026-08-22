let start = document.querySelector(".start");
let div = document.querySelector(".question-box");
let pQues = document.querySelector(".ques");
let optA = document.querySelector(".A");
let optB = document.querySelector(".B");
let optC = document.querySelector(".C");
let optD = document.querySelector(".D");
let options = document.querySelectorAll(".option");
let submit = document.querySelector(".submit");
let h3 = document.querySelector("h3");
let h1 = document.querySelector("h1");
let restart = document.querySelector(".restart");

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

function randomQues() {
    let randIdx = Math.floor(Math.random()*quiz.length);

    while(usedQues.includes(randIdx)) {
        randIdx = Math.floor(Math.random()*quiz.length);
    }

    currentQues = randIdx;
    usedQues.push(randIdx);
    getQues();
}

function getQues() {
    start.style.display = "none";
    div.style.display = "block";
    selectedAns = "";
    for(let option of options) {
        option.style.backgroundColor = "";
    }
    pQues.innerText = quiz[currentQues].question;
    optA.innerText = quiz[currentQues].options[0];
    optB.innerText = quiz[currentQues].options[1];
    optC.innerText = quiz[currentQues].options[2];
    optD.innerText = quiz[currentQues].options[3];


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
    if(selectedAns === quiz[currentQues].answer) {
        score++;
    } else {
        score--;
    }
    h3.innerText = `Score ${score}`;
    // currentQues++;
    endQuiz();
}


function endQuiz() {
    if(usedQues.length < quiz.length) {
        randomQues();
    }
     else {
        h1.innerText = "Quiz has finished."
        h3.innerText = `Final Score is ${score}/${quiz.length}`;
        div.style.display = "none";
    }
}


checkAns();
start.addEventListener("click", randomQues);
restart.addEventListener("click", function() {
    // currentQues = 1;
    usedQues = [];
    h1.innerText = "Quiz App";
    selectedAns = "";
    score = 0;
    h3.innerText = `Score ${score}`;
    randomQues();
})



