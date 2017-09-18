// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on "Make Your Own Neural Network" by Tariq Rashid
// https://github.com/makeyourownneuralnetwork/

// This is my own ridiculous Matrix implemenation
// Would probably make more sense to use math.js or something else!

/**
 * Make a matrix full of zeros
 * @param {Number} rows 
 * @param {Number} cols 
 * @return {Matrix}
 */
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

/**
 * Returns a random number between min and max
 * @param {Number} min 
 * @param {Number} max 
 * @return {Number}
 */
function random(min, max) {
	return Math.random() * (max - min) + min
}

/**
 * This fills the matrix with random values (gaussian distribution)
 */
Matrix.prototype.randomize = function () {
	for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			// this.matrix[i][j] = randomGaussian();
			this.matrix[i][j] = random(-1, 1);
		}
	}
}

/**
 * Take the matrix and make it a 1 dimensional array
 * @return {Array}
 */
Matrix.prototype.toArray = function () {

	// Add all the values to the array
	var arr = [];
	for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			arr.push(this.matrix[i][j]);
		}
	}
	return arr;
}

/**
 * This transposes a matrix
 * rows X cols --> cols X rows
 * @return {Matrix}
 */
Matrix.prototype.transpose = function () {
	var result = new Matrix(this.cols, this.rows);
	for (var i = 0; i < result.rows; i++) {
		for (var j = 0; j < result.cols; j++) {
			result.matrix[i][j] = this.matrix[j][i];
		}
	}
	return result;
}

/**
 * This makes a copy of the matrix
 * @return {Matrix}
 */
Matrix.prototype.copy = function () {
	var result = new Matrix(this.rows, this.cols);
	for (var i = 0; i < result.rows; i++) {
		for (var j = 0; j < result.cols; j++) {
			result.matrix[i][j] = this.matrix[i][j];
		}
	}
	return result;
}

/**
 * This adds another matrix or a single value
 * @param {Matrix} other
 */
Matrix.prototype.add = function (other) {
	if (other instanceof Matrix) {

		// Are we trying to add a Matrix?
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				this.matrix[i][j] += other.matrix[i][j];
			}
		}
	} else {

		// Or just a single scalar value?
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				this.matrix[i][j] += other;
			}
		}
	}
}

/**
 * This multiplies another matrix or a single value
 * This is different than the dot() function!
 * @param {Matrix} other
 */
Matrix.prototype.multiply = function (other) {
	if (other instanceof Matrix) {

		// Are we trying to multiply a Matrix?
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				this.matrix[i][j] *= other.matrix[i][j];
			}
		}
	} else {

		// Or just a single scalar value?
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				this.matrix[i][j] *= other;
			}
		}
	}
}

/**
 * This is the trickiest one
 * Takes a function and applies it to all values in the matrix
 * @param {Matrix} m
 * @param {Function} fn
 */
Matrix.map = function (m, fn) {
	var result = new Matrix(m.rows, m.cols);
	for (var i = 0; i < result.rows; i++) {
		for (var j = 0; j < result.cols; j++) {
			result.matrix[i][j] = fn(m.matrix[i][j]);
		}
	}
	return result;
}

/**
 * Subtracts one matrix from another
 * @param {Matrix} a
 * @param {Matrix} b
 * @return {Matrix}
 */
Matrix.subtract = function (a, b) {
	var result = new Matrix(a.rows, a.cols);
	for (var i = 0; i < result.rows; i++) {
		for (var j = 0; j < result.cols; j++) {
			result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
		}
	}
	return result;
}

/**
 * Multiplies two matrices together
 * @param {Matrix} a
 * @param {Matrix} b
 * @return {Matrix}
 */
Matrix.dot = function (a, b) {

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

/**
 * Turn a 1 dimensional array into a matrix
 * @param {Array}
 * @return {Matrix}
 */
Matrix.fromArray = function (array) {
	var m = new Matrix(array.length, 1);
	for (var i = 0; i < array.length; i++) {
		m.matrix[i][0] = array[i];
	}
	return m;
}