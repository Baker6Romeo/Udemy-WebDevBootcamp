const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;
var currentClick = 0;
var loseSound = "wrong"

$(document).keydown(function() {
  gameOn === true;
  nextSequence();
})

$(".btn").click(function(event) {
  currentClick++;
  userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor, event.target);
  checkAnswer(currentClick);
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  currentClick = 0;
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);

   playSound(randomChosenColor);
   flashButton(randomChosenColor);
}

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function flashButton(color) {
  $("#" + color).fadeOut(100).fadeIn(100);
}

function animatePress(color, button){
  $(button).addClass("pressed");
  setTimeout( function() {
    $(button).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentClick) {
  if ( userClickedPattern[currentClick-1] === gamePattern[currentClick-1] ) {
    console.log("success");
    console.log(currentClick);
    console.log(level);
    if ( currentClick === level ) {
      setTimeout( nextSequence(), 1000 );
    }
  } else {
    youLose();
  }

  function youLose() {
    playSound(loseSound);
    $("body").addClass("game-over");
    setTimeout( function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    reset();
  }

  function reset() {
    level = 0;
    gamePattern = [];
    gameOn = false;
  }
}
