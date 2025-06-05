const rows = 6;
const cols = 7;
const grid = [];
let currentPlayer = 'red';
const board = document.getElementById('JeuxP');
const message = document.getElementById('message');

function createGrid() {
    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            board.appendChild(cell);
            grid[r][c] = cell;
        }
    }

    board.addEventListener('click', handleClick);
}

function handleClick(e) {
    if (!e.target.classList.contains('cell')) return;
    const col = parseInt(e.target.dataset.col);
    for (let r = rows - 1; r >= 0; r--) {
        if (!grid[r][col].classList.contains('red') && !grid[r][col].classList.contains('yellow')) {
            grid[r][col].classList.add(currentPlayer);
            if (checkWin(r, col)) {
                message.textContent = `${currentPlayer === 'red' ? '🔴' : '🔵'} a gagné !`;
                board.removeEventListener('click', handleClick);
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) ||  // horizontal
            checkDirection(row, col, 0, 1) ||  // vertical
            checkDirection(row, col, 1, 1) ||  // diag down
            checkDirection(row, col, 1, -1);   // diag up
}

function checkDirection(row, col, dr, dc) {
    const color = grid[row][col].classList.contains('red') ? 'red' : 'yellow';
    let count = 1;

    for (let i = 1; i < 4; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains(color)) {
            count++;
        } else break;
    }

    for (let i = 1; i < 4; i++) {
        const r = row - i * dr;
        const c = col - i * dc;
        if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains(color)) {
            count++;
        } else break;
    }

    return count >= 4;
}

createGrid();