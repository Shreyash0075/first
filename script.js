const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
let currentTurn = 'X';
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

function handleCellClick(event) {
    const cell = event.target;
    if (cell.textContent !== '' || !gameActive) {
        return;
    }

    cell.textContent = currentTurn;
    cell.classList.add(currentTurn.toLowerCase());

    if (checkWin(currentTurn)) {
        gameStatus.textContent = `${currentTurn} wins!`;
        gameActive = false;
    } else if (isDraw()) {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentTurn = currentTurn === 'X' ? 'O' : 'X';
        gameStatus.textContent = `It's ${currentTurn}'s turn`;
    }
}

function checkWin(currentTurn) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentTurn;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function restartGame() {
    currentTurn = 'X';
    gameActive = true;
    gameStatus.textContent = `It's ${currentTurn}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

restartGame();  // Initialize the game status