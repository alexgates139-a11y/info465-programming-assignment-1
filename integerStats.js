// integerStats.js
// This program reads integers from the user, stores them in an array,
// and calculates the mean, median, count, minimum, and maximum.

const readline = require("readline");

// Creates a console input/output interface.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Stores valid integers entered by the user.
let numbers = [];

// Asks the user to enter an integer or q to quit.
function askForNumber() {
  rl.question("Enter an integer or type q to quit: ", function(input) {
    // Allows the user to stop entering numbers.
    if (input.toLowerCase() === "q") {
      displayResults();
      rl.close();
      return;
    }

    // Converts the input into a number.
    const number = Number(input);

    // Checks that the input is a valid integer.
    if (!Number.isInteger(number)) {
      console.log("Invalid input. Please enter a whole number.");
    } else {
      numbers.push(number);
      console.log(number + " added.");
    }

    askForNumber();
  });
}

// Calculates and displays the results.
function displayResults() {
  if (numbers.length === 0) {
    console.log("No valid integers were entered.");
    return;
  }

  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const count = numbers.length;
  const sum = numbers.reduce((total, current) => total + current, 0);
  const mean = sum / count;

  let median;
  const middle = Math.floor(count / 2);

  if (count % 2 === 0) {
    median = (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
  } else {
    median = sortedNumbers[middle];
  }

  const minimum = Math.min(...numbers);
  const maximum = Math.max(...numbers);

  console.log("\nResults:");
  console.log("Numbers entered: " + numbers.join(", "));
  console.log("Count: " + count);
  console.log("Mean: " + mean);
  console.log("Median: " + median);
  console.log("Minimum: " + minimum);
  console.log("Maximum: " + maximum);
}

// Starts the program.
askForNumber();
