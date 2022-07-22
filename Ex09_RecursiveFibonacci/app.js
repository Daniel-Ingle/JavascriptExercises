const form = document.getElementById("form");
const resultDiv = document.getElementById("resultDiv");

// When solving something recursively, remember:
// a) What is our "base case?"
// b) How do we solve the problem by breaking it into
//    smaller problems??

// -----------------------------------------
// Function: given a number, return that number
// of items in the Fibonacci sequence
// -----------------------------------------
function getFibonacciSequenceRecursively(num) {
  // If the number is 0 or 1, return just that number as
  // the sequence; this is the Fibonacci sequence's definition.
  if (num < 2) {
    return [ num ]
  }

  // Otherwise ...
  let sequence;
  if (Number(num) === 2) {return [0, 1];}
  sequence = getFibonacciSequenceRecursively(num - 1);
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);

  return sequence;
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const num = form.count.value;
  console.log("Count entered: " + num);
  const result = getFibonacciSequenceRecursively(num);
  resultDiv.innerText = JSON.stringify(result);
});
