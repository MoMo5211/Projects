const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.querySelector(".hangman-box img")
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses =6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount =0;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
    hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
}

const getRandomWord = () => {
    //Select a ramdom word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random()* wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}

const gameover = (isVictory) => {
    //After 600ms of game complete...showing model with relevant details
    setTimeout(() => {
        const modelText = isVictory ? `You found the word:` : `The correct word was: `;
        gameModel.querySelector("img").src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
         gameModel.classList.add("show");
    }, 300)
}

const initGame = (button, clickedLetter) => {
    // check if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                //show all the correct letters on the word display
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");

            }
        })
    } else {
        //If clicked letter doesn't exist, update wrong guess count and image
        wrongGuessCount++;
        hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;


    //Calling gameover function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameover(false);
    if(correctLetters.length === currentWord.length) return gameover(true);
}

//Create keyboard buttons and add event listeners
for(let i = 97; i<= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener("click",getRandomWord);