// selecting all the elements from the homepage
const wordDisplay = document.querySelector(".word-display");
const playAgainButton = document.querySelector("button");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");

// Initializing the game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// Function to start a new game
const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `./src/images/hangman-0.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // creates the empty letter slots (spliting the word into an array of letters and mapping them to a list item)
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

// Function to display the end screen when the game is over
function showGameOver(isVictory) {
  // Determine what content to show based on win/loss
  if (isVictory) {
    modalText = "You found the word!";
    imageSource = "./src/images/victory.gif";
    headingText = "Congratulations!";
  } else {
    modalText = "The correct word was:";
    imageSource = "./src/images/lost.gif";
    headingText = "Game Over!";
  }

  // Update the modal elements with the appropriate content
  gameModal.querySelector("img").src = imageSource;
  gameModal.querySelector("h4").innerText = headingText;
  // Display the correct word in the modal
  gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;

  // Make the modal visible
  gameModal.classList.add("show");
}

//creating a for loop to display our keyboard buttons
for (let i = 97; i <= 122; i++) {
  //creating a button for each letter of the alphabet
  const button = document.createElement("button");
  // converts ASCII/Unicode values to their corresponding characters
  button.innerText = String.fromCharCode(i);
  //adding the button to the keyboard div
  keyboardDiv.appendChild(button);
  //adding an event listener to the button
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

//function to handle the game logic when a button on the keyboard is clicked
const initGame = (button, clickedLetter) => {
  //check if the letter is in the word
  if (currentWord.includes(clickedLetter)) {
    //refresh the displayed letter if the letter is in the word and controlls the correct letters
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    //this will update the wrong guess count and the hangman image if the letter is not in the word
    //wrongGuessCount++; makes sure that we can show all of our images based of the name of our images
    wrongGuessCount++;
    hangmanImage.src = `./src/images/hangman-${wrongGuessCount}.svg`;
  }
  //disable the button after it is clicked
  button.disabled = true;
  //update the guesscount
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  //check if the game is over
  if (wrongGuessCount === maxGuesses) {
    showGameOver(false);
  } else if (
    currentWord.split("").every((letter) => correctLetters.includes(letter))
  ) {
    showGameOver(true);
  }
};

//start the game with a random word
getRandomWord();

//add an event listener to the play again button
playAgainButton.addEventListener("click", () => {
  gameModal.classList.remove("show");
  getRandomWord();
});
