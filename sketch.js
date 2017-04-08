// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

var nn;

var training;
var testing;

var trainingIndex = 0;
var testingIndex = 0;

var epochs = 0;

// Network configuration
var input_nodes = 784;
var hidden_nodes = 200;
var output_nodes = 10;

// learning rate
var learning_rate = 0.1;

// var trainingImage;
// var testingImage;

var scorecard = new Array(100);

function preload() {
  training = loadStrings('data/mnist_test.csv');
  testing = loadStrings('data/mnist_train_100.csv');
}

function setup() {

  // var nn = new NeuralNetwork(3, 3, 3, 0.3);
  // var prediction = nn.query([1, 1, 1]);
  // console.log(prediction);
  // nn.train([1, 2, 3], [5, 5, 5]);

  // number of input, hidden and output nodes

  // create instance of neural network
  nn = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate)

  createCanvas(280 * 2, 280 * 2);
  trainingImage = createImage(28, 28, RGB);

}

function draw() {
  background(100);
  train();
  test();

}

function drawImage(values, xoff, yoff) {
  for (var k = 1; k < values.length; k++) {
    var brightness = Number(values[k])
    var x = (k - 1) % 28;
    var y = floor((k - 1) / 28);
    fill(brightness);
    stroke(brightness);
    rect(xoff + x * 10, yoff + y * 10, 10, 10);
  }
}


function train() {

  // split the record by the ',' commas
  var all_values = training[trainingIndex].split(',');
  var inputs = [];

  drawImage(all_values, 0, 0);
  for (var k = 1; k < all_values.length; k++) {
    var brightness = Number(all_values[k])
    inputs[k - 1] = map(brightness, 0, 255, 0, 0.99) + 0.01;

    var x = (k - 1) % 28;
    var y = floor((k - 1) / 28);
    fill(brightness);
    stroke(brightness);
    rect(x * 10, y * 10, 10, 10);
  }



  targets = new Array(output_nodes);
  for (var k = 0; k < targets.length; k++) {
    targets[k] = 0.01;
  }
  targets[floor(Number(all_values[0]))] = 0.99;
  //console.log(targets);
  nn.train(inputs, targets);

  trainingIndex++;

  if (trainingIndex == training.length) {
    traingIndex = 0;
    epochs++;
  }
}


function test() {
  // test the neural network

  // scorecard for how well the network performs, initially empty
  // go through all the records in the test data set
  var all_values = testing[testingIndex].split(',');
  drawImage(all_values, 0, 280);
  var correct_label = floor(Number(all_values[0]));
  // scale and shift the inputs
  var inputs = [];
  for (var k = 1; k < all_values.length; k++) {
    inputs[k - 1] = map(Number(all_values[k]), 0, 255, 0, 0.99) + 0.01;
  }
  var outputs = nn.query(inputs).toArray();

  // # the index of the highest value corresponds to the label
  label = findMax(outputs);

  var correct = false;

  // append correct or incorrect to list
  if (label == correct_label) {
    correct = true;
    // network's answer matches correct answer, add 1 to scorecard
    scorecard.push(1);
  } else {
    // network 's answer doesn't match correct answer, add 0 to scorecard
    scorecard.push(0);
  }
  scorecard.splice(0, 1);

  if (frameCount % 60 == 0) {
    testingIndex++;
    if (testingIndex == testing.length) {
      testingIndex = 0;
    }
  }

  var sum = 0;
  for (var n = 0; n < scorecard.length; n++) {
    sum += scorecard[n] || 0;
  }
  console.log('performance: ' + (sum / scorecard.length));

  if (correct) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  textSize(256);
  noStroke();
  textAlign(CENTER);
  text('' + label, 3 * width / 4, height - 36);

}

function findMax(list) {
  var record = 0;
  var index = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i] > record) {
      record = list[i];
      index = i;
    }
  }
  return index;
}
