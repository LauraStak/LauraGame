var gamePattern = [];
var userChosenPattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var title = $("#level-title")[0];
var level = 0;

// start the game
$(document).keydown(function () {
  if (level === 0) {
    nextSequence();
  }
});

// button click
$(".btn").click(function () {
  var userChosenColor = this.id;
  userChosenPattern.push(userChosenColor);

  animationPress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userChosenPattern.length - 1);
});

// functions
function nextSequence() {
  var randomColor = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomColor];
  userChosenPattern = [];

  animationPress(randomChosenColor);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  title.innerHTML = "Level " + (level + 1);
  level++;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animationPress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 160);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
    if (gamePattern.length === userChosenPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 300);
    title.innerHTML = "Game Over,  <br> Press Any Key To Restart";
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
}
