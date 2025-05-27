document.addEventListener("DOMContentLoaded", function () {
    const morpionContainer = document.getElementById('grid');
    const result = document.getElementById('result');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        morpionContainer.appendChild(cell);
    }

    let currentPlayer = 'X';

    morpionContainer.addEventListener('click', function (event) {
        const clickedCell = event.target;
        if (!clickedCell.classList.contains('cell') || clickedCell.textContent !== '') return;

        clickedCell.textContent = currentPlayer;

        if (checkWinner()) {
            result.innerHTML = currentPlayer + ' a gagné!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });

    function checkWinner() {
        const cells = document.querySelectorAll('.cell');
        const combos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return combos.some(([a, b, c]) =>
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        );
    }

    document.getElementById("resetBtn").addEventListener("click", () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.textContent = '');
        result.textContent = '';
        currentPlayer = 'X';
    });
});
