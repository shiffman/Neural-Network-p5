// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on:
// https://github.com/makeyourownneuralnetwork/makeyourownneuralnetwork/

function NeuralNetwork(inputnodes, hiddennodes, outputnodes, learningrate) {

  // Set number of nodes in each input, hidden, output layer
  this.inodes = inputnodes;
  this.hnodes = hiddennodes;
  this.onodes = outputnodes;

  // link weight matrices, wih and who
  // weights inside the arrays are w_i_j, where link is from node i to node j in the next layer
  // w11 w21
  // w12 w22 etc
  this.wih = new Matrix(this.hnodes, this.inodes);
  this.who = new Matrix(this.onodes, this.hnodes);
  this.wih.randomize();
  this.who.randomize();
  // this.wih.log();
  // this.who.log();

  // learning rate
  this.lr = learningrate;

}

function sigmoid(x) {
  var y = 1 / (1 + pow(Math.E, -x));
  return y;
}



NeuralNetwork.prototype.train = function(inputs_array, targets_array) {

  var inputs = Matrix.fromArray(inputs_array);
  var targets = Matrix.fromArray(targets_array);

  var hidden_inputs = Matrix.dot(this.wih, inputs);
  var hidden_outputs = Matrix.map(hidden_inputs, sigmoid);

  var final_inputs = Matrix.dot(this.who, hidden_outputs);

  // Final output
  var final_outputs = Matrix.map(final_inputs, sigmoid);

  // Errors!
  var output_errors = Matrix.subtract(targets, final_outputs);

  // Transpose hidden <-> output weights
  var whoT = this.who.transpose();

  // Hidden errors
  var hidden_errors = Matrix.dot(whoT, output_errors)

  // Calculate the gradient, this is much nicer in python!
  var gradient_output = output_errors.copy();
  gradient_output.multiply(final_outputs);

  // 1 - final_outputs
  function inversion(x) {
    return 1 - x;
  }
  var final_outputs_invert = Matrix.map(final_outputs, inversion);
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
  var targets = Matrix.fromArray(targets_array);

  var hidden_inputs = Matrix.dot(this.wih, inputs);
  var hidden_outputs = Matrix.map(hidden_inputs, sigmoid);

  var final_inputs = Matrix.dot(this.who, hidden_outputs);

  // Final output
  var final_outputs = Matrix.map(final_inputs, sigmoid);

  return final_outputs;
}
