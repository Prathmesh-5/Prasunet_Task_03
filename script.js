const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedCellIndex] !== '' || checkWin()) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else if (gameState.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    } else {
        message.textContent = 'Draw!';
    }
}

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
    message.textContent = '';
}
