// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on "Make Your Own Neural Network" by Tariq Rashid
// https://github.com/makeyourownneuralnetwork/

// This is my own ridiculous Matrix implemenation
// Would probably make more sense to use math.js or something else!

class Matrix extends Float32Array {
  constructor(cols, rows) { // Make a matrix full of zeros
    super(cols * rows);
    this.cols = cols;
    this.rows = rows;
  }
  map(func) { // Takes a function and applies it to all values in the matrix
    for (let n = 0; n < this.length; n++) {
      this[n] = func(this[n], n / this.cols | 0, n % this.cols, n);
    }
  }
  randomize(min = 0, max = 1) { // This fills the matrix with random values (inclusive, exclusive)
    this.map(() => Math.random() * (max - min) + min);
  }
  toArray() { // Take the matrix and make it a 1 dimensional array
    return Array.from(this);
  }
  add(a) { // This adds another matrix or a single value
    if (a instanceof Matrix) { // Are we trying to add a Matrix?
      this.map((v, x, y, n) => v + a[n]);
    } else { // Or just a single scalar value?
      this.map(v => v + a);
    }
  }
  multiply(a) { // This multiplies another matrix or a single value, different than the dot() function!
    if (a instanceof Matrix) { // Are we trying to multiply a Matrix?
      this.map((v, x, y, n) => v * a[n]);
    } else { // Or just a single scalar value?
      this.map(v => v * a);
    }
  }
  print() {
    let arr = [];
    for (let y = 0; y < this.rows; y++) {
      let row = [];
      arr.push(row);
      for (let x = 0; x < this.cols; x++) {
        row.push(this[x + y * this.cols]);
      }
    }
    console.table(arr);
  }
  // These are some static functions to operate on a matrix
  static copy(a) { // This makes a copy of the matrix
    let result = new Matrix(a.cols, a.rows);
    result.map((v, x, y, n) => a[n]);
    return result;
  }
  static transpose(a) { // This transposes a matrix, cols X rows --> rows X cols
    let result = new Matrix(a.rows, a.cols);
    result.map((v, x, y) => a[x + y * a.cols]);
    return result;
  }
  static subtract(a, b) { // Subtracts one matrix from another
    let result = new Matrix(a.cols, a.rows);
    result.map((v, x, y, n) => a[n] - b[n]);
    return result;
  }
  static dot(a, b) { // Multiplies two matrices together
    if (a.rows != b.cols) { // Won't work if columns of A don't equal columns of B
      throw new Error("Incompatible matrix sizes!");
    }
    let result = new Matrix(a.rows, b.cols); // Make a new matrix
    result.map((v, x, y) => { // Sum all the rows of A times columns of B
      let sum = 0;
      for (let z = 0; z < a.cols; z++) {
        sum += a[z + y * a.cols] * b[x + z * b.cols];
      }
      return sum;
    });
    return result;
  }
  static fromArray(arr, cols = arr.length) { // Turn a 1 dimensional array into a matrix
    let result = new Matrix(cols, arr.length / cols);
    result.map((v, x, y, n) => arr[n]);
    return result;
  }
  static visualize(a, id) { // Visualize the matrix in the browser window
    let table;
    if (id) {
      if (typeof id !== "string") {
        throw new Error(`Invalid argument type (expected string, received ${typeof idSelector})`);
      }
      table = document.getElementById(id); // select table by id
      if (table === null) { // otherwise create new table if not exists
        table = document.createElement("table");
        table.id = id;
        document.body.appendChild(table);
      }
      table.innerHTML = ""; // clear
    } else { // append table without id to body
      table = document.createElement("table");
      document.body.appendChild(table);
    }
    table.className = "vis-matrix";
    table.style = "margin: 5px; padding: 4px 10px; border-left: 2px solid black; border-right: 2px solid black; border-radius: 20px;";
    for (let y = 0; y < a.rows; y++) {
      let row = document.createElement("tr");
      for (let x = 0; x < a.cols; x++) {
        let cell = document.createElement("td");
        cell.textContent = a[x + y * a.cols];
        cell.style = "padding: 3px 8px; text-align: center; color: black;";
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }
}
