document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restartBtn");
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
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

        if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer !== "X") return;

        makeMove(clickedCellIndex, currentPlayer);
        if (gameActive) setTimeout(aiMove, 500);
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

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkWin() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function aiMove() {
        const emptyCells = gameState.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
        if (emptyCells.length === 0) return;

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomIndex, "O");
    }

    function restartGame() {
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        cells.forEach(cell => cell.className = "cell");
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
});
