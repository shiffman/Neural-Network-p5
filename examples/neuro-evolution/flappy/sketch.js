// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/aKiyCeIuwn4

var activeBirds = [];
var allBirds = [];
var pipes = [];
var counter = 0;

var speedSlider;
var speedSpan;
var highScoreSpan;
var allTimeHighScoreSpan;

var highScore = 0;

var runBest = false;
var runBestButton;

function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent('canvascontainer');

  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  runBestButton = select('#best');
  runBestButton.mousePressed(toggleState);

  for (var i = 0; i < 250; i++) {
    var bird = new Bird();
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
}

function toggleState() {
  runBest = !runBest;
  if (runBest) {
    resetGame();
    bestBird.score = 0;
    runBestButton.html('continue training');
  } else {
    nextGeneration();
    runBestButton.html('run best');
  }
}



function draw() {
  background(0);

  var cycles = speedSlider.value();
  speedSpan.html(cycles);


  for (var n = 0; n < cycles; n++) {

    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    if (runBest) {
      bestBird.think(pipes);
      bestBird.update();
      for (var j = 0; j < pipes.length; j++) {
        if (pipes[j].hits(bestBird)) {
          resetGame();
          break;
        }
      }
    } else {
      for (var i = activeBirds.length - 1; i >= 0; i--) {
        var bird = activeBirds[i];
        bird.think(pipes);
        bird.update();
        for (var j = 0; j < pipes.length; j++) {
          if (pipes[j].hits(activeBirds[i])) {
            activeBirds.splice(i, 1);
            break;
            //console.log("HIT");
          }
        }
      }
    }

    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  var tempHighScore = 0;
  if (!runBest) {
    var tempBestBird = null;
    for (var i = 0; i < activeBirds.length; i++) {
      var s = activeBirds[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestBird = activeBirds[i];
      }
    }

    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestBird = tempBestBird;
    }
  } else {
    tempHighScore = bestBird.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  highScoreSpan.html(tempHighScore);
  allTimeHighScoreSpan.html(highScore);

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }

  if (runBest) {
    bestBird.show();
  } else {
    for (var i = 0; i < activeBirds.length; i++) {
      activeBirds[i].show();
    }
    if (activeBirds.length == 0) {
      nextGeneration();
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}
