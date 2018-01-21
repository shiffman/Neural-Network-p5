// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on "Make Your Own Neural Network" by Tariq Rashid
// https://github.com/makeyourownneuralnetwork/

// This version of nn.js adds some functionality for evolution
// copy() and mutate()

// Sigmoid function
// This is used for activation
// https://en.wikipedia.org/wiki/Sigmoid_function
NeuralNetwork.sigmoid = function(x) {
  var y = 1 / (1 + pow(Math.E, -x));
  return y;
}

// This is the Sigmoid derivative!
NeuralNetwork.dSigmoid = function(x) {
  return x * (1 - x);
}

NeuralNetwork.tanh = function(x) {
  var y = Math.tanh(x);
  return y;
}

NeuralNetwork.dtanh = function(x) {
  var y = 1 / (pow(Math.cosh(x), 2));
  return y;
}

// This is how we adjust weights ever so slightly
function mutate(x) {
  if (random(1) < 0.1) {
    var offset = randomGaussian() * 0.5;
    // var offset = random(-0.1, 0.1);
    var newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

// Neural Network constructor function
function NeuralNetwork(inputnodes, hiddennodes, outputnodes, learning_rate, activation) {

  // If it's a copy of another NN
  if (arguments[0] instanceof NeuralNetwork) {
    var nn = arguments[0];
    this.inodes = nn.inodes;
    this.hnodes = nn.hnodes;
    this.onodes = nn.onodes;
    this.wih = nn.wih.copy();
    this.who = nn.who.copy();
    this.activation = nn.activation;
    this.derivative = nn.derivative;
    this.lr = this.lr;
  } else {
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

    // Default learning rate of 0.1
    this.lr = learning_rate || 0.1;

    // Activation Function
    if (activation == 'tanh') {
      this.activation = NeuralNetwork.tanh;
      this.derivative = NeuralNetwork.dtanh;
    } else {
      this.activation = NeuralNetwork.sigmoid;
      this.derivative = NeuralNetwork.dSigmoid;
    }

  }

}

NeuralNetwork.prototype.copy = function() {
  return new NeuralNetwork(this);
}

NeuralNetwork.prototype.mutate = function() {
  this.wih = Matrix.map(this.wih, mutate);
  this.who = Matrix.map(this.who, mutate);
}

// Train the network with inputs and targets
NeuralNetwork.prototype.train = function(inputs_array, targets_array) {

  // Turn input and target arrays into matrices
  var inputs = Matrix.fromArray(inputs_array);
  var targets = Matrix.fromArray(targets_array);

  // The input to the hidden layer is the weights (wih) multiplied by inputs
  var hidden_inputs = Matrix.dot(this.wih, inputs);
  // The outputs of the hidden layer pass through sigmoid activation function
  var hidden_outputs = Matrix.map(hidden_inputs, this.activation);

  // The input to the output layer is the weights (who) multiplied by hidden layer
  var output_inputs = Matrix.dot(this.who, hidden_outputs);

  // The output of the network passes through sigmoid activation function
  var outputs = Matrix.map(output_inputs, this.activation);

  // Error is TARGET - OUTPUT
  var output_errors = Matrix.subtract(targets, outputs);

  // Now we are starting back propogation!

  // Transpose hidden <-> output weights
  var whoT = this.who.transpose();
  // Hidden errors is output error multiplied by weights (who)
  var hidden_errors = Matrix.dot(whoT, output_errors)

  // Calculate the gradient, this is much nicer in python!
  var gradient_output = Matrix.map(outputs, this.derivative);
  // Weight by errors and learing rate
  gradient_output.multiply(output_errors);
  gradient_output.multiply(this.lr);

  // Gradients for next layer, more back propogation!
  var gradient_hidden = Matrix.map(hidden_outputs, this.derivative);
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
  var hidden_outputs = Matrix.map(hidden_inputs, this.activation);

  // The input to the output layer is the weights (who) multiplied by hidden layer
  var output_inputs = Matrix.dot(this.who, hidden_outputs);

  // The output of the network passes through sigmoid activation function
  var outputs = Matrix.map(output_inputs, this.activation);

  // Return the result as an array
  return outputs.toArray();
}



NeuralNetwork.prototype.visualize = function(){
  let scriptSources = [...document.getElementsByTagName('script')].filter(script => script.getAttribute("src")).map((elem)=>elem.getAttribute("src"));
  for (let scriptSource of scriptSources){
    if (scriptSource.includes("p5")) this.p5source = scriptSource;
  }


  let confirm = document.createElement("button");
  confirm.setAttribute("onclick", `viz();`);
  confirm.style = `float:right;margin: -75px 50px 0 0;color:white;padding:20px;background-color:#ff77e3;border:none;cursor:pointer;font-size:15px;`;  
  confirm.innerText = "Visualize Network";
  document.body.appendChild(confirm);


  let step = -75;
  let id = setInterval(fadeIn, 2);
  function fadeIn(){
    if (step == 25){
      clearInterval(id);
    } else {
      step++;
      confirm.style.marginTop = step;
    }
  }


}

function viz(){
  let w = window.open("", null, `height=${window.innerHeight/1.25}
    ,width=${window.innerWidth/1.25},status=yes,toolbar=no,menubar=no,location=no`);
  w.document.title = "Neural Network";

  w.document.body.style.backgroundColor = '#f7f5d9';

  let p5js_src = w.document.createElement("script");
  p5js_src.src = String(window.location).replace(/\/[^\/]+?(\.[^\/]+)$/, `/${nn.p5source}`);
  p5js_src.type = "text/javascript";
  w.document.head.appendChild(p5js_src);

  let p5js_script = w.document.createElement("script");
  p5js_script.innerHTML = `
  function Node(x,y,radius){
    this.x = x;
    this.y = y;
    this.r = radius;
  }

  Node.prototype.show = function(){
    ellipse(this.x, this.y, this.r);
  }

  function setup(){
    let nodeData = [];

    let ww = ${window.innerWidth/1.25};
    let wh = ${window.innerHeight/1.25}

    createCanvas(ww,wh);
    background("#f7f5d9");
    fill("#f28ee6");

    let nodes = [${nn.inodes}, ${nn.hnodes}, ${nn.onodes}];
    for (var i=0;i<nodes.length;i++) nodeData.push([]);
    for (var i=0;i<nodes.length;i++){
      for (var l=0;l<nodes[i];l++){
          let x = (ww/nodes.length)*i+(ww/(nodes.length*2));
          let y = (wh/nodes[i])*l + (wh/(nodes[i]*2.5));
          let r = 50;
          let n = new Node(x,y,r);
          nodeData[i].push(n);

      }

    }

  let totals = [${String(nn.wih.matrix)}].concat([${String(nn.who.matrix)}])
  totals.sort((a,b) => a-b);

  let weights = [${JSON.stringify(nn.wih.matrix)}, ${JSON.stringify(nn.who.matrix)}];
  for (var sect=0;sect<weights.length;sect++){
    for (var row=0;row<weights[sect].length;row++){
      for (var dpt=0;dpt<weights[sect][row].length;dpt++){
        let val = weights[sect][row][dpt];
        let input_map = dpt;
        let output_map = row;

        let inputs = nodeData[sect];
        let outputs = nodeData[sect + 1];

        let min = totals[0];
        let max = totals[totals.length-1];
        console.log(min,max);

        strokeWeight(map(val, min, max, 0, 2));
        line(inputs[input_map].x, inputs[input_map].y, outputs[output_map].x, outputs[output_map].y);
        
      }
    }
  }

  strokeWeight(1);
  for (var i=0;i<nodeData.length;i++){
    for (let node of nodeData[i]){
      node.show();
    }
  }
  

  };
  `
  w.document.body.append(p5js_script);

}

