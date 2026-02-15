const selectedTopic = localStorage.getItem("selectedTopic");

// Store active questions
let questions = [];

// Quiz state
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;

// Load questions based on topic
function loadQuestions() {
  if (selectedTopic === "html") {
    questions = htmlQuestions;
  } else if (selectedTopic === "css") {
    questions = cssQuestions;
  } else if (selectedTopic === "bootstrap") {
    questions = bootstrapQuestions;
  } else {
    questions = [];
  }
}

// Initialize quiz
loadQuestions();
