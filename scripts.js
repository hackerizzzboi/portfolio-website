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
  // Science
  {
    question: "In which year did the first manned moon landing occur?",
    answers: [
        { text: "1965", correct: false },
        { text: "1967", correct: false },
        { text: "1969", correct: true },
        { text: "1971", correct: false }
    ]
},

{
    question: "What is the smallest planet in our solar system?",
    answers: [
        { text: "Mercury", correct: true },
        { text: "Mars", correct: false },
        { text: "Venus", correct: false },
        { text: "Pluto", correct: false }
    ]
},


// IQ
{
    question: "If you rearrange the letters 'CIFAIPC' you would have the name of a(n):",
    answers: [
        { text: "Country", correct: false },
        { text: "City", correct: false },
        { text: "Animal", correct: false },
        { text: "Ocean", correct: true }
    ]
},
{
    question: "What comes next in the series: 1, 4, 9, 16, 25?",
    answers: [
        { text: "30", correct: false },
        { text: "36", correct: true },
        { text: "40", correct: false },
        { text: "49", correct: false }
    ]
},
{
    question: "If two's company and three's a crowd, what are four and five?",
    answers: [
        { text: "Nine", correct: true },
        { text: "Seven", correct: false },
        { text: "Eleven", correct: false },
        { text: "Twelve", correct: false }
    ]
},
{
    question: "What number should come next in the pattern: 2, 6, 12, 20, 30?",
    answers: [
        { text: "42", correct: true },
        { text: "44", correct: false },
        { text: "48", correct: false },
        { text: "50", correct: false }
    ]
},
{
    question: "What is the missing number in the sequence: 3, 9, 27, 81, ?",
    answers: [
        { text: "243", correct: true },
        { text: "162", correct: false },
        { text: "324", correct: false },
        { text: "216", correct: false }
    ]
},
{
    question: "Which shape has the most sides?",
    answers: [
        { text: "Triangle", correct: false },
        { text: "Square", correct: false },
        { text: "Pentagon", correct: false },
        { text: "Hexagon", correct: false },
        { text: "Decagon", correct: true }
    ]
},
{
    question: "In the number series 1, 4, 9, 16, 25, what is the rule for the sequence?",
    answers: [
        { text: "Addition of consecutive prime numbers", correct: false },
        { text: "Square of natural numbers", correct: true },
        { text: "Multiplication of consecutive integers", correct: false },
        { text: "Factorial of natural numbers", correct: false }
    ]
},
{
    question: "How many months have 28 days?",
    answers: [
        { text: "1", correct: false },
        { text: "2", correct: false },
        { text: "12", correct: true },
        { text: "6", correct: false }
    ]
},
{
    question: "If you have three apples and take away two, how many apples do you have?",
    answers: [
        { text: "1", correct: false },
        { text: "2", correct: true },
        { text: "3", correct: false },
        { text: "None", correct: false }
    ]
},
{
    question: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
    answers: [
        { text: "42", correct: true },
        { text: "36", correct: false },
        { text: "48", correct: false },
        { text: "56", correct: false }
    ]
},
{
    question: "What is the missing number in the series: 2, 5, 10, 17, ?",
    answers: [
        { text: "26", correct: true },
        { text: "20", correct: false },
        { text: "22", correct: false },
        { text: "30", correct: false }
    ]
},
{
    question: "What is the value of 8 + 2 × 5?",
    answers: [
        { text: "18", correct: true },
        { text: "20", correct: false },
        { text: "22", correct: false },
        { text: "24", correct: false }
    ]
},
{
    question: "Which number should come next in the sequence: 1, 4, 9, 16, 25, 36, ?",
    answers: [
        { text: "49", correct: true },
        { text: "45", correct: false },
        { text: "40", correct: false },
        { text: "64", correct: false }
    ]
},
{
    question: "Which of the following is the largest prime number below 50?",
    answers: [
        { text: "47", correct: true },
        { text: "43", correct: false },
        { text: "41", correct: false },
        { text: "37", correct: false }
    ]
},
{
    question: "What number is missing in the sequence: 3, 9, 27, ?, 243?",
    answers: [
        { text: "54", correct: false },
        { text: "81", correct: true },
        { text: "63", correct: false },
        { text: "99", correct: false }
    ]
},
{
    question: "How many sides does a heptagon have?",
    answers: [
        { text: "5", correct: false },
        { text: "6", correct: false },
        { text: "7", correct: true },
        { text: "8", correct: false }
    ]
},
{
    question: "If you arrange the letters 'LADENS', you would have the name of a(n):",
    answers: [
        { text: "City", correct: true },
        { text: "Country", correct: false },
        { text: "Animal", correct: false },
        { text: "Fruit", correct: false }
    ]
},
{
    question: "Which of the following numbers is the odd one out: 12, 15, 21, 24, 30?",
    answers: [
        { text: "12", correct: false },
        { text: "15", correct: false },
        { text: "21", correct: true },
        { text: "24", correct: false },
        { text: "30", correct: false }
    ]
},
{
    question: "In a group of 10 people, if each person shakes hands with every other person exactly once, how many handshakes will there be?",
    answers: [
        { text: "45", correct: true },
        { text: "55", correct: false },
        { text: "60", correct: false },
        { text: "40", correct: false }
    ]
},
{
    question: "What is the result of 15 divided by 3 plus 4?",
    answers: [
        { text: "9", correct: false },
        { text: "7", correct: true },
        { text: "5", correct: false },
        { text: "8", correct: false }
    ]
},
{
    question: "Which letter comes next in the series: A, C, F, J, O, ?",
    answers: [
        { text: "S", correct: false },
        { text: "T", correct: true },
        { text: "R", correct: false },
        { text: "P", correct: false }
    ]
},
{
    question: "What is the missing number in the pattern: 5, 11, 17, 23, ?",
    answers: [
        { text: "29", correct: true },
        { text: "31", correct: false },
        { text: "25", correct: false },
        { text: "27", correct: false }
    ]
},
{
    question: "Which of these is a prime number: 8, 12, 19, 20?",
    answers: [
        { text: "8", correct: false },
        { text: "12", correct: false },
        { text: "19", correct: true },
        { text: "20", correct: false }
    ]
},
{
    question: "What is the value of 3 × (4 + 2) - 5?",
    answers: [
        { text: "13", correct: false },
        { text: "15", correct: true },
        { text: "18", correct: false },
        { text: "16", correct: false }
    ]
},
{
    question: "Which of these numbers is divisible by both 3 and 5: 15, 20, 25, 30?",
    answers: [
        { text: "15", correct: true },
        { text: "20", correct: false },
        { text: "25", correct: false },
        { text: "30", correct: true }
    ]
},
{
    question: "Which number is a perfect square: 14, 16, 18, 20?",
    answers: [
        { text: "14", correct: false },
        { text: "16", correct: true },
        { text: "18", correct: false },
        { text: "20", correct: false }
    ]
},
{
    question: "What comes next in the series: 1, 3, 6, 10, 15, ?",
    answers: [
        { text: "21", correct: true },
        { text: "20", correct: false },
        { text: "22", correct: false },
        { text: "24", correct: false }
    ]
},
{
    question: "What number is missing in the series: 2, 5, 10, 17, 26, ?",
    answers: [
        { text: "37", correct: true },
        { text: "36", correct: false },
        { text: "35", correct: false },
        { text: "40", correct: false }
    ]
},
{
    question: "What is the result of (8 + 2) × 3?",
    answers: [
        { text: "30", correct: true },
        { text: "28", correct: false },
        { text: "24", correct: false },
        { text: "32", correct: false }
    ]
},
{
    question: "Which letter is the 7th in the English alphabet?",
    answers: [
        { text: "G", correct: true },
        { text: "F", correct: false },
        { text: "H", correct: false },
        { text: "I", correct: false }
    ]
},
{
    question: "What is the result of 9 + (3 × 2)?",
    answers: [
        { text: "15", correct: true },
        { text: "18", correct: false },
        { text: "12", correct: false },
        { text: "21", correct: false }
    ]
},
{
    question: "If you reverse the letters of 'EAT' what word do you get?",
    answers: [
        { text: "ATE", correct: true },
        { text: "TEA", correct: false },
        { text: "TAD", correct: false },
        { text: "EAT", correct: false }
    ]
},
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "H2SO4", correct: false },
    ],
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: [
      { text: "Nucleus", correct: false },
      { text: "Mitochondria", correct: true },
      { text: "Endoplasmic Reticulum", correct: false },
      { text: "Ribosome", correct: false },
    ],
  },
  {
    question: "How many bones are there in the adult human body?",
    answers: [
      { text: "206", correct: true },
      { text: "208", correct: false },
      { text: "210", correct: false },
      { text: "212", correct: false },
    ],
  },
  {
    question: "What is the speed of light in a vacuum?",
    answers: [
      { text: "300,000 km/s", correct: true },
      { text: "150,000 km/s", correct: false },
      { text: "450,000 km/s", correct: false },
      { text: "600,000 km/s", correct: false },
    ],
  },
  {
    question: "What is the most common element in the Earth's crust?",
    answers: [
      { text: "Iron", correct: false },
      { text: "Oxygen", correct: true },
      { text: "Silicon", correct: false },
      { text: "Aluminum", correct: false },
    ],
  },

  // Entertainment
  {
    question: "Who played Jack Dawson in the movie Titanic?",
    answers: [
      { text: "Leonardo DiCaprio", correct: true },
      { text: "Brad Pitt", correct: false },
      { text: "Johnny Depp", correct: false },
      { text: "Tom Cruise", correct: false },
    ],
  },
  {
    question: "Which movie won the Academy Award for Best Picture in 1994?",
    answers: [
      { text: "Forrest Gump", correct: true },
      { text: "Pulp Fiction", correct: false },
      { text: "The Shawshank Redemption", correct: false },
      { text: "Braveheart", correct: false },
    ],
  },
  {
    question: "What TV show features a chemistry teacher turned methamphetamine manufacturer?",
    answers: [
      { text: "Breaking Bad", correct: true },
      { text: "Narcos", correct: false },
      { text: "The Wire", correct: false },
      { text: "Ozark", correct: false },
    ],
  },
  {
    question: "Which actor portrayed Iron Man in the Marvel Cinematic Universe?",
    answers: [
      { text: "Robert Downey Jr.", correct: true },
      { text: "Chris Evans", correct: false },
      { text: "Mark Ruffalo", correct: false },
      { text: "Tom Holland", correct: false },
    ],
  },
  {
    question: "Who directed the movie 'Inception'?",
    answers: [
      { text: "Christopher Nolan", correct: true },
      { text: "Steven Spielberg", correct: false },
      { text: "James Cameron", correct: false },
      { text: "Martin Scorsese", correct: false },
    ],
  },
  {
    question: "What is the name of the fictional African country in 'Black Panther'?",
    answers: [
      { text: "Wakanda", correct: true },
      { text: "Genosha", correct: false },
      { text: "Latveria", correct: false },
      { text: "Kryptonia", correct: false },
    ],
  },
  {
    question: "Which artist is known for the song 'Thriller'?",
    answers: [
      { text: "Michael Jackson", correct: true },
      { text: "Prince", correct: false },
      { text: "Elton John", correct: false },
      { text: "Madonna", correct: false },
    ],
  },
  {
    question: "What is the longest-running Broadway show?",
    answers: [
      { text: "The Phantom of the Opera", correct: true },
      { text: "Cats", correct: false },
      { text: "Les Misérables", correct: false },
      { text: "Chicago", correct: false },
    ],
  },
  {
    question: "In what year did the first Star Wars film release?",
    answers: [
      { text: "1977", correct: true },
      { text: "1975", correct: false },
      { text: "1980", correct: false },
      { text: "1983", correct: false },
    ],
  },
  {
    question: "What book series is written by J.K. Rowling?",
    answers: [
      { text: "Harry Potter", correct: true },
      { text: "The Hunger Games", correct: false },
      { text: "Percy Jackson", correct: false },
      { text: "The Chronicles of Narnia", correct: false },
    ],
  },

  // General Knowledge
  {
    question: "What is the capital city of France?",
    answers: [
      { text: "Rome", correct: false },
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "What element does 'O' represent on the periodic table?",
    answers: [
      { text: "Osmium", correct: false },
      { text: "Oxygen", correct: true },
      { text: "Oganesson", correct: false },
      { text: "Osmium", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "Who is known as the father of modern physics?",
    answers: [
      { text: "Isaac Newton", correct: true },
      { text: "Albert Einstein", correct: false },
      { text: "Galileo Galilei", correct: false },
      { text: "Nikola Tesla", correct: false },
    ],
  },
  {
    question: "Which country is the largest by land area?",
    answers: [
      { text: "Canada", correct: false },
      { text: "Russia", correct: true },
      { text: "China", correct: false },
      { text: "United States", correct: false },
    ],
  },
  {
    question: "In which continent is the Sahara Desert located?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "Australia", correct: false },
      { text: "South America", correct: false },
    ],
  },
  {
    question: "What is the smallest prime number?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question: "Which element has the atomic number 1?",
    answers: [
      { text: "Helium", correct: false },
      { text: "Hydrogen", correct: true },
      { text: "Oxygen", correct: false },
      { text: "Carbon", correct: false },
    ],
  },
  {
    question: "What is the largest island in the world?",
    answers: [
      { text: "New Guinea", correct: false },
      { text: "Borneo", correct: false },
      { text: "Greenland", correct: true },
      { text: "Madagascar", correct: false },
    ],
  },
  {
    question: "Which planet is closest to the Sun?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mercury", correct: true },
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
    ],
  },
  {
    question: "What is the currency of Japan?",
    answers: [
      { text: "Yuan", correct: false },
      { text: "Won", correct: false },
      { text: "Yen", correct: true },
      { text: "Ringgit", correct: false },
    ],
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Niels Bohr", correct: false },
      { text: "Max Planck", correct: false },
    ],
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: [
      { text: "China", correct: false },
      { text: "Japan", correct: true },
      { text: "South Korea", correct: false },
      { text: "Thailand", correct: false },
    ],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Iron", correct: false },
      { text: "Diamond", correct: true },
      { text: "Platinum", correct: false },
    ],
  },
  {
    question: "Which ocean is the second largest in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: true },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "What is the largest organ in the human body?",
    answers: [
      { text: "Heart", correct: false },
      { text: "Liver", correct: false },
      { text: "Skin", correct: true },
      { text: "Lungs", correct: false },
    ],
  },
  {
    question: "Which element is the primary component of the Sun?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon", correct: false },
      { text: "Hydrogen", correct: true },
      { text: "Helium", correct: false },
    ],
  },
  {
    question: "What is the official language of Brazil?",
    answers: [
      { text: "Spanish", correct: false },
      { text: "Portuguese", correct: true },
      { text: "French", correct: false },
      { text: "English", correct: false },
    ],
  },
  {
    question: "Which country is the smallest in the world by land area?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "San Marino", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Liechtenstein", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Saturn", correct: false },
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "Which city is known as the Big Apple?",
    answers: [
      { text: "New York City", correct: true },
      { text: "Los Angeles", correct: false },
      { text: "Chicago", correct: false },
      { text: "San Francisco", correct: false },
    ],
  },
  {
    question: "Which famous explorer discovered America in 1492?",
    answers: [
      { text: "Vasco da Gama", correct: false },
      { text: "Ferdinand Magellan", correct: false },
      { text: "Christopher Columbus", correct: true },
      { text: "Marco Polo", correct: false },
    ],
  },
  {
    question: "What is the capital city of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'Au'?",
    answers: [
      { text: "Silver", correct: false },
      { text: "Gold", correct: true },
      { text: "Copper", correct: false },
      { text: "Platinum", correct: false },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Amazon River", correct: true },
      { text: "Nile River", correct: false },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Morning Star or Evening Star?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Venus", correct: true },
      { text: "Mercury", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Lhotse", correct: false },
    ],
  },
  {
    question: "What is the main ingredient in guacamole?",
    answers: [
      { text: "Tomato", correct: false },
      { text: "Onion", correct: false },
      { text: "Avocado", correct: true },
      { text: "Pepper", correct: false },
    ],
  },
  {
    question: "What is the chemical formula for table salt?",
    answers: [
      { text: "NaCl", correct: true },
      { text: "KCl", correct: false },
      { text: "CaCO3", correct: false },
      { text: "MgSO4", correct: false },
    ],
  },
  {
    question: "Which country is the origin of the sushi dish?",
    answers: [
      { text: "China", correct: false },
      { text: "Japan", correct: true },
      { text: "Korea", correct: false },
      { text: "Thailand", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Michelangelo", correct: false },
    ],
  },
  {
    question: "Which planet has the most moons?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest land animal?",
    answers: [
      { text: "Elephant", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
      { text: "Rhinoceros", correct: false },
    ],
  },
  {
    question: "In which year did World War II end?",
    answers: [
      { text: "1945", correct: true },
      { text: "1944", correct: false },
      { text: "1946", correct: false },
      { text: "1947", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Fe", correct: false },
      { text: "Pb", correct: false },
    ],
  },
  {
    question: "Which famous scientist developed the laws of motion?",
    answers: [
      { text: "Isaac Newton", correct: true },
      { text: "Albert Einstein", correct: false },
      { text: "Galileo Galilei", correct: false },
      { text: "Niels Bohr", correct: false },
    ],
  },
  {
    question: "What is the name of the largest desert in the world?",
    answers: [
      { text: "Sahara", correct: false },
      { text: "Antarctic Desert", correct: true },
      { text: "Arabian Desert", correct: false },
      { text: "Gobi Desert", correct: false },
    ],
  },
  {
    question: "What is the most widely spoken language in the world?",
    answers: [
      { text: "English", correct: false },
      { text: "Mandarin", correct: true },
      { text: "Spanish", correct: false },
      { text: "Hindi", correct: false },
    ],
  },
  {
    question: "Which country is known for its tulip fields?",
    answers: [
      { text: "Netherlands", correct: true },
      { text: "Belgium", correct: false },
      { text: "France", correct: false },
      { text: "Switzerland", correct: false },
    ],
  },
  {
    question: "What is the currency used in the United Kingdom?",
    answers: [
      { text: "Euro", correct: false },
      { text: "Pound Sterling", correct: true },
      { text: "Dollar", correct: false },
      { text: "Yen", correct: false },
    ],
  },
  {
    question: "What is the main ingredient in traditional Italian pizza?",
    answers: [
      { text: "Cheese", correct: false },
      { text: "Bread", correct: false },
      { text: "Tomato Sauce", correct: true },
      { text: "Pepperoni", correct: false },
    ],
  },
  {
    question: "Which famous scientist is known for his theory of evolution?",
    answers: [
      { text: "Charles Darwin", correct: true },
      { text: "Louis Pasteur", correct: false },
      { text: "Gregor Mendel", correct: false },
      { text: "James Watson", correct: false },
    ],
  },
  {
    question: "In which country would you find the Great Barrier Reef?",
    answers: [
      { text: "Australia", correct: true },
      { text: "New Zealand", correct: false },
      { text: "Philippines", correct: false },
      { text: "Indonesia", correct: false },
    ],
  },
  {
    question: "Who is the author of the 'Harry Potter' series?",
    answers: [
      { text: "J.K. Rowling", correct: true },
      { text: "J.R.R. Tolkien", correct: false },
      { text: "George R.R. Martin", correct: false },
      { text: "Suzanne Collins", correct: false },
    ],
  },
  {
    question: "What is the primary language spoken in Brazil?",
    answers: [
      { text: "Spanish", correct: false },
      { text: "Portuguese", correct: true },
      { text: "French", correct: false },
      { text: "Italian", correct: false },
    ],
  },
  {
    question: "Which ocean is the smallest?",
    answers: [
      { text: "Pacific Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: true },
    ],
  },
  {
    question: "What is the primary function of the heart?",
    answers: [
      { text: "To filter blood", correct: false },
      { text: "To oxygenate blood", correct: false },
      { text: "To pump blood", correct: true },
      { text: "To digest food", correct: false },
    ],
  },
  {
    question: "Who painted 'The Starry Night'?",
    answers: [
      { text: "Vincent van Gogh", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
      { text: "Salvador Dalí", correct: false },
    ],
  },
  {
    question: "Which planet is known as the 'Ringed Planet'?",
    answers: [
      { text: "Saturn", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Neptune", correct: false },
      { text: "Uranus", correct: false },
    ],
  },
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Vancouver", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Montreal", correct: false },
    ],
  },
  {
    question: "Which famous ship sank in 1912 after hitting an iceberg?",
    answers: [
      { text: "Titanic", correct: true },
      { text: "Lusitania", correct: false },
      { text: "Britannic", correct: false },
      { text: "Queen Mary", correct: false },
    ],
  },
  {
    question: "What is the largest internal organ in the human body?",
    answers: [
      { text: "Heart", correct: false },
      { text: "Liver", correct: true },
      { text: "Lungs", correct: false },
      { text: "Kidneys", correct: false },
    ],
  },
  {
    question: "Which country is known as the Land of the Midnight Sun?",
    answers: [
      { text: "Norway", correct: true },
      { text: "Sweden", correct: false },
      { text: "Finland", correct: false },
      { text: "Iceland", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for iron?",
    answers: [
      { text: "Fe", correct: true },
      { text: "Ir", correct: false },
      { text: "I", correct: false },
      { text: "In", correct: false },
    ],
  },
  {
    question: "What is the primary source of energy for the Earth?",
    answers: [
      { text: "The Moon", correct: false },
      { text: "The Sun", correct: true },
      { text: "Geothermal", correct: false },
      { text: "Wind", correct: false },
    ],
  },
  {
    question: "Which city is known as the City of Lights?",
    answers: [
      { text: "New York City", correct: false },
      { text: "Paris", correct: true },
      { text: "Tokyo", correct: false },
      { text: "London", correct: false },
    ],
  },
  {
    question: "Which famous scientist formulated the laws of motion and universal gravitation?",
    answers: [
      { text: "Isaac Newton", correct: true },
      { text: "Albert Einstein", correct: false },
      { text: "Galileo Galilei", correct: false },
      { text: "Niels Bohr", correct: false },
    ],
  },
  {
    question: "What is the largest species of shark?",
    answers: [
      { text: "Great White Shark", correct: false },
      { text: "Hammerhead Shark", correct: false },
      { text: "Whale Shark", correct: true },
      { text: "Tiger Shark", correct: false },
    ],
  },
  
  {
    question: "What is the hardest substance in the human body?",
    answers: [
      { text: "Bone", correct: false },
      { text: "Enamel", correct: true },
      { text: "Cartilage", correct: false },
      { text: "Dentin", correct: false },
    ],
  },
  {
    question: "What is the capital city of Italy?",
    answers: [
      { text: "Rome", correct: true },
      { text: "Milan", correct: false },
      { text: "Venice", correct: false },
      { text: "Florence", correct: false },
    ],
  },
  {
    question: "What is the national sport of Bhutan?",
    answers: [
        { text: "Archery", correct: true },
        { text: "Football", correct: false },
        { text: "Cricket", correct: false },
        { text: "Table Tennis", correct: false }
    ]
},
{
    question: "Which country is known as the 'Land of the Thunder Dragon'?",
    answers: [
        { text: "Nepal", correct: false },
        { text: "Bhutan", correct: true },
        { text: "Thailand", correct: false },
        { text: "Japan", correct: false }
    ]
},
{
    question: "What is the only letter that does not appear in any U.S. state name?",
    answers: [
        { text: "Q", correct: true },
        { text: "X", correct: false },
        { text: "Z", correct: false },
        { text: "J", correct: false }
    ]
},
{
    question: "Which animal's heart is located in its head?",
    answers: [
        { text: "Shrimp", correct: true },
        { text: "Octopus", correct: false },
        { text: "Squid", correct: false },
        { text: "Starfish", correct: false }
    ]
},
{
    question: "What is the smallest country in the world by land area?",
    answers: [
        { text: "San Marino", correct: false },
        { text: "Monaco", correct: false },
        { text: "Vatican City", correct: true },
        { text: "Liechtenstein", correct: false }
    ]
},
{
    question: "Which ancient civilization is credited with creating the earliest known written language?",
    answers: [
        { text: "Egyptians", correct: false },
        { text: "Sumerians", correct: true },
        { text: "Maya", correct: false },
        { text: "Chinese", correct: false }
    ]
},
{
    question: "What fruit is known as the 'king of fruits' in Southeast Asia?",
    answers: [
        { text: "Mango", correct: false },
        { text: "Durian", correct: true },
        { text: "Papaya", correct: false },
        { text: "Pineapple", correct: false }
    ]
},
{
    question: "Which country has a city named 'Sofia' as its capital?",
    answers: [
        { text: "Romania", correct: false },
        { text: "Bulgaria", correct: true },
        { text: "Serbia", correct: false },
        { text: "Greece", correct: false }
    ]
},
{
    question: "In which country can you find the world's largest desert that is not covered in sand?",
    answers: [
        { text: "Australia", correct: true },
        { text: "Chile", correct: false },
        { text: "China", correct: false },
        { text: "Canada", correct: false }
    ]
},
{
    question: "What is the name of the theory that suggests that the universe has no center and is constantly expanding?",
    answers: [
        { text: "Big Bang Theory", correct: true },
        { text: "Steady State Theory", correct: false },
        { text: "String Theory", correct: false },
        { text: "Quantum Theory", correct: false }
    ]
},
{
    question: "What is the name of the famous clock tower in London that is commonly mistaken for the name of the building it is in?",
    answers: [
        { text: "Big Ben", correct: true },
        { text: "Westminster Abbey", correct: false },
        { text: "Buckingham Palace", correct: false },
        { text: "London Eye", correct: false }
    ]
},
{
    question: "Which body of water is known for having the highest salinity?",
    answers: [
        { text: "Dead Sea", correct: true },
        { text: "Great Salt Lake", correct: false },
        { text: "Lake Urmia", correct: false },
        { text: "Lake Eyre", correct: false }
    ]
},
{
    question: "What is the name of the longest river in Asia?",
    answers: [
        { text: "Mekong", correct: false },
        { text: "Yangtze", correct: true },
        { text: "Ganges", correct: false },
        { text: "Indus", correct: false }
    ]
},
{
    question: "Which planet has the most moons?",
    answers: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: false },
        { text: "Saturn", correct: true },
        { text: "Uranus", correct: false }
    ]
},
{
    question: "In which country is the Great Pyramid of Giza located?",
    answers: [
        { text: "Egypt", correct: true },
        { text: "Greece", correct: false },
        { text: "Mexico", correct: false },
        { text: "China", correct: false }
    ]
},
{
    question: "What is the rarest blood type in the world?",
    answers: [
        { text: "AB negative", correct: true },
        { text: "O positive", correct: false },
        { text: "A positive", correct: false },
        { text: "B negative", correct: false }
    ]
},
{
    question: "Which language is the official language of the European Union and is spoken by the least number of people?",
    answers: [
        { text: "Irish", correct: true },
        { text: "Luxembourgish", correct: false },
        { text: "Estonian", correct: false },
        { text: "Maltese", correct: false }
    ]
},
{
    question: "Which historical figure is known for his 'Code of Laws' from ancient Babylon?",
    answers: [
        { text: "Alexander the Great", correct: false },
        { text: "Hammurabi", correct: true },
        { text: "Nebuchadnezzar", correct: false },
        { text: "Sargon", correct: false }
    ]
},
{
    question: "What is the name of the desert located in northern Africa, known for its vast sand dunes?",
    answers: [
        { text: "Kalahari Desert", correct: false },
        { text: "Gobi Desert", correct: false },
        { text: "Sahara Desert", correct: true },
        { text: "Namib Desert", correct: false }
    ]
},
{
    question: "Which city is known as the 'City of Canals'?",
    answers: [
        { text: "Venice", correct: true },
        { text: "Amsterdam", correct: false },
        { text: "Bangkok", correct: false },
        { text: "Venice Beach", correct: false }
    ]
},
{
    question: "Which bird is known for being able to mimic human speech?",
    answers: [
        { text: "Parrot", correct: true },
        { text: "Crow", correct: false },
        { text: "Sparrow", correct: false },
        { text: "Pigeon", correct: false }
    ]
},
{
    question: "What is the name of the largest volcano in the solar system, located on Mars?",
    answers: [
        { text: "Mount Olympus", correct: false },
        { text: "Mount Etna", correct: false },
        { text: "Olympus Mons", correct: true },
        { text: "Kilauea", correct: false }
    ]
},
{
    question: "What is the traditional Japanese art of folding paper into various shapes called?",
    answers: [
        { text: "Origami", correct: true },
        { text: "Ikebana", correct: false },
        { text: "Sumi-e", correct: false },
        { text: "Sado", correct: false }
    ]
},
{
    question: "What is the name of the French region known for its wine production and often referred to as the 'wine capital'?",
    answers: [
        { text: "Burgundy", correct: true },
        { text: "Champagne", correct: false },
        { text: "Bordeaux", correct: false },
        { text: "Alsace", correct: false }
    ]
},
{
    question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
    answers: [
        { text: "Mercury", correct: false },
        { text: "Venus", correct: true },
        { text: "Mars", correct: false },
        { text: "Jupiter", correct: false }
    ]
},
{
    question: "What is the name of the process by which plants make their food using sunlight?",
    answers: [
        { text: "Photosynthesis", correct: true },
        { text: "Respiration", correct: false },
        { text: "Transpiration", correct: false },
        { text: "Fermentation", correct: false }
    ]
},
{
    question: "Which mountain range separates Europe from Asia?",
    answers: [
        { text: "Himalayas", correct: false },
        { text: "Rockies", correct: false },
        { text: "Ural Mountains", correct: true },
        { text: "Alps", correct: false }
    ]
},
{
    question: "Which musical instrument has 47 strings and 7 pedals?",
    answers: [
        { text: "Harp", correct: true },
        { text: "Piano", correct: false },
        { text: "Violin", correct: false },
        { text: "Guitar", correct: false }
    ]
},
{
    question: "What is the name of the fictional country in the movie 'Black Panther'?",
    answers: [
        { text: "Wakanda", correct: true },
        { text: "Zamunda", correct: false },
        { text: "Elbonia", correct: false },
        { text: "Narnia", correct: false }
    ]
},
{
    question: "What is the name of the process by which a liquid turns into a gas?",
    answers: [
        { text: "Condensation", correct: false },
        { text: "Evaporation", correct: true },
        { text: "Precipitation", correct: false },
        { text: "Sublimation", correct: false }
    ]
},
{
    question: "What is the smallest bone in the human body?",
    answers: [
        { text: "Stapes", correct: true },
        { text: "Hammer", correct: false },
        { text: "Anvil", correct: false },
        { text: "Clavicle", correct: false }
    ]
},
{
    question: "Which famous explorer is known for his journey to the South Pole?",
    answers: [
        { text: "Christopher Columbus", correct: false },
        { text: "Ferdinand Magellan", correct: false },
        { text: "Ernest Shackleton", correct: false },
        { text: "Roald Amundsen", correct: true }
    ]
},
{
    question: "What is the name of the ancient language that was spoken in the Roman Empire?",
    answers: [
        { text: "Latin", correct: true },
        { text: "Greek", correct: false },
        { text: "Aramaic", correct: false },
        { text: "Sanskrit", correct: false }
    ]
},
{
    question: "What is the name of the phenomenon where a rainbow appears in the night sky?",
    answers: [
        { text: "Lunar Rainbow", correct: true },
        { text: "Solar Rainbow", correct: false },
        { text: "Aurora Borealis", correct: false },
        { text: "Halo", correct: false }
    ]
},
{
    question: "Which ancient wonder was located in the city of Babylon?",
    answers: [
        { text: "Hanging Gardens", correct: true },
        { text: "Great Pyramid of Giza", correct: false },
        { text: "Statue of Zeus", correct: false },
        { text: "Temple of Artemis", correct: false }
    ]
},
{
    question: "What is the name of the longest river in Europe?",
    answers: [
        { text: "Danube", correct: false },
        { text: "Rhine", correct: false },
        { text: "Volga", correct: true },
        { text: "Seine", correct: false }
    ]
},
{
    question: "Which human organ is capable of regenerating tissue to a significant extent?",
    answers: [
        { text: "Liver", correct: true },
        { text: "Heart", correct: false },
        { text: "Lung", correct: false },
        { text: "Kidney", correct: false }
    ]
},
{
    question: "What is the name of the famous clock tower in Moscow, Russia?",
    answers: [
        { text: "Spasskaya Tower", correct: true },
        { text: "Big Ben", correct: false },
        { text: "Eiffel Tower", correct: false },
        { text: "Cologne Cathedral", correct: false }
    ]
},
{
    question: "Which planet is known for its prominent ring system?",
    answers: [
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: true },
        { text: "Uranus", correct: false },
        { text: "Neptune", correct: false }
    ]
},
{
    question: "Which country is home to the ancient city of Petra?",
    answers: [
        { text: "Jordan", correct: true },
        { text: "Egypt", correct: false },
        { text: "Israel", correct: false },
        { text: "Syria", correct: false }
    ]
},
{
    question: "What is the name of the fictional detective created by Sir Arthur Conan Doyle?",
    answers: [
        { text: "Hercule Poirot", correct: false },
        { text: "Sherlock Holmes", correct: true },
        { text: "Philip Marlowe", correct: false },
        { text: "Miss Marple", correct: false }
    ]
},
{
    question: "What is the name of the first artificial Earth satellite launched by the Soviet Union in 1957?",
    answers: [
        { text: "Sputnik 1", correct: true },
        { text: "Vostok 1", correct: false },
        { text: "Soyuz 1", correct: false },
        { text: "Mir", correct: false }
    ]
},
{
    question: "Which fruit has varieties named 'Bing' and 'Rainier'?",
    answers: [
        { text: "Cherry", correct: true },
        { text: "Apple", correct: false },
        { text: "Peach", correct: false },
        { text: "Plum", correct: false }
    ]
},
{
    question: "What is the name of the largest reef system in the world?",
    answers: [
        { text: "Great Barrier Reef", correct: true },
        { text: "Red Sea Reef", correct: false },
        { text: "Belize Barrier Reef", correct: false },
        { text: "New Caledonian Reef", correct: false }
    ]
},
{
    question: "Which country is known for inventing the first printing press?",
    answers: [
        { text: "China", correct: false },
        { text: "Germany", correct: true },
        { text: "Italy", correct: false },
        { text: "England", correct: false }
    ]
},
{
    question: "What is the capital of Liechtenstein?",
    answers: [
        { text: "Vaduz", correct: true },
        { text: "Zurich", correct: false },
        { text: "Bern", correct: false },
        { text: "Geneva", correct: false }
    ]
},
{
    question: "Which chemical element has the symbol 'W'?",
    answers: [
        { text: "Tungsten", correct: true },
        { text: "Tantalum", correct: false },
        { text: "Thallium", correct: false },
        { text: "Tellurium", correct: false }
    ]
},
{
    question: "What is the name of the large archipelago in the Arctic Ocean between Greenland and Norway?",
    answers: [
        { text: "Svalbard", correct: true },
        { text: "Faroe Islands", correct: false },
        { text: "Iceland", correct: false },
        { text: "Aleutian Islands", correct: false }
    ]
},
{
    question: "Which Italian city is famous for its leaning tower?",
    answers: [
        { text: "Florence", correct: false },
        { text: "Venice", correct: false },
        { text: "Pisa", correct: true },
        { text: "Rome", correct: false }
    ]
},
{
    question: "What is the name of the famous painting by Edvard Munch that depicts a figure with a screaming face?",
    answers: [
        { text: "The Scream", correct: true },
        { text: "Starry Night", correct: false },
        { text: "Mona Lisa", correct: false },
        { text: "The Persistence of Memory", correct: false }
    ]
},
{
    question: "Which planet is known for its extreme surface temperatures and is closest to the Sun?",
    answers: [
        { text: "Mercury", correct: true },
        { text: "Venus", correct: false },
        { text: "Mars", correct: false },
        { text: "Earth", correct: false }
    ]
}
];

