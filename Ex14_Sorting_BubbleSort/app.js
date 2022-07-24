import { cities } from "./cities.js";
const form = document.getElementById("form");
const citiesSelect = document.getElementById("citiesSelect");

// -----------------------------------------------------------------
// This is a useful function that you can use to swap
// two elements with one another, given their index within an array.
function swapElements(indexA, indexB) {
  let tempVal = cities[indexA];
  cities[indexA] = cities[indexB];
  cities[indexB] = tempVal;
}

// -----------------------------------------------------------------
function bubbleSort() {
  for (let outerIndex = 0 ; outerIndex < cities.length; outerIndex++) {
    for (let i = 0; i < (cities.length - outerIndex - 1); i++) {

      if (cities[i] > cities[i + 1]) {
        swapElements(i, i + 1);
      }

      // TODO: What should we do here???

    }  
  }
}

// -----------------------------------------------------------------
// Hook the form up to an event listener when the form is submitted
form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  bubbleSort();

  // Re-display the cities, now sorted, hopefully
  displayCities();
});

// -----------------------------------------------------------------
// Here, we're just adding the cities into the "select" HTML element,
// so we can see the list.
function displayCities() {
  // remove all existing <option> elements from the HTML <select>
  while(citiesSelect.firstChild) {
    citiesSelect.removeChild(citiesSelect.firstChild);
  }

  // Create an <option> element for each city, add it to HTML <select>
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.setAttribute("value", city);
    option.innerHTML = city;
    citiesSelect.appendChild(option);
  });  
}

displayCities();