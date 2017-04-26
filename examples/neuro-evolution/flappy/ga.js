
function resetGame() {
  counter = 0;
  pipes = [];
}

function nextGeneration() {
  resetGame();
  normalizeFitness(allBirds);
  activeBirds = generate(allBirds);
  allBirds = activeBirds.slice();
}

function generate(oldBirds) {
  var newBirds = [];

  for (var i = 0; i < oldBirds.length; i++) {
    var bird = poolSelection(oldBirds);
    newBirds[i] = bird;
  }
  return newBirds;
}


function normalizeFitness(birds) {
  // make score exponentially better?
  for (var i = 0; i < birds.length; i++) {
    birds[i].score = pow(birds[i].score, 2);
  }
  var sum = 0;
  for (var i = 0; i < birds.length; i++) {
    sum += birds[i].score;
  }
  var check = 0;
  for (var i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / sum;
    check += birds[i].fitness;
  }
}



function poolSelection(birds) {
  // Start at 0
  var index = 0;

  // Pick a random number between 0 and 1
  var r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= birds[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  return birds[index].copy();
}
