function calculate() {
    const operation = document.getElementById('operation').value;
    const matrixA = document.getElementById('matrixA').value.trim();
    const matrixB = document.getElementById('matrixB').value.trim();

    // Convert matrix input to 2D array
    const matrixAArray = matrixA.split('\n').map(row => row.split(' ').map(Number));
    const matrixBArray = matrixB.split('\n').map(row => row.split(' ').map(Number));

    let result;
    try {
        switch (operation) {
            case 'add':
                result = addMatrices(matrixAArray, matrixBArray);
                break;
            case 'subtract':
                result = subtractMatrices(matrixAArray, matrixBArray);
                break;
            case 'multiply':
                result = multiplyMatrices(matrixAArray, matrixBArray);
                break;
            case 'transpose':
                result = transposeMatrix(matrixAArray);
                break;
            case 'determinant':
                result = determinant(matrixAArray);
                break;
            case 'inverse':
                result = inverseMatrix(matrixAArray);
                break;
            case 'eigen':
                result = eigen(matrixAArray);
                break;
            case 'solve':
                result = solveLinearEquations(matrixAArray, matrixBArray);
                break;
            default:
                throw new Error('Invalid operation');
        }
        document.getElementById('result').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('result').textContent = 'Error: ' + error.message;
    }
}

// Matrix addition
function addMatrices(A, B) {
    if (A.length !== B.length || A[0].length !== B[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

// Matrix subtraction
function subtractMatrices(A, B) {
    if (A.length !== B.length || A[0].length !== B[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }
    return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

// Matrix multiplication
function multiplyMatrices(A, B) {
    if (A[0].length !== B.length) {
        throw new Error('Number of columns in A must equal number of rows in B');
    }
    const result = new Array(A.length).fill(0).map(() => new Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}

// Matrix transpose
function transposeMatrix(A) {
    return A[0].map((_, i) => A.map(row => row[i]));
}

// Matrix determinant (for 2x2 matrices)
function determinant(A) {
    if (A.length !== 2 || A[0].length !== 2) {
        throw new Error('Determinant is only supported for 2x2 matrices');
    }
    return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

// Matrix inverse (for 2x2 matrices)
function inverseMatrix(A) {
    const det = determinant(A);
    if (det === 0) {
        throw new Error('Matrix is not invertible');
    }
    return [
        [A[1][1] / det, -A[0][1] / det],
        [-A[1][0] / det, A[0][0] / det]
    ];
}

// Eigenvalues and eigenvectors (for 2x2 matrices)
function eigen(A) {
    if (A.length !== 2 || A[0].length !== 2) {
        throw new Error('Eigenvalues and eigenvectors are only supported for 2x2 matrices');
    }
    const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1];
    const trace = a + d;
    const det = a * d - b * c;
    const discriminant = trace * trace - 4 * det;
    if (discriminant < 0) {
        throw new Error('Complex eigenvalues are not supported');
    }
    const eigenvalue1 = (trace + Math.sqrt(discriminant)) / 2;
    const eigenvalue2 = (trace - Math.sqrt(discriminant)) / 2;
    return {
        eigenvalues: [eigenvalue1, eigenvalue2],
        eigenvectors: [[1, 0], [0, 1]] // Placeholder (not calculated)
    };
}

// Solve linear equations (Ax = B)
function solveLinearEquations(A, B) {
    if (A.length !== B.length) {
        throw new Error('Number of rows in A must equal number of rows in B');
    }
    // Placeholder (not implemented)
    throw new Error('Solving linear equations is not implemented');
}

// Show/hide Matrix B input based on operation
document.getElementById('operation').addEventListener('change', function() {
    const operation = this.value;
    const matrixBInput = document.getElementById('matrixBInput');
    if (['add', 'subtract', 'multiply', 'solve'].includes(operation)) {
        matrixBInput.style.display = 'block';
    } else {
        matrixBInput.style.display = 'none';
    }
});