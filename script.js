const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameOver = false;

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
];

// Initialize the game board
function createBoard() {
    board.innerHTML = '';
    gameState.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });
    updateMessage(`Player ${currentPlayer}'s turn`);
}

// Handle cell click
function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] || isGameOver) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        updateMessage(`Player ${currentPlayer} wins!`, true);
        isGameOver = true;
    } else if (gameState.every(cell => cell)) {
        updateMessage('It\'s a draw!');
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage(`Player ${currentPlayer}'s turn`);
    }
}

// Check for a winner
function checkWinner() {
    if (
        winningConditions.some((condition) =>
            condition.every((index) => gameState[index] === currentPlayer)
        )
    ) {
        return true;
    }
    return false;
}

// Update the message display
function updateMessage(msg, isWinner = false) {
    message.textContent = msg;
    if (isWinner) {
        message.classList.remove('winner'); 
        void message.offsetWidth;          
        message.classList.add('winner');   
    } else {
        message.classList.remove('winner'); 
    }
}

// Reset the game
resetButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    isGameOver = false;
    message.classList.remove('winner'); 
    createBoard();
});

// Initialize the game
createBoard();
