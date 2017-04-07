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
      this.matrix[i][j] = 2; //randomGaussian();
    }
  }
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



Matrix.prototype.setA = function() {
  this.matrix = [
    [-0.3552989, 0.42279678, -0.01449485],
    [0.13459197, -1.55088288, -0.11870999],
    [-0.0786683, -0.39298027, -0.09739265]
  ];
}

Matrix.prototype.setB = function() {
  this.matrix = [
    [0.51771456, 0.1930628, -0.09438124],
    [0.64838142, -0.70872041, -0.53059963],
    [-0.77339891, 0.08266008, 0.08499081]
  ];
}
