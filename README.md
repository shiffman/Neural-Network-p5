# Simple Artificial Neural Network JavaScript library

This repository is a library for creating simple vanilla 3-layer ANNs in JavaScript. I'm using it for the second edition of the [Nature of Code](http://natureofcode.com/) book, as well as examples for my ITP course: [Intelligence and Learning](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning).

The code is based on the book [Make Your Own Neural Network](http://amzn.to/2oRW1ax) by Tariq Rashid ([book source code](https://github.com/makeyourownneuralnetwork)).

## Example Demos

* [Training on MNIST digits](https://shiffman.github.io/Neural-Network-p5/examples/mnist/)
* [NeuroEvolution and Flappy Bird](https://shiffman.github.io/Neural-Network-p5/examples/neuro-evolution/flappy/)
* [NeuroEvolution and Steering](https://shiffman.github.io/Neural-Network-p5/examples/neuro-evolution/steering/)

## Use

```javascript
// Creating a Neural Network with # of inputs, hidden neurons, and outputs
var inputs = 4;
var hidden = 16;
var outputs = 2;
var nn = new NeuralNetwork(inputs, hidden, outputs);

// Training the Neural Network with inputs and known outputs
var inputs = [-0.3, 0.5, 0.3, 0.2];
var targets = [0.99, 0.01];
nn.train(inputs, targets);

// Querying the Neural Network with inputs
var inputs = [-0.3, 0.5, 0.3, 0.2];
var prediction = nn.query(inputs);
```
