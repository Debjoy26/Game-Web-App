// Tic-Tac-Toe Game Variables
let ticTacToeBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOverTTT = false;

// Memory Game Variables
const cardsArray = [
  '🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇', 
  '🍓', '🍓', '🍊', '🍊', '🍍', '🍍', '🍉', '🍉'
];
let shuffledCards = [];
let flippedCards = [];
let matchedCards = 0;
let score = 0;
let isGameOverMemory = false;

// DOM Elements
const ticTacToeBoardElement = document.getElementById("tic-tac-toe-board");
const ticTacToeStatus = document.getElementById("tic-tac-toe-status");
const ticTacToeResetButton = document.getElementById("tic-tac-toe-reset"); // Tic-Tac-Toe reset button
const restartButton = document.getElementById("restart-button");
const scoreElement = document.getElementById("score");
const gameBoard = document.getElementById("game-board");
const ticTacToeGame = document.getElementById("tic-tac-toe-game");
const memoryGame = document.getElementById("memory-game");
const ticTacToeBtn = document.getElementById("tic-tac-toe-btn");
const memoryGameBtn = document.getElementById("memory-game-btn");
const memoryGameReset = document.getElementById("restart-button");

// Switch between games
ticTacToeBtn.addEventListener('click', () => {
  ticTacToeGame.style.display = 'block';
  memoryGame.style.display = 'none';
  initializeTicTacToe();
});

memoryGameBtn.addEventListener('click', () => {
  ticTacToeGame.style.display = 'none';
  memoryGame.style.display = 'block';
  initializeMemoryGame();
});

// Tic-Tac-Toe Logic
function initializeTicTacToe() {
  ticTacToeBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOverTTT = false;
  ticTacToeStatus.textContent = `Player ${currentPlayer}'s turn`;
  ticTacToeResetButton.classList.add('hidden');
  createTicTacToeBoard();
}

function createTicTacToeBoard() {
  ticTacToeBoardElement.innerHTML = '';
  ticTacToeBoard.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('board-cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    ticTacToeBoardElement.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (ticTacToeBoard[index] || isGameOverTTT) return;

  ticTacToeBoard[index] = currentPlayer;
  createTicTacToeBoard();

  if (checkWinner()) {
    ticTacToeStatus.textContent = `Player ${currentPlayer} wins!`;
    isGameOverTTT = true;
    ticTacToeResetButton.classList.remove('hidden');
  } else if (ticTacToeBoard.every(cell => cell)) {
    ticTacToeStatus.textContent = `It's a draw!`;
    isGameOverTTT = true;
    ticTacToeResetButton.classList.remove('hidden');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    ticTacToeStatus.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern => 
    ticTacToeBoard[pattern[0]] === currentPlayer &&
    ticTacToeBoard[pattern[1]] === currentPlayer &&
    ticTacToeBoard[pattern[2]] === currentPlayer
  );
}

// Memory Game Logic
function shuffleCards() {
  shuffledCards = [...cardsArray].sort(() => Math.random() - 0.5);
}

function createCardElements() {
  gameBoard.innerHTML = '';
  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-index', index);
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard(event) {
  const card = event.target;
  if (card.classList.contains('flipped') || isGameOverMemory) return;

  card.classList.add('flipped');
  card.textContent = shuffledCards[card.getAttribute('data-index')];
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.textContent === card2.textContent) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards += 2;
    score += 10;
    flippedCards = [];
    updateScore();

    if (matchedCards === shuffledCards.length) {
      setTimeout(() => {
        alert('You Win!');
        endMemoryGame();
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

function endMemoryGame() {
  isGameOverMemory = true;
  memoryGameReset.classList.remove('hidden');
}

function restartMemoryGame() {
  // Reset the game state variables
  isGameOverMemory = false;
  score = 0;
  matchedCards = 0;
  flippedCards = [];
  shuffleCards();  // Shuffle the cards again
  createCardElements();  // Create new card elements for the new game
  updateScore();  // Update score display
  memoryGameReset.classList.add('hidden');  // Hide the reset button again
  previewCards();  // Show the cards for 1 second as a preview
}

function previewCards() {
  // Show the cards for 1 second
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.textContent = shuffledCards[card.getAttribute('data-index')];
    card.classList.add('flipped');
  });

  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove('flipped');
      card.textContent = '';
    });
  }, 1000);
}

function initializeMemoryGame() {
  shuffleCards();
  createCardElements();
  memoryGameReset.classList.add('hidden');
  updateScore();
  previewCards();  // Show the cards for 1 second as preview
}

// Initialize the app with Tic-Tac-Toe as default
initializeTicTacToe();

// Event Listeners for Reset
memoryGameReset.addEventListener('click', restartMemoryGame);
ticTacToeResetButton.addEventListener('click', initializeTicTacToe); // Added restart button listener for Tic-Tac-Toe
