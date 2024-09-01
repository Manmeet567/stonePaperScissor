// const optionsArray = {
//   stone : "<div class='stone' style='padding: 60px;'><img src='./assets/stone.png' alt='#' /></div>",
//   scissor : "<div class='scissor' style='padding: 60px;'><img src='./assets/scissor.png' alt='#' /></div>",
//   paper : "<div class='paper' style='margin: 0; padding: 60px;'><img src='./assets/paper.png' alt='#' /></div>",
// };

// const winAnimation = "animation: ripple 1s linear infinite;"


const optionsArray = {
    stone: "<div class='stone' style='padding: 60px;'><img src='./assets/stone.png' alt='#' /></div>",
    scissor: "<div class='scissor' style='padding: 60px;'><img src='./assets/scissor.png' alt='#' /></div>",
    paper: "<div class='paper' style='margin: 0; padding: 60px;'><img src='./assets/paper.png' alt='#' /></div>",
};

const winAnimation = "animation: ripple 1s linear infinite;";

// Get references to the elements
const optionsDisplay = document.querySelector('.options-display');
const resultsDisplay = document.querySelector('.results-display');
const userChoiceDiv = document.querySelector('.user-choice');
const pcChoiceDiv = document.querySelector('.pc-choice');
const winStatus = document.querySelector('.win-status');
const userScoreDiv = document.querySelector('.user-score');
const computerScoreDiv = document.querySelector('.computer-score');
const playAgainButton = document.querySelector('.play-again');
const rulesButton = document.querySelector('.rules-bar button');
const rulesDiv = document.querySelector('.rules');
const closeRulesButton = document.querySelector('.close-btn');
const nextButton = document.querySelector('.rules-bar button:nth-child(2)');
const gameContainer = document.querySelector('.game-container');
const trophyPlayAgainButton = document.querySelector('.trophy-page button');
const trophyPage = document.querySelector('.trophy-page');

let userScore = localStorage.getItem('userScore') || 0;
let computerScore = localStorage.getItem('computerScore') || 0;

userScoreDiv.textContent = userScore;
computerScoreDiv.textContent = computerScore;
nextButton.style.display = 'none';

function getComputerChoice() {
    const choices = ['stone', 'scissor', 'paper'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) return 'draw';
    if (
        (userChoice === 'stone' && computerChoice === 'scissor') ||
        (userChoice === 'scissor' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'stone')
    ) {
        return 'user';
    } else {
        return 'computer';
    }
}

function updateScore(winner) {
    if (winner === 'user') {
        userScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }

    if (userScore === 99 || computerScore === 99) {
        userScore = 0;
        computerScore = 0;
    }

    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);

    userScoreDiv.textContent = userScore;
    computerScoreDiv.textContent = computerScore;
}

function playGame(userChoice) {
    optionsDisplay.style.display = 'none';
    resultsDisplay.style.display = 'flex';

    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    // Update the inner HTML for user and computer choices
    userChoiceDiv.innerHTML = `<p>YOU PICKED</p>${optionsArray[userChoice]}`;
    pcChoiceDiv.innerHTML = `<p>PC PICKED</p>${optionsArray[computerChoice]}`;

    // Select the specific divs inside user-choice and pc-choice
    const userChoiceDivElement = userChoiceDiv.querySelector('div');
    const pcChoiceDivElement = pcChoiceDiv.querySelector('div');

    // Remove previous animation class
    userChoiceDivElement.classList.remove('animate-win');
    pcChoiceDivElement.classList.remove('animate-win');

    // Apply animation class based on the winner and control the "NEXT" button display
    if (winner === 'user') {
        winStatus.textContent = "YOU WIN";
        userChoiceDivElement.classList.add('animate-win');
        nextButton.style.display = 'block';  // Show the "NEXT" button
    } else if (winner === 'computer') {
        winStatus.textContent = "YOU LOST";
        pcChoiceDivElement.classList.add('animate-win');
        nextButton.style.display = 'none';  // Hide the "NEXT" button
    } else {
        winStatus.textContent = "TIE UP";
        nextButton.style.display = 'none';  // Hide the "NEXT" button
    }

    updateScore(winner);
}

nextButton.addEventListener('click', () => {
    gameContainer.style.display = 'none';
    trophyPage.style.display = 'flex';
    nextButton.style.display = 'none'
});

trophyPlayAgainButton.addEventListener('click', () => {
    // Hide the trophy page
    nextButton.style.display = 'none'

    trophyPage.style.display = 'none';
    
    // Reset the game container display
    gameContainer.style.display = 'block';
    
    // Reset scores or any other necessary game state
    resetGame();
});

function resetGame() {
    
    // Show the options display to start a new game
    document.querySelector('.options-display').style.display = 'flex';
    document.querySelector('.results-display').style.display = 'none';
}


document.querySelectorAll('.stone, .scissor, .paper').forEach(option => {
    option.addEventListener('click', () => {
        playGame(option.className);
    });
});

playAgainButton.addEventListener('click', () => {
    resultsDisplay.style.display = 'none';
    optionsDisplay.style.display = 'flex';
});

rulesButton.addEventListener('click', () => {
    rulesDiv.style.display = rulesDiv.style.display === 'block' ? 'none' : 'block';
});

closeRulesButton.addEventListener('click', () => {
    rulesDiv.style.display = 'none';
});
