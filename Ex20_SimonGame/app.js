const topLeft = document.getElementById("topLeft");
const topRight = document.getElementById("topRight");
const bottomLeft = document.getElementById("bottomLeft");
const bottomRight = document.getElementById("bottomRight");
const startButton = document.getElementById("startButton");
const scoreDiv = document.getElementById("score");

// How fast, in milliseconds, to 'flash' the panel and 
// release it.
const SPEED = 150;

// We are keeping a list of two sequenses:
//   1) The full sequence that has been randomly added to.
//   2) A copy "sequence to guess," which can be destroyed
//      (reused) when we're trying to see how the player is guessing
//      The "sequence to guess" gets re-set to sequence each time
//      we add a new round to the sequence.
let sequence = [];
let sequenceToGuess = [];

// Keeps the player from clicking while we play the sequence.
let clickEnabled = false;

// The panels.  We use this array when we get a random panel and
// "push" it onto the sequence array.
const panels = [
  topLeft,
  topRight,
  bottomLeft,
  bottomRight
];

// -------------------------------------------------------
// Returns a random panel (an HTMLElement), which can be used
// to "push" onto our sequence
function getRandomPanel() {
  const randomNumber = Math.floor(Math.random() * panels.length);
  return panels[randomNumber];  
}

// -------------------------------------------------------
// Adds a new, random panel to our guessing sequence.  Note that
// the "sequenceToGuess" gets the exact copied added to it.
function addNewPanel() {
  sequence.push(getRandomPanel());
  sequenceToGuess = [...sequence]; // Copy sequence into sequenceToGuess
  scoreDiv.innerText = "Sequence count: " + sequence.length;
}

// -------------------------------------------------------
// This flashes a SINGLE panel item.  How we do this is
// we add the "active" class to a panel, and then have
// a timeout to remove it after SPEED milliseconds, then
// we wait another SPEED milliseconds before returning 
// a promise.
function flash(element) {
  return new Promise(resolve => {
    element.classList.add("active");
    setTimeout(() => {
      element.classList.remove("active");
      setTimeout(() => {
        resolve();
      }, SPEED);
    }, SPEED);
  });
}

// -------------------------------------------------------
function onPanelClicked(e) {
  e.preventDefault();
  if (!clickEnabled) {
    return;
  }

  const clickedPanel = e.currentTarget;
  const expectedPanel = sequenceToGuess.shift();

  if (clickedPanel !== expectedPanel) {
    initialize();
  } else if (sequenceToGuess.length === 0) {
    addNewPanel();
    flashSequence(sequence);
  }

  // TODO:
  //   1) Figure out what the expected panel is above 
  //      (hint 1: look in sequnceToGuess)
  //      (hint 2: see the "shift" function on arrays)
  //   2) Figure out how to successfully get the next
  //      one to guess.
  //   3) If they've guessed the entire sequnce, add
  //      a new panel and run the sequnce again.
  //   4) If they guessed incorrectly, end the game.

  console.log("Panel clicked");  // can be removed.
}

// -------------------------------------------------------
// Flashes our sequence, in order.
async function flashSequence() {
  clickEnabled = false;
  panels.forEach(p => p.classList.remove("click-enabled"));
  for (const panel of sequence) {
    await flash(panel);
  }
  panels.forEach(p => p.classList.add("click-enabled"));
  clickEnabled = true;
}

// -------------------------------------------------------
// Starts a new game, flashing an initial panel
async function initialize() {
  sequence = [];
  addNewPanel();
  flashSequence(sequence);
}

// Add the Start / Reset button click event handler
startButton.addEventListener('click', () => {
  initialize();
});

// Add an event listener to each of the panels
panels.forEach(panel => {
  panel.addEventListener('click', onPanelClicked);
});

initialize();

