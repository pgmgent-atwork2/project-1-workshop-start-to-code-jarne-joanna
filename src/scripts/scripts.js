// Selecting all elements
const displayText = document.querySelector(".letters");
const hangmanImage = document.querySelector(".drawing img");
const endGamePopup = document.querySelector(".popup");
const playAgainButton = document.querySelector(".restart-btn");
const keyboardContainer = document.querySelector(".buttons");
const guessesText = document.querySelector(".score b");

// Initializing the game variables
let selectedWord, correctLetters, wrongGuessCount;
const maxGuessCount = 6;

// Function to display the end screen when the game is over
function showGameOver(isWinner) {
  // Determine what content to show based on win/loss
  if (isWinner) {
    modalText = "You found the word!";
    imageSource = "./src/images/victory.gif";
    headingText = "Congratulations!";
  } else {
    modalText = "The correct word was:";
    imageSource = "./src/images/lost.gif";
    headingText = "Game Over!";
  }

  // Update the modal elements with the appropriate content
  endGamePopup.querySelector("img").src = imageSource;
  endGamePopup.querySelector("h2").innerText = headingText;
  // Display the correct word in the modal
  endGamePopup.querySelector(
    "p"
  ).innerHTML = `${modalText} <b>${selectedWord}</b>`;

  // Make the modal visible
  endGamePopup.classList.add("show");
}

// Function to start a new game
const resetGame = () => {
  correctLetters = [];
  hangmanImage.src = `./src/images/hangman-0.svg`;
  wrongGuessCount = 0;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuessCount}`;

  // creates the empty letter slots (spliting the word into an array of letters and mapping them to a list item)
  displayText.innerHTML = selectedWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");

  // enable keyboard buttons
  keyboardContainer
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));

  // hide the game modal
  endGamePopup.classList.remove("show");
};

//creating a for loop to display our keyboard buttons we use the numbers 97 to 122 since these are the ASCII values for the lowercase letters a-z
for (let i = 97; i <= 122; i++) {
  //creating a button for each letter of the alphabet
  const button = document.createElement("button");
  // converts ASCII/Unicode values to their corresponding characters
  button.innerText = String.fromCharCode(i);
  //adding the button to the keyboard div
  keyboardContainer.appendChild(button);
  //adding an event listener to the button fromcharcode makes sure that we get the correct letter when we click on the button
  button.addEventListener("click", (e) =>
    startGame(e.target, String.fromCharCode(i))
  );
}

//function to handle the game logic when a button on the keyboard is clicked
const startGame = (button, clickedLetter) => {
  // Check if the letter is in the word
  if (selectedWord.includes(clickedLetter)) {
    // Split word into array of letters
    const letters = selectedWord.split("");

    // Loop through each position in the word
    for (let index = 0; index < letters.length; index++) {
      if (letters[index] === clickedLetter) {
        correctLetters.push(letters[index]);
        const letterSlot = displayText.querySelectorAll("li")[index];

        // Update the display
        letterSlot.innerText = letters[index];
        letterSlot.classList.add("guessed");
      }
    }
  } else {
    // Handle wrong guess
    wrongGuessCount++;
    hangmanImage.src = `./src/images/hangman-${wrongGuessCount}.svg`;
  }
  //disable the button after it is clicked
  button.disabled = true;
  //update the guesscount
  guessesText.innerText = `${wrongGuessCount} / ${maxGuessCount}`;

  //check if the game is over
  if (wrongGuessCount === maxGuessCount) {
    showGameOver(false);
  } else if (
    selectedWord.split("").every((letter) => correctLetters.includes(letter))
  ) {
    showGameOver(true);
  }
};

// Function to get a random word from our word-list.js
const getRandomWord = () => {
  // Get random index from the word list
  const randomIndex = Math.floor(Math.random() * wordList.length);
  // Get the word object based of the randomized index
  const wordObject = wordList[randomIndex];

  // Set the current word and hint
  selectedWord = wordObject.word;
  document.querySelector(".clue").innerText = wordObject.hint;

  // Reset the game
  resetGame();
};

//start the game with a random word
getRandomWord();

//add an event listener to the play again button
playAgainButton.addEventListener("click", () => {
  endGamePopup.classList.remove("show");
  getRandomWord();
});
