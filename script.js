// what questions and answers going to used
var questions = [
  new Question(
    "Commonly used data types DO NOT include?",
    ["strings", "booleans", "alerts", "numbers"],
    "booleans"
  ),
  new Question(
    "The condition in an if / else statement is enclosed within?",
    ["quotes", "curly brackets", "parenthesis", "square brackets"],
    "parenthesis"
  ),
  new Question(
    "Arrays in JavaScript can be used to store?",
    ["numbers and strings", "other arrays", "booleans", "all of the above"],
    "other arrays"
  ),
  new Question(
    "String values must be enclosed within ______ when being assigned to variables?",
    ["commas", "curly brackets", "quotes", "parenthesis"],
    "parenthesis"
  ),
  new Question(
    "A very useful too used during development and debugging for printing content to the debugger is?",
    ["JavaScript", "terminal/bash", "for loops", "console.log"],
    "console.log"
  ),
];

var quiz = new Quiz(questions);
var time = 75;
var gameTimer;
var savedScores = [];

// Setting initial events
document.getElementById("start").addEventListener("click", startGame);
document
  .getElementById("submitScores")
  .addEventListener("click", saveAndShowScores);
document
  .getElementById("clearHighscores")
  .addEventListener("click", clearHighscores);
document.getElementById("goBack").addEventListener("click", goBack);

// Helper Functions
function startGame() {
  // starts the timer
  startTimer();
  // Hiding start button and displaying choices
  document.getElementById("start").style.display = "none";
  document.getElementById("question").style.display = "block";
  document.getElementById("timer").style.display = "block";
  document.getElementById("choices").style.display = "block";
  document.getElementById("scoreSave").style.display = "none";
  // Shows the next question
  quiz.questionIndex = 0;
  time = 75;
  showQuestion();
}
// set and start timer
function startTimer() {
  gameTimer = setInterval(function () {
    time--;
    document.getElementById("timer").textContent = time;
    if (time <= 0) {
      showScore();
    }
  }, 1000);
}
// Start the quiz
function showQuestion() {
  if (quiz.isOver()) {
    showScore();
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getIndex().text;

    // show options
    var choices = quiz.getIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      pick("btn" + i, choices[i]);
    }
  }
}

// see what was picked
function pick(id, pick) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.pick(pick);
    showQuestion();
  };
}

// function to stop timer and show results
function showScore() {
  clearInterval(gameTimer);
  document.getElementById("timer").style.display = "none";
  document.getElementById("choices").style.display = "none";
  document.getElementById("question").style.display = "none";
  document.getElementById("results").innerHTML =
    "<h1>Your Score</h1><h2 id='score'> Your scores: " + time + "</h2>";
  document.getElementById("scoreSave").style.display = "block";
}
// start quiz again
function goBack() {
  document.getElementById("highscores").style.display = "none";
  document.getElementById("initials").value = "";
  document.getElementById("start").style.display = "inline-block";
}
// store score
function saveAndShowScores() {
  document.getElementById("scoreSave").style.display = "none";
  document.getElementById("results").style.display = "none";
  document.getElementById("highscores").style.display = "block";
  savedScores.push({
    initials: document.getElementById("initials").value,
    scores: time,
  });
  let html = "";
  savedScores.forEach((element) => {
    html += "<h5>" + element.initials + " - " + element.scores + "</h5><br>";
  });
  document.getElementById("highscoreList").innerHTML = html;
}
// clearing scores
function clearHighscores() {
  savedScores = [];
  alert("cleared");
}

// Quiz
function Quiz(questions) {
  this.questions = questions;
  this.questionIndex = 0;
}
//pull the question
Quiz.prototype.getIndex = function () {
  return this.questions[this.questionIndex];
};
// get question right move forward if not take away 15 sec
Quiz.prototype.pick = function (answer) {
  if (this.getIndex().isAnswer(answer)) {
    this.questionIndex++;
  } else {
    time -= 15;
  }
};
//once the questions are answered it is over
Quiz.prototype.isOver = function () {
  return this.questionIndex === this.questions.length;
};

// takes the var array and seperates question is first then an array of choices and then the correct answer
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isAnswer = function (choice) {
  return this.answer === choice;
};
