// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

var nn;

var training;
var testing;

function preload() {
  training = loadStrings('data/mnist_train_100.csv');
  testing = loadStrings('data/mnist_test_10.csv');
}

function setup() {

  // var nn = new NeuralNetwork(3, 3, 3, 0.3);
  // var prediction = nn.query([1, 1, 1]);
  // console.log(prediction);
  // nn.train([1, 2, 3], [5, 5, 5]);


  // number of input, hidden and output nodes
  var input_nodes = 784;
  var hidden_nodes = 200;
  var output_nodes = 10;

  // learning rate
  learning_rate = 0.1;

  // create instance of neural network
  nn = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate)

  epochs = 10

  for (var i = 0; i < epochs; i++) {
    console.log('Epoch: ' + i);
    // go through all records in the training data set
    for (var j = 0; j < training.length; j++) {
      // split the record by the ',' commas
      var all_values = training[i].split(',');
      var inputs = [];
      for (var k = 1; k < all_values.length; k++) {
        inputs[k - 1] = map(Number(all_values[i]), 0, 255, 0, 0.99) + 0.01;
      }
      targets = new Array(output_nodes);
      for (var k = 0; k < targets.length; k++) {
        targets[k] = 0.01;
      }
      targets[floor(Number(all_values[0]))] = 0.99;
      //console.log(targets);
      nn.train(inputs, targets)
    }
  }

  for (var j = 0; j < training.length; j++) {
    // split the record by the ',' commas
    var all_values = training[i].split(',');
    var inputs = [];
    for (var k = 1; k < all_values.length; k++) {
      inputs[k - 1] = map(Number(all_values[i]), 0, 255, 0, 0.99) + 0.01;
    }
    //nn.query(inputs).log();
  }
}
