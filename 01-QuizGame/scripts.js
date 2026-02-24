function elementCall() {
  return {
    startScreen: document.querySelector(".js-start-box"),
    quizScreen: document.querySelector(".js-questions-box"),
    resultScreen: document.querySelector(".js-result-box"),
    startButton: document.querySelector(".js-start-button"),
    questionText: document.querySelector(".js-question"),
    answersContainer: document.querySelector(".js-answers-box"),
    currentQuestionSpan: document.querySelector(".js-question-number"),
    totalQuestionsSpan: document.querySelector(".js-total-questions"),
    scoreSpan: document.querySelector(".js-total-score"),
    finalScoreSpan: document.querySelector(".js-final-score"),
    maxScoreSpan: document.querySelector(".js-max-score"),
    resultMessage: document.querySelector(".js-result-message"),
    restartButton: document.querySelector(".js-finish-button"),
    progressBar: document.querySelector(".js-progress"),
  };
}
const elementLibrary = elementCall();
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
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
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

elementLibrary.totalQuestionsSpan.textContent = quizQuestions.length;
elementLibrary.maxScoreSpan.textContent = quizQuestions.length;
elementLibrary.scoreSpan.textContent = score;

elementLibrary.startButton.addEventListener("click", startQuiz);
elementLibrary.restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answersDisabled = false;
  elementLibrary.scoreSpan.textContent = score;
  elementLibrary.startScreen.style.display = "none";
  elementLibrary.quizScreen.style.display = "flex";
  elementLibrary.resultScreen.style.display = "none";
  elementLibrary.progressBar.style.width = "0%";
  showQuestion();
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  elementLibrary.questionText.textContent = currentQuestion.question;
  elementLibrary.currentQuestionSpan.textContent = currentQuestionIndex + 1;

  elementLibrary.answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answers-button");
    button.textContent = answer.text;

    button.addEventListener("click", () => handleAnswerClick(button, answer.correct));

    elementLibrary.answersContainer.appendChild(button);
  });

  updateProgressBar();
}

function handleAnswerClick(selectedButton, isCorrect) {
  if (answersDisabled) return;
  answersDisabled = true;

  const buttons = elementLibrary.answersContainer.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  if (isCorrect) {
    score++;
    elementLibrary.scoreSpan.textContent = score;
    selectedButton.classList.add("answers-button-correct");
  } else {
    selectedButton.classList.add("answers-button-incorrect");

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answers.find((answer) => answer.correct);

    buttons.forEach((btn) => {
      if (btn.textContent === correctAnswer.text) {
        btn.classList.add("answers-button-correct");
      }
    });
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      answersDisabled = false;
      showQuestion();
    } else {
      finishQuiz();
    }
  }, 800);
}

function updateProgressBar() {
  const progressPercent =
    (currentQuestionIndex / quizQuestions.length) * 100;
  elementLibrary.progressBar.style.width = `${progressPercent}%`;
}

function finishQuiz() {
  elementLibrary.quizScreen.style.display = "none";
  elementLibrary.resultScreen.style.display = "flex";

  elementLibrary.finalScoreSpan.textContent = score;
  elementLibrary.maxScoreSpan.textContent = quizQuestions.length;

  const percentage = Math.round((score / quizQuestions.length) * 100);
  let message = "";

  if (percentage === 100) {
    message = "Perfect score! Amazing job!";
  } else if (percentage >= 60) {
    message = "Nice work! You did great.";
  } else {
    message = "Keep practicing and try again!";
  }

  elementLibrary.resultMessage.textContent = message;
  elementLibrary.progressBar.style.width = "100%";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answersDisabled = false;

  elementLibrary.scoreSpan.textContent = score;
  elementLibrary.totalQuestionsSpan.textContent = quizQuestions.length;

  elementLibrary.resultScreen.style.display = "none";
  elementLibrary.quizScreen.style.display = "flex";
  elementLibrary.startScreen.style.display = "none";

  elementLibrary.progressBar.style.width = "0%";
  showQuestion();
}
