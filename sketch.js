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
var hidden_nodes = 256;
var output_nodes = 10;

// learning rate
var learning_rate = 0.1;

// var trainingImage;
// var testingImage;

var scorecard = [];

var statusP;

function preload() {
  training = loadStrings('data/mnist_train.csv');
  testing = loadStrings('data/mnist_test_100.csv');
}

function setup() {

  // var nn = new NeuralNetwork(3, 3, 3, 0.3);
  // var prediction = nn.query([1, 1, 1]);
  // console.log(prediction);
  // nn.train([1, 2, 3], [5, 5, 5]);

  // number of input, hidden and output nodes

  // create instance of neural network
  nn = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate)

  createCanvas(280, 100);
  trainingImage = createImage(28, 28, RGB);

  statusP = createP('');
}

function draw() {
  background(200);

  // One new image per frame
  var w = 2;
  var input = train();
  drawImage(input, 16, 16, w);
  fill(0);
  textSize(12);
  text('training', 16, 86);

  var result = test();

  drawImage(result[0], 128, 16, w);
  fill(0);
  textSize(12);
  text('testing', 128, 86);

  fill(0);
  rect(200, 16, w * 28, w * 28);

  if (result[2]) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  textSize(60);
  text(result[1], 212, 64);

  if (result[2]) {
    scorecard.push(1);
  } else {
    scorecard.push(0);
  }
  if (scorecard.length > 1000) {
    scorecard.splice(0, 1);
  }

  var sum = 0;
  for (var n = 0; n < scorecard.length; n++) {
    sum += scorecard[n];
  }

  var status = 'performance: ' + nf(sum / scorecard.length, 0, 2);
  status += '<br>';
  var percent = trainingIndex / training.length;
  status += 'epochs: ' + epochs + ' (' + nf(percent, 2, 3) + '%)';
  statusP.html(status);



  //test();

}

function drawImage(values, xoff, yoff, w) {
  var dim = floor(sqrt(values.length));
  for (var k = 0; k < values.length; k++) {
    var brightness = values[k] * 256;
    var x = k % dim;
    var y = floor(k / dim);
    fill(brightness);
    noStroke();
    rect(xoff + x * w, yoff + y * w, w, w);
  }
}



function train() {

  // split the record by the ',' commas
  var all_values = training[trainingIndex].split(',');
  var inputs = [];

  for (var k = 1; k < all_values.length; k++) {
    inputs[k - 1] = map(Number(all_values[k]), 0, 255, 0, 0.99) + 0.01;
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

  return inputs;

}


function test() {
  // test the neural network

  // scorecard for how well the network performs, initially empty
  // go through all the records in the test data set
  var all_values = testing[testingIndex].split(',');
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
  if (label == correct_label) {
    correct = true;
  }

  if (frameCount % 30 == 0) {
    testingIndex++;
    if (testingIndex == testing.length) {
      testingIndex = 0;
    }
  }

  return [inputs, label, correct];

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
