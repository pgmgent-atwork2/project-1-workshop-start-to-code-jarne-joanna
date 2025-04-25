// selecting all the elements from the homepage
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector(".button");

// Initializing the game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// Function to start a new game
const resetGame = () => {
    correctLetters = [];   
    wrongGuessCount = 0;
    hangmanImage.src = `./assets/images/hangman-0.png`;
}