const gameGrid = document.getElementById("gameGrid");
const startButton = document.getElementById("startButton");
const timeDiv = document.getElementById("timeDiv");
startButton.addEventListener('click', () => {
  timeDiv.innerText = "Restarting... ";
  randomize();
  startTimer();
});

// The list of possible letters/numbers that can be under
// tile pairs.
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

// NOTE: WIDTH * HEIGHT must be even, otherwise the randomize
//       method will fail.  Also, (WIDTH * HEIGHT)/2 must be
//       less than characters.length
const WIDTH = 6;
const HEIGHT = 5;

// The initialize() function, towards the bottom, populates
// the cards array with HTMLElements, where each
// element's innerText contains a letter or number.
let cards = [];

let timerTick;

let firstClk = null;

// Check to make sure we are okay with the
// characters/WIDTH/HEIGHT
if (WIDTH * HEIGHT % 2 !== 0 || 
    (WIDTH * HEIGHT) / 2 > characters.length) {
  throw("ERROR, invalid parameters for WIDTH, HEIGHT")
}

// -----------------------------------------------
// Pass a card (an HTMLElement) to this function to
// open or close a card, with toggle being true
// ('open' the card) or false ('close' the card)
function showCard(card, toggle) {
  if (toggle) {
    card.classList.add("open");
  } else {
    card.classList.remove("open");
  }
}

// -----------------------------------------------
// TODO: - What needs to happen when a card is clicked?
//       - How should we keep control of how many
//         cards the user has opened?
//       - How do we see if the two cards they opened
//         'match?'  
//       - How do we determine when the game is over?
function onCardClick(e) {
  let cardClk = e.currentTarget;
  if (cardClk.classList.contains("open")) {return;}

  showCard(cardClk, true);
  
  if (firstClk) {
    if (firstClk.innerText === cardClk.innerText) {
      let victory = true;
      for (let card of cards) {
        if (!card.classList.contains("open")) {
          victory = false;
          break;
        }
      }
      if (victory) {
        clearInterval(timerTick);
        let seconds = timeDiv.innerText.slice(0, timeDiv.innerText.length - 12);
        timeDiv.innerText = `You won the game in ${seconds} seconds!`;
      }
    } else {
      const flip = firstClk;
      setTimeout(() => {showCard(cardClk, false)}, 500);
      setTimeout(() => {showCard(flip, false)}, 500);
    }
    firstClk = null;
  } else {
    firstClk = cardClk;
  }
}

// -----------------------------------------------
function randomize() {
  // let the characters be in an array we can remove them form
  let values = characters.split('');

  // put the cards in a *new* array that we can remove them from
  let cardList = [...cards]; 

  // While we still have cards to put a character into...
  while(cardList.length > 0) {

    // Get a random character that is in the array of remaining
    // values.  We want to put that into 2 cards
    let randomIndex = Math.floor(Math.random() * values.length);    
    const char = values.splice(randomIndex, 1)[0];  // Remove char from array  
   
    // Get a random card from the remaining, un-set cards
    randomIndex = Math.floor(Math.random() * cardList.length);
    const cardOne = cardList.splice(randomIndex, 1)[0]; // Remove card

    // Get another random card from the remaining, un-set cards
    randomIndex = Math.floor(Math.random() * cardList.length);
    const cardTwo = cardList.splice(randomIndex, 1)[0]; // Remove card

    cardOne.innerText = char;
    cardTwo.innerText = char;
  }  

  cards.forEach(c => showCard(c, false));
}

// -----------------------------------------------
// Places a WIDTH x HEIGHT grid of divs onto the
// screen, each with their click event handler
// set.
function initialize() {

  // Generate card tiles
  for(let row = 0 ; row < HEIGHT; row++) {
    const rowDiv = document.createElement('div');
    gameGrid.appendChild(rowDiv);

    for (let col = 0; col < WIDTH; col++) {
      const card = document.createElement('div');
      card.classList.add("card");
      card.addEventListener('click', onCardClick);
      rowDiv.appendChild(card);
      cards.push(card);
    }
  }

}

// -----------------------------------------------
// Each time this function is called, a timer is 
// set up with a start time and displays the number
// of seconds that have passed.  When the player
// "wins,"  the timer should be stopped with 
// clearInterval(timerTick).
function startTimer() {
  // If there is a running timer to display seconds, clear it
  clearInterval(timerTick);
  
  const  startTime = new Date();

  // Set up a timer which displays the # of seconds passed.
  timerTick = setInterval(() => {
    const seconds = Math.floor((new Date() - startTime) / 1000);
    timeDiv.innerText = `${seconds} seconds ... `;
  }, 1000);
}

initialize();
randomize();
startTimer();
