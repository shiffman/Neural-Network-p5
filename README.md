# Simple Artificial Neural Network JavaScript library

This repository is a library for creating simple vanilla 3-layer ANNs in JavaScript. I'm using it for the second edition of the [Nature of Code](http://natureofcode.com/) book, as well as examples for my ITP course: [Intelligence and Learning](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning).

At the moment this library is depends on [p5.js](http://p5js.org). However, it's my intention to remove this dependency for the library itself (while still making examples using p5): [#10](https://github.com/shiffman/Neural-Network-p5/issues/10). I also intend to port this library to Java for [Processing](http://processing.org): [#11](https://github.com/shiffman/Neural-Network-p5/issues/11).

Finally, this library has a terribly inefficient matrix implementation and should likely include options for using [math.js](http://mathjs.org/) and/or [gpu.js](http://gpu.rocks/).

The code is based on the book [Make Your Own Neural Network](http://amzn.to/2oRW1ax) by Tariq Rashid ([book source code](https://github.com/makeyourownneuralnetwork)).

## Example Demos

* [Training on MNIST digits](https://shiffman.github.io/Neural-Network-p5/examples/mnist/)
* [NeuroEvolution and Flappy Bird](https://shiffman.github.io/Neural-Network-p5/examples/neuro-evolution/flappy/)
* [NeuroEvolution and Steering](https://shiffman.github.io/Neural-Network-p5/examples/neuro-evolution/steering/)

The neuro-evolution examples are inspired by the [chrome experiment Flappy Learning](https://www.chromeexperiments.com/experiment/flappylearning) by [xviniette](http://github.com/xviniette).

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

By default, the library will use a [sigmoid](https://en.wikipedia.org/wiki/Sigmoid_function) activation function. However, you can select other activation functions as follows ([tanh](https://reference.wolfram.com/language/ref/Tanh.html) only at the moment)):

```javascript
var nn = new NeuralNetwork(inputs, hidden, outputs, 'sigmoid');
```


```javascript
var nn = new NeuralNetwork(inputs, hidden, outputs, 'tanh');
```
