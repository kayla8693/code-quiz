var body = document.body;

var quizBox = document.querySelector(".quiz-box");
var timeEl = document.querySelector(".time");
var quizBox = document.querySelector(".quiz-box");
var startButton = document.querySelector(".start");
var questionText = document.getElementById("question-text");
var next = document.getElementsByClassName("next");
var feedback = document.getElementById("feedback");
var scoreEl = document.getElementById("score");
var finalScoreEl = document.getElementById("final-score");
var endBox = document.getElementById("end-box");
var submitBtn = document.getElementById("submit");
var highscoreNav = document.querySelector(".highscore-nav");
var highscoreBox = document.getElementById("highscore-box");
var userScore = document.querySelector("#user-score");
var goBackBtn = document.querySelector("#go-back");
var clearHighscore = document.querySelector("#clear");
var title = document.querySelector(".title");

var choice1El = document.getElementById("choice-1");
var choice2El = document.getElementById("choice-2");
var choice3El = document.getElementById("choice-3");
var choice4El = document.getElementById("choice-4");

var secondsLeft = 75;
var currentQuestionIndex = 0;
var score = 0;

var newUserScore = "";


// start game w/ startButton click

startButton.addEventListener("click", function () {

  //   hide + reveal relevent elements
  title.classList.add("hide");
  startButton.classList.add("hide");
  quizBox.classList.remove("hide");
  scoreEl.classList.remove("hide");
  currentQuestionIndex = 0;

  // judges answer correct or incorrect + moves user to next question along w/ nextquestion function
  function moveOn(userChoice) {

    correctAnswers = questions[currentQuestionIndex].answer;

    if (userChoice === correctAnswers) {
      console.log("Correct");
      feedback.setAttribute(
        "style",
        "color: green"
      );
      feedback.textContent = ("Correct!");
      score++;
      scoreEl.textContent = ("Answers Correct: ") + score;
      console.log(score);
      console.log(userChoice);
    }
    else {
      console.log("Wrong");
      feedback.setAttribute(
        "style",
        "color: red"
      );
      feedback.textContent = ("Wrong!");
      secondsLeft -= 10;
    };

    currentQuestionIndex++;
    getNewQuestion(currentQuestionIndex);
  };

  // shows question + choices
  function getNewQuestion() {
    if (currentQuestionIndex > questions.length - 1) {
      return;
    }

    var question = questions[currentQuestionIndex];
    var title = question.title;
    questionText.textContent = title;

    for (var i = 0; i < next.length; i++) {
      var choice1 = question.choices[i]
      next[i].textContent = choice1;
    };

  };

  //   click + move on moves user to next question
  function nextQuestion() {

    choice1El.addEventListener("click", function () {
      moveOn(choice1El.textContent)
    });
    choice2El.addEventListener("click", function () {
      moveOn(choice2El.textContent);
    });
    choice3El.addEventListener("click", function () {
      moveOn(choice3El.textContent);
    });
    choice4El.addEventListener("click", function () {
      moveOn(choice4El.textContent);
    });

  };

  // sets timer, + reveals endBox, highscoreBox; saves user info to local storage + inputs it to highscoreBox
  function setTime() {

    var timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0 || questions.length < currentQuestionIndex + 1) {
        var finalScore = (secondsLeft * 2) + score;

        clearInterval(timerInterval);
        quizBox.classList.add("hide");
        endBox.classList.remove("hide");
        endBox.setAttribute("style", "color: green");

        if (score === 0) {
          finalScore = "0";
          finalScoreEl.textContent = ("Your final score is: " + finalScore);
        }
        else {

          finalScoreEl.textContent = ("Your final score is: ") + finalScore;
        }
      };

      submitBtn.addEventListener("click", function () {
        endBox.classList.add("hide");
        highscoreBox.classList.remove("hide");

        var initials = document.querySelector("#initials").value

        localStorage.getItem("initials")
        localStorage.getItem("score");
        localStorage.setItem("initials", initials);
        localStorage.setItem("score", finalScore);

        userScore.textContent = initials + " = " + finalScore;


      });

      $("#highscore-value").prepend(finalScore);

      //   clears highscoreBox
      clear.addEventListener("click", function () {
        userScore.textContent = "";
      });

    }, 1000);
  };

  //   calls all functions
  nextQuestion();
  setTime();
  getNewQuestion();
});



// reveals highscoreBox
highscoreNav.addEventListener("click", function () {
  title.classList.add("hide");
  quizBox.classList.add("hide");
  startButton.classList.add("hide");
  endBox.classList.add("hide");
  highscoreBox.classList.remove("hide");

})
