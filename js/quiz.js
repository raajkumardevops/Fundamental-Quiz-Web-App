// ======================================================
// STEP 1: GET SELECTED TOPIC FROM LOCALSTORAGE
// ------------------------------------------------------
// This value is saved from index.html when user clicks a topic
// Example: "html", "css", "bootstrap"
const selectedTopic = localStorage.getItem("selectedTopic");

// ======================================================
// STEP 2: QUIZ STATE VARIABLES
// ------------------------------------------------------
// These variables represent the current state of the quiz
let questions = [];              // Active question set
let currentQuestionIndex = 0;    // Which question user is on
let correctCount = 0;            // Correct answers count
let wrongCount = 0;              // Wrong answers count

// ======================================================
// STEP 3: LOAD QUESTIONS BASED ON SELECTED TOPIC
// ------------------------------------------------------
// Chooses the correct question array based on topic
function loadQuestions() {
  if (selectedTopic === "html") {
    questions = htmlQuestions;
  } else if (selectedTopic === "css") {
    questions = cssQuestions;
  } else if (selectedTopic === "bootstrap") {
    questions = bootstrapQuestions;
  } else {
    questions = []; // Safety fallback
  }
}

loadQuestions();

// ======================================================
// STEP 4: LOCALSTORAGE PROGRESS (SAVE + LOAD)
// ------------------------------------------------------
// Saves quiz progress so refresh / reopen does not reset quiz
function saveProgress() {
  const quizState = {
    topic: selectedTopic,
    currentQuestionIndex,
    correctCount,
    wrongCount
  };

  localStorage.setItem("quizProgress", JSON.stringify(quizState));
}

// Loads saved progress if topic matches
function loadProgress() {
  const saved = localStorage.getItem("quizProgress");
  if (!saved) return;

  const quizState = JSON.parse(saved);

  // Restore only if same topic
  if (quizState.topic === selectedTopic) {
    currentQuestionIndex = quizState.currentQuestionIndex;
    correctCount = quizState.correctCount;
    wrongCount = quizState.wrongCount;
  }
}

loadProgress();

// ======================================================
// STEP 5: DOM ELEMENT REFERENCES
// ------------------------------------------------------
// Connecting JavaScript to HTML elements
const questionTextEl = document.getElementById("questionText");
const optionsContainer = document.querySelector(".list-group");
const questionCounterEl = document.getElementById("questionCounter");
const explanationBox = document.getElementById("explanationBox");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

// ======================================================
// STEP 6: RENDER QUESTION ON UI
// ------------------------------------------------------
// Displays question, options, counter and resets UI
function renderQuestion() {

  // SAFETY CHECK: If no questions found
  if (!questions.length) {
    questionTextEl.textContent = "No questions found.";
    optionsContainer.innerHTML = "";
    questionCounterEl.textContent = "";
    nextBtn.disabled = true;
    backBtn.disabled = true;
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Update question text
  questionTextEl.textContent = currentQuestion.question;

  // Update counter (example: Question 2 / 10)
  questionCounterEl.textContent =
    `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  // Reset UI state for new question
  optionsContainer.innerHTML = "";
  explanationBox.classList.add("d-none");
  explanationBox.textContent = "";
  nextBtn.disabled = true;

  // Disable Back button only on first question
  backBtn.disabled = currentQuestionIndex === 0;

  // Create option buttons dynamically
  currentQuestion.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.className = "list-group-item";
    button.textContent = optionText;
    button.style.cursor = "pointer";

    // Attach click handler
    button.addEventListener("click", () => handleAnswer(index));

    optionsContainer.appendChild(button);
  });
}

// ======================================================
// STEP 7: HANDLE ANSWER SELECTION
// ------------------------------------------------------
// Checks correct/wrong, applies colors, shows explanation
function handleAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".list-group-item");

  // Disable all options after answering
  optionButtons.forEach(btn => (btn.disabled = true));

  // WRONG ANSWER
  if (selectedIndex !== currentQuestion.correctIndex) {
    optionButtons[selectedIndex].classList.add(
      "bg-danger",
      "text-white"
    );
    wrongCount++;
  }

  // CORRECT ANSWER (always highlight)
  optionButtons[currentQuestion.correctIndex].classList.add(
    "bg-success",
    "text-white"
  );

  if (selectedIndex === currentQuestion.correctIndex) {
    correctCount++;
  }

  // Show explanation text
  explanationBox.textContent = currentQuestion.explanation;
  explanationBox.classList.remove("d-none");

  // Enable Next button
  nextBtn.disabled = false;

  // Save progress after answering
  saveProgress();
}

// ======================================================
// STEP 8: NEXT / BACK NAVIGATION
// ------------------------------------------------------
// Move to next question
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    saveProgress();
    renderQuestion();
  }
});

// Move to previous question
backBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    saveProgress();
    renderQuestion();
  }
});

// ======================================================
// STEP 9: INITIAL PAGE LOAD
// ------------------------------------------------------
// Render first (or restored) question
renderQuestion();
