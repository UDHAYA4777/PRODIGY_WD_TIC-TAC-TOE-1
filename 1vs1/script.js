document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restartBtn");
    let currentPlayer = "X";
    let gameState = Array(9).fill("");
    let gameActive = true;

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

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) return;

        makeMove(clickedCellIndex, currentPlayer);
        if (gameActive) {
            currentPlayer = (currentPlayer === "X") ? "O" : "X";
        }
    }

    function makeMove(index, player) {
        gameState[index] = player;
        document.querySelector(`.cell[data-index='${index}']`).classList.add(player);

        if (checkWin()) {
            setTimeout(() => alert(`Player ${player} wins!`), 10);
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            setTimeout(() => alert("It's a draw!"), 10);
            gameActive = false;
            return;
        }
    }

    function checkWin() {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function restartGame() {
        currentPlayer = "X";
        gameState.fill("");
        gameActive = true;
        cells.forEach(cell => cell.className = "cell");
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
});
