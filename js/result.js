// ===============================
// STEP 9: RESULT LOGIC
// ===============================

// Get saved progress
const saved = localStorage.getItem("quizProgress");

if (!saved) {
  // If user directly opens result page
  window.location.href = "index.html";
}

const state = JSON.parse(saved);

// DOM elements
const topicText = document.getElementById("topicText");
const totalText = document.getElementById("totalText");
const correctText = document.getElementById("correctText");
const wrongText = document.getElementById("wrongText");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

// Display values
topicText.textContent = `Topic: ${state.topic.toUpperCase()}`;
totalText.textContent = `Total Questions: ${state.correctCount + state.wrongCount}`;
correctText.textContent = `Correct Answers: ${state.correctCount}`;
wrongText.textContent = `Wrong Answers: ${state.wrongCount}`;

// Score calculation
const scorePercent = Math.round(
  (state.correctCount / (state.correctCount + state.wrongCount)) * 100
);

scoreText.textContent = `Score: ${scorePercent}%`;

// Restart quiz (same topic)
restartBtn.addEventListener("click", () => {
  state.currentQuestionIndex = 0;
  state.correctCount = 0;
  state.wrongCount = 0;

  localStorage.setItem("quizProgress", JSON.stringify(state));
  window.location.href = "quiz.html";
});

// Go to home page
homeBtn.addEventListener("click", () => {
  localStorage.removeItem("quizProgress");
  window.location.href = "index.html";
});
