// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

var nn;

function setup() {
  nn = new NeuralNetwork(3, 3, 3, 0.3);

  //var prediction = nn.query([1, 1, 1]);
  //console.log(prediction);
  nn.train([1, 2, 3], [5, 5, 5]);

}
