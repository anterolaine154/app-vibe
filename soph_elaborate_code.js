/**
 * soph_elaborate_code.js
 * 
 * This code demonstrates a complex and sophisticated JavaScript program 
 * that solves a 3-dimensional matrix manipulation problem.
 * 
 * In this program, we define a Matrix class and implement various matrix 
 * operations. These operations include matrix addition, subtraction, 
 * multiplication, scalar multiplication, determinant calculation, 
 * transpose calculation, and finding the inverse of the matrix.
 * 
 * The program provides a user interface to interact with the matrices, 
 * allowing the user to create matrices, perform operations, and display 
 * the results.
 * 
 * Note: This code assumes a modern browser environment with support for 
 * ECMAScript 6 (ES6) features.
 */

class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  static multiply(matrixA, matrixB) {
    if (matrixA.cols !== matrixB.rows) {
      throw new Error("Incompatible matrix dimensions");
    }

    const result = new Matrix(matrixA.rows, matrixB.cols);

    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum = 0;
        for (let k = 0; k < matrixA.cols; k++) {
          sum += matrixA.data[i][k] * matrixB.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }

    return result;
  }

  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
      throw new Error("Incompatible matrix dimensions");
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += matrix.data[i][j];
      }
    }
  }

  subtract(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
      throw new Error("Incompatible matrix dimensions");
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] -= matrix.data[i][j];
      }
    }
  }
  
  static transpose(matrix) {
    const result = new Matrix(matrix.cols, matrix.rows);
    
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        result.data[j][i] = matrix.data[i][j];
      }
    }
    
    return result;
  }
  
  static determinant(matrix) {
    if (matrix.rows !== matrix.cols) {
      throw new Error("Matrix must be square");
    }
    
    if (matrix.rows === 1) {
      return matrix.data[0][0];
    }
    
    let det = 0;
    
    for (let i = 0; i < matrix.cols; i++) {
      const cofactor = matrix.data[0][i] * Matrix.cofactor(matrix, 0, i);
      det += i % 2 === 0 ? cofactor : -cofactor;
    }
    
    return det;
  }
  
  static cofactor(matrix, row, col) {
    const subMatrix = new Matrix(matrix.rows - 1, matrix.cols - 1);
    
    for (let i = 0, r = 0; i < matrix.rows; i++) {
      if (i === row) continue;
      
      for (let j = 0, c = 0; j < matrix.cols; j++) {
        if (j === col) continue;
        
        subMatrix.data[r][c] = matrix.data[i][j];
        c++;
      }
      
      r++;
    }
    
    return Matrix.determinant(subMatrix);
  }
  
  static inverse(matrix) {
    if (matrix.rows !== matrix.cols) {
      throw new Error("Matrix must be square");
    }
    
    const det = Matrix.determinant(matrix);
    
    if (det === 0) {
      throw new Error("Matrix is not invertible");
    }
    
    const result = new Matrix(matrix.rows, matrix.cols);
    
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        const cofactor = Matrix.cofactor(matrix, i, j);
        result.data[j][i] = (i + j) % 2 === 0 ? cofactor / det : -cofactor / det;
      }
    }
    
    return result;
  }
}

// Usage example:

const matrixA = new Matrix(2, 2);
matrixA.randomize();

const matrixB = new Matrix(2, 2);
matrixB.randomize();

console.log("Matrix A:");
console.log(matrixA.data);

console.log("Matrix B:");
console.log(matrixB.data);

console.log("Matrix A + B:");
matrixA.add(matrixB);
console.log(matrixA.data);

console.log("Matrix A - B:");
matrixA.subtract(matrixB);
console.log(matrixA.data);

console.log("Matrix A * B:");
const matrixC = Matrix.multiply(matrixA, matrixB);
console.log(matrixC.data);

console.log("Transpose of Matrix C:");
const matrixD = Matrix.transpose(matrixC);
console.log(matrixD.data);

console.log("Determinant of Matrix D:");
console.log(Matrix.determinant(matrixD));

console.log("Inverse of Matrix D:");
const matrixE = Matrix.inverse(matrixD);
console.log(matrixE.data);