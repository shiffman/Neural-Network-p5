// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on "Make Your Own Neural Network" by Tariq Rashid
// https://github.com/makeyourownneuralnetwork/

Matrix.transpose = function(array) {
  var m = new Matrix(1, array.length);
  for (var i = 0; i < array.length; i++) {
    m.matrix[0][i] = array[i];
  }
  console.log(m);
  return m;
}

Matrix.map = function(m, fn) {
  var result = new Matrix(m.rows, m.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = fn(m.matrix[i][j]);
    }
  }
  return result;
}

Matrix.subtract = function(a, b) {
  var result = new Matrix(a.rows, a.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
    }
  }
  return result;
}


Matrix.dot = function(a, b) {
  if (a.cols != b.rows) {
    console.log("error: incompatible sizes");
  }
  var result = new Matrix(a.rows, b.cols);
  for (var i = 0; i < a.rows; i++) {
    for (var j = 0; j < b.cols; j++) {
      var sum = 0;
      for (var k = 0; k < a.cols; k++) {
        sum += a.matrix[i][k] * b.matrix[k][j];
      }
      result.matrix[i][j] = sum;
    }
  }
  return result;
}



Matrix.fromArray = function(array) {
  var m = new Matrix(array.length, 1);
  for (var i = 0; i < array.length; i++) {
    m.matrix[i][0] = array[i];
  }
  return m;
}

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

Matrix.prototype.randomize = function() {
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = randomGaussian();
    }
  }
}

Matrix.prototype.toArray = function() {
  var arr = [];
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      arr.push(this.matrix[i][j]);
    }
  }
  return arr;
}


Matrix.prototype.log = function() {
  var s = ''
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      //s += nf(this.matrix[i][j], 2, 2) + ' ';
      s += this.matrix[i][j] + ' ';
    }
    s += '\n';
  }
  console.log(s);
}



Matrix.prototype.transpose = function() {
  var result = new Matrix(this.cols, this.rows);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[j][i];
    }
  }
  return result;
}

Matrix.prototype.copy = function() {
  var result = new Matrix(this.rows, this.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[i][j];
    }
  }
  return result;
}

Matrix.prototype.add = function(other) {
  if (other instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += other.matrix[i][j];
      }
    }
  } else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += other;
      }
    }
  }
}

Matrix.prototype.multiply = function(other) {
  if (other instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= other.matrix[i][j];
      }
    }
  } else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= other;
      }
    }
  }
}
