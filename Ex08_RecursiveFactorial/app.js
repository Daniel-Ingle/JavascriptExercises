const form = document.getElementById("form");
const resultDiv = document.getElementById("resultDiv");

//
// Note this:
//   5! = 5 * 4 * 3 * 2 * 1  = 120
//   4! = 4 * 3 * 2 * 1      = 24
//   3! = 3 * 2 * 1          = 6
//   2! = 2 * 1              = 2
//   1! = 1 * 1              = 1
//   0! = 1  (this is by definition of factorial)
// So, in general:
//
//   num! = num * (num - 1)!
//
// Except for the "base case" of num === 0, which is "1" by definition.
// 
// THEREFORE, the "getFactorial" function should:
//   a) Check for the "base case,"" where num === 0, and return ... what?.
//   b) Otherwise, return the number, num, multiplied by... what?
//

// -----------------------------------------
function getFactorial(num) {
  // Handle the "base case"
  // This had to be converted into a number to work when trying it with 0
  if (Number(num) === 0) {
    return 1;
  }

  // TODO: We can return "num" times... what?
  //       if we say:
  //           return num * getFactorial(???);
  //       what should the "???" parameter be??

  return num * getFactorial(num - 1);
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const num = form.count.value;
  console.log("Number: " + num);
  const result = getFactorial(num);
  resultDiv.innerText = result;
});
