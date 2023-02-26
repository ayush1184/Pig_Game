"use scrict";

// Selecting Elements
const score0El = document.querySelector(`#score--0`);
// const score0 = document.getElementById('score--0');
const score1El = document.getElementById("score--1");
// const score1 = document.querySelector(`#score--1`);
const diceEl = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
const nam0El = document.querySelector(`#name--0`);
const name1El = document.querySelector(`#name--1`);

// Setting-up the starting conditions...
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores, currentScore, activePlayer, isPlaying;

//  For resetting a game to New Game………

scores = [0, 0];
currentScore = 0;
activePlayer = 0;
isPlaying = true;

const newGame = () => {
  name0El.textContent = prompt("Player 1 Name ??")
  name0El.textContent = prompt("Player 2 Name ??")
  isPlaying = true;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  diceEl.classList.add("hidden");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  activePlayer = 0;
};

// Function for switching the active player...
let switchPlayer = () => {
  currentScore = 0; // Resetting the current score...
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // current.textContent = currentScore ; // Same as above...
  activePlayer = activePlayer === 1 ? 0 : 1; // changing the value of active player...
  player0El.classList.toggle(`player--active`); // Toggling the white color of the active player
  player1El.classList.toggle(`player--active`); // Toggling the white color of the active player
};

let win = () => {
  isPlaying = false;
  // document.querySelector(`.player--active`).classList.add("player--winner");
  // Same effect as above line……
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  // Removes the active player...
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--active`);
  diceEl.classList.add(`hidden`); //Hiding the dice………
};

// Hold Function declearation.....
let holdFunction = () => {
  if (isPlaying) {
    // add current score to the active player total score....
    scores[activePlayer] += currentScore;
    // display the result to the total score...
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //if any player total score >= 100 ,
    if (scores[activePlayer] >= 100) win();
    // then finish the game by applying the win function...
    // if not then switch the function....
    else switchPlayer();
  }
};

// For starting the game....

newGame();

// Rolling dice functionality...
rollBtn.addEventListener("click", function () {
  if (isPlaying) {
    // 1. Generating a random dice roll
    let dice = Math.ceil(Math.random() * 6);

    // 2.Display the generated dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `img/dice-${dice}.png`;

    // 3. Check, is dice-value is 1 or not...?
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current.textContent = currentScore; // Change Later...
    } else {
      //   Switch to a new player...
      switchPlayer();
    }
  }
});
// Hold Btn Functionality...
holdBtn.addEventListener("click", holdFunction);

// New-Game Btn Functionality………

newBtn.addEventListener("click", newGame);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") newGame();
});

//-------------------------------The******End-------------------------------//
