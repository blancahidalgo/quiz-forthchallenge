//All VAR QUESTIONS BELOW//
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

//THIS IS ALL VARIABLES THAT WILL BE CALLED IN FUNCTIONS MOVING FORWARD//
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var quizContent = document.getElementById('quiz_content');
var timerEl = document.getElementById('time');
var choicesEl = document.querySelector('.questions_responses');
var startBtn = document.querySelector('.start_btn');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


//THIS FUNCTIONS CALLS STARTS THE GAME, HIDES THE ORIGINAL SCREEN AND SETS THE TIMER OFF//
function startGame() {
  console.log('clicked')
  var startScreenEl = document.querySelector('.start-screen');
  startScreenEl.setAttribute('class', 'hide');
  quizContent.removeAttribute('class');
  timerId = setInterval(startClock, 1500);
  timerEl.textContent = time;
  askQuestion();
}

//THIS FUNCTION STARTS ROLLING OUT THE ARRAY OF QUESTIONS//
function askQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = '';
//STARTING WITH 0, BEING THE FIRST ONE LISTED//
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = i + 1 + '. ' + choice;
    choicesEl.appendChild(choiceNode);
  }
}
//THIS SETS AN EVENT WHEN THE ANSWER IS CLICKED AND STARTS A LOOP COMPARING THE USER ANSWER VERSUS THE RIGHT ANSWER VIA BOOLEAN VALUE//
function answerClicked(event) {
  var buttonEl = event.target.value;
  console.log(buttonEl)

//the timer will decrement 15 secs every time an user answer is wrong//
  if (buttonEl !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    feedbackEl.textContent = 'Sorry! You got it wrong! Try again!';
  } else {
    feedbackEl.textContent = 'Yay! You got it right!';
  }
//this continues onto the following questions in the array ++ as long as the timer hasn't run out/
  currentQuestionIndex++;
  if (time <= 0 || currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    askQuestion();
  }
}
//if timer runs out or all questions have been answered right or wrong, the quiz will end//
function endQuiz() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById('end-el');
  endScreenEl.removeAttribute('class');

  var finalScoreEl = document.getElementById('score');
  finalScoreEl.textContent = time;

  quizContent.setAttribute('class', 'hide');
}

function startClock() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

//this function will run the opportunity to save initials//
function saveHighscore() {
  var initials = initialsEl.value.trim();
  
  if (initials !== '') {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    var newScore = {
     score: time,
     initials: initials,
    };
    highscores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html'; 
  }
}


startBtn.onclick = startGame;
choicesEl.onclick = answerClicked;


function printHighscores() {

  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < highscores.length; i += 1) {
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

printHighscores();

//Local storage code goes here// 

function saveHighscore() {
  var initials = initialsEl.value.trim();
  
  if (initials !== '') {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    var newScore = {
      score: time,
      initials: initials,
    };
    highscores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html'; 
  }
}
function printHighscores() {
  var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });
  var olEl = document.getElementById('highscores');
  olEl.innerHTML = ''; 
  for (var i = 0; i < highscores.length; i += 1) {
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
    olEl.appendChild(liTag);
  }
}

document.getElementById('clear').onclick = function() {
  localStorage.removeItem('highscores');
  window.location.reload();
}