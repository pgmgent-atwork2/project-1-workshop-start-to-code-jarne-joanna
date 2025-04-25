// selecting all the elements from the homepage
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector("button");

// Initializing the game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// Function to start a new game
const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `./src/images/hangman-0.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // creates the empty letter slots
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");

  // enable keyboard buttons
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));

  // hide the game modal
  gameModal.classList.remove("show");
};

// Function to get a random word from our word-list.js
const getRandomWord = () => {
  // this will pick a random word from the array of words, this may look a bit weird since we are destructuring the word and hint from the array of objects, but it is a common practice in JS to do this.
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  //set the current word and update the hint text
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  //reset the game
  resetGame();
};

//function to display if you lose or win
const gameOver = (isVistory) => {
  //display game over modal
  const modalText = isVistory ? "you found the word!" : "The correct word was: ";
  gameModal.querySelector("img").src = `images/${isVistory ? 'victory' : 'lost'}.gif`;
  gameModal.querySelector("h4").innerText = isVistory ? 'Congratulations!' : 'Game Over!';
  gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b> `;
  gameModal.classList.add("show");
};

//start the game with a random word
getRandomWord();
