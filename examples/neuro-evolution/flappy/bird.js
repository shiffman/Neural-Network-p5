// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Bird(brain) {
  this.y = height / 2;
  this.x = 64;
  this.r = 12;

  if (arguments[0] instanceof NeuralNetwork) {
    this.brain = brain.copy();
    this.brain.mutate();
  } else {
    this.brain = new NeuralNetwork(4, 16, 2);
  }

  this.score = 0;
  this.gravity = 0.4;
  this.lift = -12;
  this.velocity = 0;
  this.fitness = 0;

  this.copy = function() {
    return new Bird(this.brain);
  }

  this.show = function() {
    fill(255, 100);
    stroke(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    this.score++;
  }

  this.think = function(pipes) {
    var closest = null;
    var record = Infinity;
    for (var i = 0; i < pipes.length; i++) {
      var diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    if (closest != null) {
      var inputs = [];
      inputs[0] = map(closest.x, this.x, width, -1, 1);
      inputs[1] = map(closest.top, 0, height, -1, 1);
      inputs[2] = map(closest.bottom, 0, height, -1, 1);
      inputs[3] = map(this.y, 0, height, -1, 1);
      var action = this.brain.query(inputs);
      if (action[1] > action[0]) {
        this.up();
      }
    }




  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
