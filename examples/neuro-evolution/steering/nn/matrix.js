// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on "Make Your Own Neural Network" by Tariq Rashid
// https://github.com/makeyourownneuralnetwork/

// This is my own ridiculous Matrix implemenation
// Would probably make more sense to use math.js or something else!

// Make a matrix full of zeros
function Matrix(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.matrix = new Array(rows);
  for (var i = 0; i < this.rows; i++) {
    this.matrix[i] = new Array(cols);
    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = 0;
    }
  }
}

// This fills the matrix with random values (gaussian distribution)
Matrix.prototype.randomize = function() {
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = randomGaussian();
      //this.matrix[i][j] = random(-1, 1);
    }
  }
}

// Take the matrix and make it a 1 dimensional array
Matrix.prototype.toArray = function() {
  // Add all the values to the array
  var arr = [];
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      arr.push(this.matrix[i][j]);
    }
  }
  return arr;
}


// This transposes a matrix
// rows X cols --> cols X rows
Matrix.prototype.transpose = function() {
  var result = new Matrix(this.cols, this.rows);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[j][i];
    }
  }
  return result;
}

// This makes a copy of the matrix
Matrix.prototype.copy = function() {
  var result = new Matrix(this.rows, this.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[i][j];
    }
  }
  return result;
}

// This adds another matrix or a single value
Matrix.prototype.add = function(other) {
  // Are we trying to add a Matrix?
  if (other instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += other.matrix[i][j];
      }
    }
    // Or just a single scalar value?
  } else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += other;
      }
    }
  }
}

// This multiplies another matrix or a single value
// This is different than the dot() function!
Matrix.prototype.multiply = function(other) {
  // Are we trying to multiply a Matrix?
  if (other instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= other.matrix[i][j];
      }
    }
    // Or just a single scalar value?
  } else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= other;
      }
    }
  }
}


// These are some static functions to operate on a matrix

// This is the trickiest one
// Takes a function and applies it to all values in the matrix
Matrix.map = function(m, fn) {
  var result = new Matrix(m.rows, m.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = fn(m.matrix[i][j]);
    }
  }
  return result;
}

// Subtracts one matrix from another
Matrix.subtract = function(a, b) {
  var result = new Matrix(a.rows, a.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
    }
  }
  return result;
}


// Multiplies two matrices together
Matrix.dot = function(a, b) {
  // Won't work if columns of A don't equal columns of B
  if (a.cols != b.rows) {
    console.log("Incompatible matrix sizes!");
    return;
  }
  // Make a new matrix
  var result = new Matrix(a.rows, b.cols);
  for (var i = 0; i < a.rows; i++) {
    for (var j = 0; j < b.cols; j++) {
      // Sum all the rows of A times columns of B
      var sum = 0;
      for (var k = 0; k < a.cols; k++) {
        sum += a.matrix[i][k] * b.matrix[k][j];
      }
      // New value
      result.matrix[i][j] = sum;
    }
  }
  return result;
}


// Turn a 1 dimensional array into a matrix
Matrix.fromArray = function(array) {
  var m = new Matrix(array.length, 1);
  for (var i = 0; i < array.length; i++) {
    m.matrix[i][0] = array[i];
  }
  return m;
}
