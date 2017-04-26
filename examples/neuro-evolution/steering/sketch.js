// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Evolutionary "Steering Behavior" Simulation

// An array of vehicles
var population = [];

// An array of "food"
var food = [];
// An array of "poison"
var poison = [];

// How good is food, how bad is poison?
var nutrition = [0.5, -1];

// Show additional info on DNA?
var debug;

var speedSlider;
var speedSpan;
var best = null;

function setup() {

  // Add canvas and grab checkbox
  var canvas = createCanvas(640, 360);
  canvas.parent('canvascontainer');
  debug = select('#debug');
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');

  // Create 10 vehicles
  angleMode(RADIANS);
  for (var i = 0; i < 50; i++) {
    population[i] = new Vehicle(width / 2, height / 2);
  }
  // Start with some food
  for (var i = 0; i < 10; i++) {
    food[i] = createVector(random(width), random(height));
  }
  // Start with some poison
  for (var i = 0; i < 5; i++) {
    //poison[i] = createVector(random(width), random(height));
  }
}

// Add new vehicles by dragging mouse
function mouseDragged() {
  population.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(0);
  var cycles = speedSlider.value();
  speedSpan.html(cycles);

  for (var n = 0; n < cycles; n++) {
    // 10% chance of new food
    if (random(1) < 0.05) {
      food.push(createVector(random(width), random(height)));
    }

    // 1% chance of new poison
    if (random(1) < 0.01) {
      //poison.push(createVector(random(width), random(height)));
    }

    best = null;
    var record = -1;

    // Go through all vehicles
    for (var i = population.length - 1; i >= 0; i--) {
      var v = population[i];

      if (v.score > record) {
        record = v.score;
        best = v;
      }

      // Eat the food (index 0)
      v.eat(food, 0);
      // Eat the poison (index 1)
      // v.eat(poison, 1);
      // Check boundaries
      v.boundaries();

      // Update and draw
      v.update();
      // v.display();

      // If the vehicle has died, remove
      if (v.dead()) {
        population.splice(i, 1);
      } else {
        // Every vehicle has a chance of cloning itself
        // var child = v.birth();
        // if (child != null) {
        //   population.push(child);
        // }
      }
    }

    var prob = 0.01;
    if (population.length < 2) {
      prob = 1;
    }
    var child = best.birth(prob);
    if (child != null) {
      population.push(child);
    }
  }


  // Draw all the food and all the poison
  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, eat_threshold);
  }

  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4);
  }

  best.highlight();
  for (var i = population.length - 1; i >= 0; i--) {
    var v = population[i];
    v.display();
  }



}
