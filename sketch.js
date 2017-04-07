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

  var epochs = 5;

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

  // test the neural network

  // scorecard for how well the network performs, initially empty
  var scorecard = [];
  // go through all the records in the test data set
  for(var j = 0; j < testing.length; j++) {
    var all_values = testing[j].split(',');
    var correct_label = floor(Number(all_values[0]));
    // scale and shift the inputs
    var inputs = [];
    for (var k = 1; k < all_values.length; k++) {
      inputs[k - 1] = map(Number(all_values[i]), 0, 255, 0, 0.99) + 0.01;
    }
    var outputs = nn.query(inputs).toArray();
    // # the index of the highest value corresponds to the label


    label = findMax(outputs);
    console.log(label, correct_label);
    // append correct or incorrect to list
    if (label == correct_label) {
      // network's answer matches correct answer, add 1 to scorecard
      scorecard.push(1);
    } else {
      // network 's answer doesn't match correct answer, add 0 to scorecard
      scorecard.push(0);
    }
  }

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
