// This is a sample JavaScript file intentionally containing issues for testing the AI-powered PR reviewer bot

const fs = require('fs');
const path = require('path');

// Using require instead of import
const myModule = require('./myModule');

// Blocking operations
if (!fs.existsSync('./generated')) {
    fs.mkdirSync('./generated');
}

// Using for...in without hasOwnProperty
const myObject = { a: 1, b: 2 };
for (const key in myObject) {
    console.log(key, myObject[key]);
}

// Inefficient file reading
const fileData = fs.readFileSync('./someFile.txt', 'utf8');
console.log(fileData);

// Missing error handling
const jsonData = JSON.parse(fileData);
console.log(jsonData);

// Example of hardcoded file paths
const hardcodedPath = '/home/user/someFile.txt';
console.log(`Hardcoded path: ${hardcodedPath}`);

// Callback-based function usage instead of promises
fs.readFile('./anotherFile.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Unnecessary use of var
var oldSchoolVariable = 'This should be let or const';
console.log(oldSchoolVariable);

// Large function with multiple responsibilities
function processData(input) {
    const transformedData = input.map(x => x * 2);
    transformedData.forEach(data => {
        console.log(`Processed data: ${data}`);
    });
    return transformedData.reduce((sum, x) => sum + x, 0);
}
const result = processData([1, 2, 3, 4]);
console.log(`Result: ${result}`);

// Using synchronous write
fs.writeFileSync('./output.txt', 'This is a synchronous write operation.');
