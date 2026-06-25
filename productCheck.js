// productCheck.js
// This program reads integers from the user until the user enters q or Q.
// It checks whether the product of any two entered integers equals a third integer.

const readline = require("readline");

// Create a console input/output interface.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Store valid integers entered by the user.
let numbers = [];

// Ask the user to enter integers or q to quit.
function askForInteger() {
  rl.question("Enter an integer or type q to quit: ", function(input) {
    // Allow lowercase or uppercase Q to quit.
    if (input.toLowerCase() === "q") {
      rl.close();
      displayResults();
      return;
    }

    // Convert the input to a number.
    const number = Number(input);

    // Validate that the input is an integer.
    if (!Number.isInteger(number)) {
      console.log("Error: Please enter an integer or q to quit.");
    } else {
      numbers.push(number);
      console.log("You entered: " + number);
    }

    askForInteger();
  });
}

// Check whether any two numbers multiply to equal a third number in the list.
function findProductCondition() {
  // If there are fewer than 3 integers, the condition cannot be met.
  if (numbers.length < 3) {
    return null;
  }

  // Check every pair of numbers against every other number.
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const product = numbers[i] * numbers[j];

      for (let k = 0; k < numbers.length; k++) {
        if (k !== i && k !== j && numbers[k] === product) {
          return {
            first: numbers[i],
            second: numbers[j],
            product: numbers[k]
          };
        }
      }
    }
  }

  return null;
}

// Display the numbers entered and whether the condition was met.
function displayResults() {
  console.log("\nIntegers entered: " + numbers.join(", "));

  const result = findProductCondition();

  if (result) {
    console.log(
      "Condition is met: " +
      result.first +
      " x " +
      result.second +
      " = " +
      result.product
    );
  } else {
    console.log("Condition was not met");
  }
}

// Start the program.
askForInteger();