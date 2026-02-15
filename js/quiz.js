// ===============================
// STEP 1: GET SELECTED TOPIC
// ===============================
const selectedTopic = localStorage.getItem("selectedTopic");

// ===============================
// STEP 2: QUIZ STATE
// ===============================
let questions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;

// ===============================
// STEP 3: LOAD QUESTIONS
// ===============================
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

loadQuestions();

// ===============================
// STEP 4: DOM ELEMENTS
// ===============================
const questionTextEl = document.getElementById("questionText");
const optionsContainer = document.querySelector(".list-group");
const questionCounterEl = document.getElementById("questionCounter");
const explanationBox = document.getElementById("explanationBox");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

// ===============================
// STEP 5: RENDER QUESTION
// ===============================
function renderQuestion() {
  // 🛑 SAFETY CHECK
  if (!questions.length) {
    questionTextEl.textContent = "No questions found.";
    optionsContainer.innerHTML = "";
    questionCounterEl.textContent = "";
    nextBtn.disabled = true;
    backBtn.disabled = true;
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Update text
  questionTextEl.textContent = currentQuestion.question;
  questionCounterEl.textContent =
    `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  // Reset UI
  optionsContainer.innerHTML = "";
  explanationBox.classList.add("d-none");
  explanationBox.textContent = "";
  nextBtn.disabled = true;

  // Enable / Disable Back
  backBtn.disabled = currentQuestionIndex === 0;

  // Create options
  currentQuestion.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.className = "list-group-item";
    button.textContent = optionText;
    button.style.cursor = "pointer";


    button.addEventListener("click", () => handleAnswer(index));

    optionsContainer.appendChild(button);
  });
}

// ===============================
// STEP 6: HANDLE ANSWER
// ===============================
function handleAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".list-group-item");

  optionButtons.forEach(btn => (btn.disabled = true));

  if (selectedIndex === currentQuestion.correctIndex) {
    optionButtons[selectedIndex].classList.add(
        "bg-success",
        "text-white"
    );
    correctCount++;
  } else {
    optionButtons[selectedIndex].classList.add(
        "bg-danger",
        "text-white"
     );
    optionButtons[currentQuestion.correctIndex]
      .classList.add(
        "bg-success",
        "text-white"
    );
    wrongCount++;
  }

  explanationBox.textContent = currentQuestion.explanation;
  explanationBox.classList.remove("d-none");
  nextBtn.disabled = false;
}

// ===============================
// STEP 7: NAVIGATION
// ===============================
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
});

backBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
});

// ===============================
// STEP 8: INITIAL LOAD
// ===============================
renderQuestion();
