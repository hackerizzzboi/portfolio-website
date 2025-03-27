alert("याद गर्नुहोस मित्रहरु याद गर्नुहोस, जेठ ३। समय धेरै छैन है 🎈")

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreContainerElement = document.getElementById("score");
const scoreElement = document.getElementById("right-answers");
const totalScoreContainerElement = document.getElementById("total-score-container");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;
let answerSelected = false;
let timer;
let timeLeft = 20; // Timer set to 20 seconds for each question
const maxQuestions = 15; // Limit the number of questions to 15


// Event Listeners
startButton.addEventListener("click", () => {
    if (startButton.innerText === "Restart") {
        restartGame();
    } else {
        startGame();
    }
});

nextButton.addEventListener("click", () => {
    if (answerSelected) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        alert("Please select an answer before moving to the next question.");
    }
});

// Start the game
function startGame() {
    quizScore = 0; // Reset the score at the start of the game
    currentQuestionIndex = 0;
    startButton.classList.add("hide"); // Hide the Start button
    scoreContainerElement.style.display = "flex"; // Show the score container
    scoreElement.innerText = quizScore;
    shuffledQuestions = shuffleArray(questions).slice(0, maxQuestions); // Select only the first 15 questions
    questionContainerElement.classList.remove("hide"); // Show the question container
    setNextQuestion();
}

// Restart the game
function restartGame() {
    quizScore = 0;
    startButton.innerText = "Start";
    startButton.classList.remove("hide");
    scoreContainerElement.style.display = "none";
    nextButton.classList.add("hide");
    totalScoreContainerElement.style.display = "none";
    questionContainerElement.classList.add("hide");
}

// Display the next question
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        startTimer(); // Start the timer right after the question is displayed
    } else {
        endGame();
    }
}

// Show the question and answers
function showQuestion(question) {
    questionElement.innerText = question.question;
    const shuffledAnswers = shuffleArray(question.answers);
    shuffledAnswers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Start the timer for the question
function startTimer() {
    timeLeft = 20; // Reset timer for each question
    timerDisplay.innerText = timeLeft; // Display only the countdown number
    timerDisplay.style.animation = `colorChange ${timeLeft}s linear infinite`; // Apply color transition animation
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) {
                currentQuestionIndex++;
                setNextQuestion(); // Automatically move to the next question
            }
        }
    }, 1000);
}

// Reset the state of the buttons and UI
function resetState() {
    answerSelected = false;
    clearInterval(timer); // Clear any existing timer before resetting
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        quizScore++; // Increment score for a correct answer
        scoreElement.innerText = quizScore;
    }
    answerSelected = true;
    clearInterval(timer); // Stop timer when an answer is selected
    nextButton.classList.remove("hide");
}

// Set status class based on correctness
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

// Clear status classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// End the game and show the score
function endGame() {
    questionContainerElement.classList.add("hide");
    totalScoreContainerElement.style.display = "flex";
    
    // Calculate the reward amount based on the score
    let rewardAmount;
    if (quizScore === 15) {
        rewardAmount = 50; // Example: $50 for a perfect score
    } else if (quizScore >= 12) {
        rewardAmount = 30; // Example: $30 for a score between 12 and 14
    } else if (quizScore >= 9) {
        rewardAmount = 20; // Example: $20 for a score between 9 and 11
    } else if (quizScore >= 6) {
        rewardAmount = 10; // Example: $10 for a score between 6 and 8
    } else if (quizScore >= 3) {
        rewardAmount = 5; // Example: $5 for a score between 3 and 5
    } else {
        rewardAmount = 0; // No reward for a score less than 3
    }

    // Display the user's score and reward
    totalScoreContainerElement.innerText = `Your total score is ${quizScore}. You've earned $${rewardAmount} as a reward.`;

    startButton.innerText = "Restart";
    startButton.classList.remove("hide");

    // Display a random quote based on the score
    const quotes = [
        { score: 15, text: "Excellent job! You're a trivia master!" },
        { score: 12, text: "Great work! You know your stuff!" },
        { score: 9, text: "Good effort! Keep practicing!" },
        { score: 6, text: "Not bad! There's room for improvement." },
        { score: 3, text: "Keep trying! Practice makes perfect." },
        { score: 0, text: "Don't be discouraged. Give it another shot!" }
    ];

    const quote = quotes.find(q => quizScore >= q.score) || quotes[quotes.length - 1];

    // Add the motivational quote
    totalScoreContainerElement.innerText += ` ${quote.text}`;
}

// Shuffle array utility function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Define your questions here
const questions = [
    {
        "question": "UNIVAC is",
        "answers": [
            {
                "text": "Universal Automatic Computer",
                "correct": true
            },
            {
                "text": "Universal Array Computer",
                "correct": false
            },
            {
                "text": "Unique Automatic Computer",
                "correct": false
            },
            {
                "text": "Unvalued Automatic Computer",
                "correct": false
            }
        ]
    },
    {
        "question": "CD-ROM stands for",
        "answers": [
            {
                "text": "Compactable Read Only Memory",
                "correct": false
            },
            {
                "text": "Compact Data Read Only Memory",
                "correct": false
            },
            {
                "text": "Compactable Disk Read Only Memory",
                "correct": false
            },
            {
                "text": "Compact Disk Read Only Memory",
                "correct": true
            }
        ]
    },
    {
        "question": "ALU is",
        "answers": [
            {
                "text": "Arithmetic Logic Unit",
                "correct": true
            },
            {
                "text": "Array Logic Unit",
                "correct": false
            },
            {
                "text": "Application Logic Unit",
                "correct": false
            },
            {
                "text": "None of above",
                "correct": false
            }
        ]
    },
    {
        "question": "IBM 1401 is",
        "answers": [
            {
                "text": "First Generation Computer",
                "correct": false
            },
            {
                "text": "Second Generation Computer",
                "correct": true
            },
            {
                "text": "Third Generation Computer",
                "correct": false
            },
            {
                "text": "Fourth Generation Computer",
                "correct": false
            }
        ]
    },
    {
        "question": "The first computer introduced in Nepal was",
        "answers": [
            {
                "text": "IBM 1400",
                "correct": false
            },
            {
                "text": "IBM 1401",
                "correct": true
            },
            {
                "text": "IBM 1402",
                "correct": false
            },
            {
                "text": "IBM 1403",
                "correct": false
            }
        ]
    },
    {
        "question": "Chief component of first-generation computer was",
        "answers": [
            {
                "text": "Transistors",
                "correct": false
            },
            {
                "text": "Vacuum Tubes and Valves",
                "correct": true
            },
            {
                "text": "Integrated Circuits",
                "correct": false
            },
            {
                "text": "None of above",
                "correct": false
            }
        ]
    },
    {
        "question": "Second Generation computers were developed during",
        "answers": [
            {
                "text": "1949 to 1955",
                "correct": false
            },
            {
                "text": "1956 to 1965",
                "correct": true
            },
            {
                "text": "1965 to 1970",
                "correct": false
            },
            {
                "text": "1970 to 1990",
                "correct": false
            }
        ]
    },
    {
        "question": "The computer that processes both analog and digital is called",
        "answers": [
            {
                "text": "Analog computer",
                "correct": false
            },
            {
                "text": "Digital computer",
                "correct": false
            },
            {
                "text": "Hybrid computer",
                "correct": true
            },
            {
                "text": "Mainframe computer",
                "correct": false
            }
        ]
    },
    {
        "question": "The term gigabyte refers to",
        "answers": [
            {
                "text": "1024 bytes",
                "correct": false
            },
            {
                "text": "1024 kilobytes",
                "correct": false
            },
            {
                "text": "1024 megabytes",
                "correct": true
            },
            {
                "text": "1024 gigabytes",
                "correct": false
            }
        ]
    },
    {
        "question": "Which is the type of memory for information that does not change on your computer?",
        "answers": [
            {
                "text": "RAM",
                "correct": false
            },
            {
                "text": "ROM",
                "correct": true
            },
            {
                "text": "ERAM",
                "correct": false
            },
            {
                "text": "RW/RAM",
                "correct": false
            }
        ]
    }
]
