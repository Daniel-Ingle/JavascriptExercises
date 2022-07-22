const form = document.getElementById("form");
const resultDiv = document.getElementById("resultDiv");

// -----------------------------------------
// Function: given a number, return that
// number's factorial
// -----------------------------------------
function getFactorial(num) {
  let result = 1;

  // TODO: Given how to calculate factorial,
  //       what Javascript is needed?
  //       Hint: we're looping "for" a given number
  //             of iterations, from 1 to "num"

  if (num === 0) {return 1;}
  for (let val = 2; val <= num; val++) {
    result *= val;
  } 

  return result;
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const num = form.count.value;
  console.log("Number: " + num);
  const result = getFactorial(num);
  resultDiv.innerText = result;
});
