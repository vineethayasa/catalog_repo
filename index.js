import fs from 'fs';

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync('input1.json', 'utf8'));

// Extract `n` and `k` values from "keys"
const { n, k } = data.keys;
console.log(`n: ${n}, k: ${k}`);

// Function to decode a value based on its base
function decodeValue(base, value) {
    return parseInt(value, base); 
}

// Extract Y values and their corresponding bases
const yValues = [];
const xValues = [];
const baseKeys = Object.keys(data).filter(key => key !== 'keys'); 

baseKeys.forEach(key => {
    const base = parseInt(data[key].base, 10); 
    const value = data[key].value;
    yValues.push(decodeValue(base, value));
    xValues.push(parseInt(key));
});

console.log("X Values:", xValues);
console.log("Decoded Y Values:", yValues);

// Function to calculate the Lagrange interpolation polynomial and find the constant term c
function lagrangeInterpolation(xValues, yValues, k) {
    const n = xValues.length;
    
    function L(i, x) {
        let result = 1;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                result *= (x - xValues[j]) / (xValues[i] - xValues[j]);
            }
        }
        return result;
    }

    let constantTerm = 0;
    for (let i = 0; i < k; i++) {
        constantTerm += yValues[i] * L(i, 0);
    }

    return constantTerm;
}

// Find the constant term using the first k points
const constantTerm = lagrangeInterpolation(xValues, yValues, k);

console.log("Constant Term (c):", constantTerm);
