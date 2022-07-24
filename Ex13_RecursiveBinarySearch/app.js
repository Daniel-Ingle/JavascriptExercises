import { cities } from "./cities.js"
const form = document.getElementById("form");
const citiesSelect = document.getElementById("citiesSelect");
const resultDiv = document.getElementById("resultDiv");


//
// This is just the same function call as the original, non-recursive
// binary search as in the previous exercise.  HOWEVER, the main contents
// is actually a recursive "helper function" that takes a couple additional
// parameters.  
//

function binarySearch(array, target) {

  return subSearch(array, target, 0, array.length - 1);

  return -1;
}

function subSearch(array, target, leftIndex, rightIndex) {
  
  // TODO: Handle the "base case."  What is the "base case?"
  //       We need to handle that here, first
  if (leftIndex > rightIndex) {
    return -1;
  }

  // else, find the middle index
  let middleIndex = Math.floor((leftIndex + rightIndex) / 2);

  // Handle the case that the middleIndex is our intended target
  if (array[middleIndex].toLowerCase() === target.toLowerCase()) {
    return middleIndex;
  }

  // TODO: Now what?  We need to recurse, calling subSearch recursively
  //       for *which* *cases*????  What are the parameters to subSearch() ??

  if (target.toLowerCase() < array[middleIndex].toLowerCase()) {
    return subSearch(array, target, leftIndex, middleIndex - 1);
  } else {
    return subSearch(array, target, middleIndex + 1, rightIndex);
  }

  // ????

}



form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const searchString = form.search.value;
  console.log("Search String: " + searchString);

  const index = binarySearch(cities, searchString);
  resultDiv.innerText = index;
});

// Here, we're just adding the cities into the "select" HTML element,
// so we can see the list.  It doesn't affect the search.
cities.forEach((city) => {
  const option = document.createElement("option");
  option.setAttribute("value", city);
  option.innerHTML = city;
  citiesSelect.appendChild(option);
});