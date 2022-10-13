const quizData = [
  {
    question: "How old is John?",
    a: "10",
    b: "17",
    c: "26",
    d: "110",
    correct: "c",
  },
  {
    question: "What is the most used promgramming language in 2019?",
    a: "C",
    b: "Java",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Who is the presedent of US",
    a: "Donald Trump",
    b: "Arnold Schwarzenegger",
    c: "Joe Biden",
    d: "Bill Clinton",
    correct: "c",
  },
  {
    question: "What does HTML stands for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Application Programming Interface",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answersEls = document.querySelectorAll(".quiz-input");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.querySelector(".quiz-btn");

let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuestion];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
      <h2 class='quiz-result'>You answered correctly at ${score} out of ${quizData.length} questions</h2>
      <button class="quiz-btn" onClick="location.reload()">Try again</button>
      `;
    }
  }
});

function getSelected() {
  let answer = undefined;

  answersEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answersEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}
