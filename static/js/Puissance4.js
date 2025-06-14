const rows = 6;
const cols = 7;
const grid = [];
let currentPlayer = 'red';
const board = document.getElementById('puissance4');
const message = document.getElementById('message');
const previewPiece = document.getElementById('preview-piece');
const previewZone = document.getElementById('preview-zone');

function getScreenSize() {
    const width = window.innerWidth;
    if (width <= 360) return 'xs';
    if (width <= 480) return 'sm';
    if (width <= 768) return 'md';
    return 'lg';
}

function getCellSize() {
    const screenSize = getScreenSize();
    switch (screenSize) {
        case 'xs': return { cell: 40, gap: 2, piece: 35 };
        case 'sm': return { cell: 45, gap: 3, piece: 40 };
        case 'md': return { cell: 65, gap: 4, piece: 55 };
        default: return { cell: 80, gap: 5, piece: 70 };
    }
}

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
    
    if (getScreenSize() === 'lg') {
        board.addEventListener('mousemove', handleMouseMove);
        updatePreviewPiece(3);
    }
}

function handleMouseMove(e) {
    if (!e.target.classList.contains('cell')) return;
    const col = parseInt(e.target.dataset.col);
    updatePreviewPiece(col);
}

function updatePreviewPiece(col) {
    if (!previewPiece || !previewZone || getScreenSize() !== 'lg') return;
    
    const sizes = getCellSize();
    const cellWidth = sizes.cell + sizes.gap;
    const boardStartX = (previewZone.offsetWidth - (cols * cellWidth - sizes.gap)) / 2;
    const pieceWidth = previewPiece.offsetWidth || sizes.piece;
    const pieceX = boardStartX + (col * cellWidth) + (cellWidth / 2) - (pieceWidth / 2);
    
    previewPiece.style.left = pieceX + 'px';
    previewPiece.className = currentPlayer;
}

function handleClick(e) {
    if (!e.target.classList.contains('cell')) return;
    const col = parseInt(e.target.dataset.col);
    
    if (grid[0][col].classList.contains('red') || grid[0][col].classList.contains('yellow')) {
        return;
    }
    
    let targetRow = -1;
    for (let r = rows - 1; r >= 0; r--) {
        if (!grid[r][col].classList.contains('red') && !grid[r][col].classList.contains('yellow')) {
            targetRow = r;
            break;
        }
    }
    
    if (targetRow !== -1) {
        board.removeEventListener('click', handleClick);
        
        animateFallingPiece(col, targetRow, () => {
            grid[targetRow][col].classList.add(currentPlayer);
            grid[targetRow][col].classList.add('bounce');
            
            setTimeout(() => {
                grid[targetRow][col].classList.remove('bounce');
            }, 300);
            
            if (checkWin(targetRow, col)) {
                message.textContent = `${currentPlayer === 'red' ? '🔴 Rouge' : '🟡 Jaune'} a gagné !`;
                if (getScreenSize() === 'lg') {
                    board.removeEventListener('mousemove', handleMouseMove);
                    if (previewPiece) previewPiece.style.display = 'none';
                }
            } else if (checkDraw()) {
                message.textContent = "Match nul ! 🤝";
                if (getScreenSize() === 'lg') {
                    board.removeEventListener('mousemove', handleMouseMove);
                    if (previewPiece) previewPiece.style.display = 'none';
                }
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                if (getScreenSize() === 'lg') {
                    updatePreviewPiece(col);
                }
                board.addEventListener('click', handleClick);
            }
        });
    }
}

function animateFallingPiece(col, targetRow, callback) {
    const fallingPiece = document.createElement('div');
    fallingPiece.classList.add('falling-piece', currentPlayer);
    
    const sizes = getCellSize();
    const boardRect = board.getBoundingClientRect();
    const cellSize = sizes.cell + sizes.gap;
    const pieceOffset = (sizes.cell - sizes.piece) / 2;
    const boardPadding = getScreenSize() === 'lg' ? 10 : (getScreenSize() === 'md' ? 8 : (getScreenSize() === 'sm' ? 6 : 5));
    
    const startX = boardRect.left + (col * cellSize) + pieceOffset + boardPadding;
    const startY = boardRect.top - (sizes.piece + 20);
    const endY = boardRect.top + (targetRow * cellSize) + pieceOffset + boardPadding;
    
    fallingPiece.style.position = 'fixed';
    fallingPiece.style.left = startX + 'px';
    fallingPiece.style.top = startY + 'px';
    fallingPiece.style.width = sizes.piece + 'px';
    fallingPiece.style.height = sizes.piece + 'px';
    
    document.body.appendChild(fallingPiece);
    
    const baseDuration = getScreenSize() === 'lg' ? 400 : (getScreenSize() === 'md' ? 350 : 300);
    const rowMultiplier = getScreenSize() === 'lg' ? 80 : (getScreenSize() === 'md' ? 60 : 50);
    const duration = baseDuration + (targetRow * rowMultiplier);
    
    fallingPiece.animate([
        { 
            top: startY + 'px',
            transform: 'scale(1)'
        },
        { 
            top: (endY - (getScreenSize() === 'lg' ? 20 : 15)) + 'px',
            transform: 'scale(1.1)',
            offset: 0.8
        },
        { 
            top: endY + 'px',
            transform: 'scale(1)'
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).addEventListener('finish', () => {
        document.body.removeChild(fallingPiece);
        callback();
    });
}

function checkDraw() {
    for (let c = 0; c < cols; c++) {
        if (!grid[0][c].classList.contains('red') && !grid[0][c].classList.contains('yellow')) {
            return false;
        }
    }
    return true;
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) ||
            checkDirection(row, col, 0, 1) ||
            checkDirection(row, col, 1, 1) ||
            checkDirection(row, col, 1, -1);
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

window.addEventListener('resize', () => {
    if (getScreenSize() === 'lg' && previewPiece) {
        if (!board.onmousemove) {
            board.addEventListener('mousemove', handleMouseMove);
        }
        previewPiece.style.display = 'block';
    } else if (previewPiece) {
        board.removeEventListener('mousemove', handleMouseMove);
        previewPiece.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    createGrid();
});