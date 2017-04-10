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

// This is the Sigmoid derivative!
function dSigmoid(x) {
  return x * (1 - x);
}

// Reverse sigmoid
function logit(y) {
  return log(y / (1 - y));
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

  // Now we are starting back propogation!

  // Transpose hidden <-> output weights
  var whoT = this.who.transpose();
  // Hidden errors is output error multiplied by weights (who)
  var hidden_errors = Matrix.dot(whoT, output_errors)

  // Calculate the gradient, this is much nicer in python!
  var gradient_output = Matrix.map(outputs, dSigmoid);
  // Weight by errors and learing rate
  gradient_output.multiply(output_errors);
  gradient_output.multiply(this.lr);

  // Gradients for next layer, more back propogation!
  var gradient_hidden = Matrix.map(hidden_outputs, dSigmoid);
  // Weight by errors and learning rate
  gradient_hidden.multiply(hidden_errors);
  gradient_hidden.multiply(this.lr);

  // Change in weights from HIDDEN --> OUTPUT
  var hidden_outputs_T = hidden_outputs.transpose();
  var deltaW_output = Matrix.dot(gradient_output, hidden_outputs_T);
  this.who.add(deltaW_output);

  // Change in weights from INPUT --> HIDDEN
  var inputs_T = inputs.transpose();
  var deltaW_hidden = Matrix.dot(gradient_hidden, inputs_T);
  this.wih.add(deltaW_hidden);
}


// Query the network!
NeuralNetwork.prototype.query = function(inputs_array) {

  // Turn input array into a matrix
  var inputs = Matrix.fromArray(inputs_array);

  // The input to the hidden layer is the weights (wih) multiplied by inputs
  var hidden_inputs = Matrix.dot(this.wih, inputs);
  // The outputs of the hidden layer pass through sigmoid activation function
  var hidden_outputs = Matrix.map(hidden_inputs, sigmoid);

  // The input to the output layer is the weights (who) multiplied by hidden layer
  var output_inputs = Matrix.dot(this.who, hidden_outputs);

  // The output of the network passes through sigmoid activation function
  var outputs = Matrix.map(output_inputs, sigmoid);

  // Return the result as an array
  return outputs.toArray();
}


NeuralNetwork.prototype.backquery = function(targets_array) {
  // backquery the neural network
  // we'll use the same termnimology to each item,
  // eg target are the values at the right of the network, albeit used as input
  // eg hidden_output is the signal to the right of the middle nodes
  // transpose the targets list to a vertical array
  var final_outputs = Matrix.fromArray(targets_array);

  // calculate the signal into the final output layer
  var final_inputs = Matrix.map(final_outputs, logit);

  // calculate the signal out of the hidden layer
  var whoT = this.who.transpose();
  var hidden_outputs = Matrix.dot(whoT, final_inputs);

  // scale them back to 0.01 to .99
  // Normalize
  var min = hidden_outputs.min();
  hidden_outputs.add(-min);
  var max = hidden_outputs.max();
  hidden_outputs.multiply(1 / max);
  hidden_outputs.multiply(0.98);
  hidden_outputs.add(0.01);

  // calculate the signal into the hideen layer
  var hidden_inputs = Matrix.map(hidden_outputs, logit);

  // calculate the signal out of the input layer
  var wihT = this.wih.transpose();
  var inputs = Matrix.dot(wihT, hidden_inputs);

  // Normalize
  var min = inputs.min();
  inputs.add(-min);
  var max = inputs.max();
  inputs.multiply(1 / max);
  inputs.multiply(0.98);
  inputs.add(0.01);

  return inputs.toArray();
}
