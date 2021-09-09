var userClickedPattern = []; // user entered
var gamePattern = []; // generated
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var title = $("#level-title");

// Start the game with key press
$(document).keydown(function () {
  if (level === 0) {
    nextSequence();
  }
});

// On click of button check the answers
$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Functions
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  var numberNext = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[numberNext];
  userClickedPattern = [];

  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(150)
    .fadeIn(150);
  title[0].innerHTML = "Level " + (level + 1);
  level++;
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    title[0].innerHTML = "Game Over, <br> Press Any Key to Restart";

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
