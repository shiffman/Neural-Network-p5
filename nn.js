// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on "Make Your Own Neural Network" by Tariq Rashid
// https://github.com/makeyourownneuralnetwork/

// Sigmoid function
// This is used for activation
// https://en.wikipedia.org/wiki/Sigmoid_function
function sigmoid(x) {
  var y = 1 / (1 + pow(Math.E, -x));
  return y;
}


// Neural Network constructor function
function NeuralNetwork(inputnodes, hiddennodes, outputnodes, learningrate) {

  // Number of nodes in layer (input, hidden, output)
  // This network is limited to 3 layers
  this.inodes = inputnodes;
  this.hnodes = hiddennodes;
  this.onodes = outputnodes;

  // These are the weight matrices
  // wih: weights from input to hidden
  // who: weights from hidden to output
  // weights inside the arrays are w_i_j
  // where link is from node i to node j in the next layer
  // Matrix is rows X columns
  this.wih = new Matrix(this.hnodes, this.inodes);
  this.who = new Matrix(this.onodes, this.hnodes);

  // Start with random values
  this.wih.randomize();
  this.who.randomize();

  // Learning rate
  this.lr = learningrate;
}

// Train the network with inputs and targets
NeuralNetwork.prototype.train = function(inputs_array, targets_array) {

  // Turn input and target arrays into matrices
  var inputs = Matrix.fromArray(inputs_array);
  var targets = Matrix.fromArray(targets_array);

  // The input to the hidden layer is the weights (wih) multiplied by inputs
  var hidden_inputs = Matrix.dot(this.wih, inputs);
  // The outputs of the hidden layer pass through sigmoid activation function
  var hidden_outputs = Matrix.map(hidden_inputs, sigmoid);

  // The input to the output layer is the weights (who) multiplied by hidden layer
  var output_inputs = Matrix.dot(this.who, hidden_outputs);

  // The output of the network passes through sigmoid activation function
  var outputs = Matrix.map(output_inputs, sigmoid);

  // Error is TARGET - OUTPUT
  var output_errors = Matrix.subtract(targets, outputs);

  // Now we are starting back propogation

  // Transpose hidden <-> output weights
  var whoT = this.who.transpose();
  // Hidden errors is output error multiplied by weights (who)
  var hidden_errors = Matrix.dot(whoT, output_errors)

  // Calculate the gradient, this is much nicer in python!
  var gradient_output = output_errors.copy();
  gradient_output.multiply(outputs);

  // 1 - final_outputs
  function inversion(x) {
    return 1 - x;
  }
  var final_outputs_invert = Matrix.map(outputs, inversion);
  gradient_output.multiply(final_outputs_invert);
  // Learning rate
  gradient_output.multiply(this.lr);

  // Transpose hidden outputs
  var hidden_outputs_T = hidden_outputs.transpose();

  // Change in weights

  // Next layer, back propogation!
  var gradient_hidden = hidden_errors.copy();
  gradient_hidden.multiply(hidden_outputs);
  var hidden_outputs_invert = Matrix.map(hidden_outputs, inversion);
  gradient_hidden.multiply(hidden_outputs_invert);
  gradient_hidden.multiply(this.lr);

  var inputs_T = inputs.transpose();

  var deltaW_output = Matrix.dot(gradient_output, hidden_outputs_T);
  this.who.add(deltaW_output);
  var deltaW_hidden = Matrix.dot(gradient_hidden, inputs_T);
  this.wih.add(deltaW_hidden);
}


NeuralNetwork.prototype.query = function(inputs_array) {

  var inputs = Matrix.fromArray(inputs_array);

  var hidden_inputs = Matrix.dot(this.wih, inputs);
  var hidden_outputs = Matrix.map(hidden_inputs, sigmoid);

  var final_inputs = Matrix.dot(this.who, hidden_outputs);

  // Final output
  var final_outputs = Matrix.map(final_inputs, sigmoid);

  return final_outputs.toArray();
}
