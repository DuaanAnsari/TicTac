// script.js

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const boxes = document.querySelectorAll('.box');
const turnIndicator = document.getElementById('turn-indicator');
const resetBtn = document.getElementById('reset-btn');
const winnerPopup = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message');
const gameContainer = document.getElementById('game-board');
let winningLine = null;

boxes.forEach(box => {
  box.addEventListener('click', () => {
    const index = box.getAttribute('data-index');
    
    if (board[index] === '' && gameActive) {
      board[index] = currentPlayer;
      box.classList.add(currentPlayer === 'X' ? 'x' : 'o');
      
      if (checkWin()) {
        turnIndicator.textContent = `Player ${currentPlayer === 'X' ? 1 : 2} Wins!`;
        gameActive = false;
        showPopup(currentPlayer);
        drawWinningLine();
        return;
      }
      
      if (board.every(cell => cell !== '')) {
        turnIndicator.textContent = 'Draw!';
        showPopup("None");
        gameActive = false;
        return;
      }
      
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      turnIndicator.textContent = `Player ${currentPlayer === 'X' ? 1 : 2}'s Turn (${currentPlayer})`;
    }
  });
});

resetBtn.addEventListener('click', resetGame);

function checkWin() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Save the winning combination
      winningLine = combination;
      return true;
    }
  }
  return false;
}


  

function showPopup(winner) {
  winnerMessage.textContent = winner === 'None' ? "It's a Draw!" : `Player ${winner === 'X' ? 1 : 2} Wins!`;
  winnerPopup.style.display = 'block';
}

function closePopup() {
  winnerPopup.style.display = 'none';
  resetGame();
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  turnIndicator.textContent = `Player 1's Turn (X)`;
  boxes.forEach(box => {
    box.classList.remove('x', 'o');
  });
  
  // Remove winning line if any
  const existingLine = document.querySelector('.winning-line');
  if (existingLine) {
    existingLine.remove();
  }
}
