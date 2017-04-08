// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on "Make Your Own Neural Network" by Tariq Rashid
// https://github.com/makeyourownneuralnetwork/

// Neural Network
var nn;

// Train and Testing Data
var training;
var testing;

// Where are we in the training and testing data
// (for animation)
var trainingIndex = 0;
var testingIndex = 0;

// How many times through all the training data
var epochs = 0;

// Network configuration
var input_nodes = 784;
var hidden_nodes = 256;
var output_nodes = 10;

// Learning rate
var learning_rate = 0.1;

// How is the network doing
var totalCorrect = 0;
var totalGuesses = 0;

// Reporting status to a paragraph
var statusP;

function preload() {
  training = loadStrings('data/mnist_train.csv');
  testing = loadStrings('data/mnist_test_100.csv');
}

function setup() {
  // Canvas
  createCanvas(280, 100);

  // Create the neural network
  nn = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate)

  // Status paragraph
  statusP = createP('');
}

function draw() {
  background(200);


  // Train (this does just one image per cycle through draw)
  var traindata = train();
  // Test
  var result = test();
  var testdata = result[0];
  var guess = result[1];
  var correct = result[2];

  // Draw the training and testing image
  drawImage(traindata, 16, 16, 2, 'training');
  drawImage(testdata, 128, 16, 2, 'test');

  // Draw the resulting guess
  fill(0);
  rect(200, 16, 2 * 28, 2 * 28);
  // Was it right or wrong?
  if (correct) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  textSize(60);
  text(guess, 212, 64);

  // Tally total correct
  if (correct) {
    totalCorrect++;
  }
  totalGuesses++;

  // Show performance and # of epochs
  var status = 'performance: ' + nf(totalCorrect / totalGuesses, 0, 2);
  status += '<br>';
  var percent = trainingIndex / training.length;
  status += 'epochs: ' + epochs + ' (' + nf(percent, 2, 3) + '%)';
  statusP.html(status);
}

function drawImage(values, xoff, yoff, w, txt) {
  var dim = floor(sqrt(values.length));
  for (var k = 0; k < values.length; k++) {
    var brightness = values[k] * 256;
    var x = k % dim;
    var y = floor(k / dim);
    fill(brightness);
    noStroke();
    rect(xoff + x * w, yoff + y * w, w, w);
  }
  fill(0);
  textSize(12);
  text(txt, xoff, yoff + w * 35);
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
