// console.log("yep");


var questions = [
    new Question("Commonly used data types DO NOT include?", ["strings", "booleans","alerts", "numbers"], "booleans"),
    new Question("The condition in an if / else statement is enclosed within?", ["quotes", "curly brackets", "parenthesis", "square brackets"], "parenthesis"),
    new Question("Arrays in JavaScript can be used to store?", ["numbers and strings", "other arrays","booleans", "all of the above"], "all of the above"),
    new Question("String values must be enclosed within ____ when being assigned to varrables?", ["commas", "curly brackets", "quotes", "parenthesis"], "parenthesis"),
    new Question("A very useful tool during development and debugging for printing content to the debugger is:", ["JavaScript", "terminal/bash", "for loops", "console.log"], "console.log")
];
 

var quiz = new Quiz(questions);

var time = 75;
var index = 0;
// start document here
document.getElementById("start").addEventListener("click", startGame);
// Start the game and take away start button
function startGame() {
  showTime();
  document.getElementById("start").style.display = "none";
  show();
  
 
  
}
//create time and end game when it is 0
function showTime() {
    var timeInterval = setInterval(function(){
  time--;
  document.getElementById("timer").textContent = time;
  if(time <= 0){
      clearInterval(timeInterval);
      showScore();
  }

    }, 1000);
}

//show score  when over. Put questions and answers in place
function show() {
    if(quiz.isOver()) {
        showScore();
    }
    else {
        
        var element = document.getElementById("question");
        element.innerHTML = quiz.getIndex().text;
 
       
        var choices = quiz.getIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            pick("btn" + i, choices[i]);
        } 
    }
};
// set the score, questions and index
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 // pull the questions
Quiz.prototype.getIndex = function() {
    return this.questions[this.questionIndex];
}
 //pull  the  right answers and move on
Quiz.prototype.pick = function(answer) {
    if(this.getIndex().isAnswer(answer)) {
        
        this.questionIndex++;
    }
    // subtract 15 seconds if wrong answer is chossen
 else {
     time -= 15;
 }
    
}
 // end quiz after last index
Quiz.prototype.isOver = function() {
    return this.questionIndex === this.questions.length;
}
 
 // set the question, answer choices and correct answer
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 // set the answer to the matching choice
Question.prototype.isAnswer = function(choice) {
    return this.answer === choice;
}
 
function pick(id, pick) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.pick(pick);
        show();
    }
};
// need to add remaining time here for score
function showScore() {
    
};
 
