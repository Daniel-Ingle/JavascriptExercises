const form = document.getElementById("form");
const resultDiv = document.getElementById("resultDiv");

// -----------------------------------------
function isPrimeNumber(num) {
  if (Number(num) === 2) {return true;}
  if (num % 2 === 0) {return false;}
  if (Number(num) === 1) {return false;}
  if (num.indexOf("-") === 0) {return false;}

  for (let f = 3; f < num; f += 2) {
    if (num % f === 0) {return false;}
  }
  return true;
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const num = form.count.value;
  console.log("Number: " + num);
  const result = isPrimeNumber(num);

  if (result) {
    resultDiv.innerHTML = num + " is a Prime Number.";
  } else {
    resultDiv.innerHTML = num + " is NOT a Prime Number.";
  }  
});
