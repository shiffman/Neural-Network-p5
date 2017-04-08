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

// Load training and testing data
// Note this is not the full dataset
// From: https://pjreddie.com/projects/mnist-in-csv/
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


// Draw the array of floats as an image
function drawImage(values, xoff, yoff, w, txt) {
  // it's a 28 x 28 image
  var dim = 28;

  // For every value
  for (var k = 0; k < values.length; k++) {
    // Scale up to 256
    var brightness = values[k] * 256;
    // Find x and y
    var x = k % dim;
    var y = floor(k / dim);
    // Draw rectangle
    fill(brightness);
    noStroke();
    rect(xoff + x * w, yoff + y * w, w, w);
  }

  // Draw a label below
  fill(0);
  textSize(12);
  text(txt, xoff, yoff + w * 35);
}


// Function to train the network
function train() {

  // Grab a row from the CSV
  var values = training[trainingIndex].split(',');

  // Make an input array to the neural network
  var inputs = [];

  // Starts at index 1
  for (var i = 1; i < values.length; i++) {
    inputs[i - 1] = map(Number(values[i]), 0, 255, 0, 0.99) + 0.01;
  }

  // Now create an array of targets
  targets = [];
  // Everything by default is wrong
  for (var k = 0; k < output_nodes; k++) {
    targets[k] = 0.01;
  }
  // The first spot is the class
  var label = Number(values[0]);
  // So it should get a 0.99 output
  targets[label] = 0.99;
  //console.log(targets);

  // Train with these inputs and targets
  nn.train(inputs, targets);

  // Go to the next training data point
  trainingIndex++;
  if (trainingIndex == training.length) {
    traingIndex = 0;
    // Once cycle through all training data is one epoch
    epochs++;
  }

  // Return the inputs to draw them
  return inputs;

}


// Function to test the network
function test() {

  // Grab a row from the CSV
  var values = training[trainingIndex].split(',');

  // Make an input array to the neural network
  var inputs = [];

  // Starts at index 1
  for (var i = 1; i < values.length; i++) {
    inputs[i - 1] = map(Number(values[i]), 0, 255, 0, 0.99) + 0.01;
  }

  // The first spot is the class
  var label = Number(values[0]);

  // Run the data through the network
  var outputs = nn.query(inputs);

  // Find the index with the highest probability
  var guess = findMax(outputs);

  // Was the network right or wrong?
  var correct = false;
  if (guess == label) {
    correct = true;
  }

  // Switch to a new testing data point every so often
  if (frameCount % 30 == 0) {
    testingIndex++;
    if (testingIndex == testing.length) {
      testingIndex = 0;
    }
  }

  // For reporting in draw return the results
  return [inputs, label, correct];

}

// A function to find the maximum value in an array
function findMax(list) {

  // Highest so far?
  var record = 0;
  var index = 0;
  // Check every element
  for (var i = 0; i < list.length; i++) {
    // Higher?
    if (list[i] > record) {
      record = list[i];
      index = i;
    }
  }
  // Return index of highest
  return index;
}
