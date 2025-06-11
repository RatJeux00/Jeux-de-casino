const rows = 6;
const cols = 7;
const grid = [];
let currentPlayer = 'red';
const board = document.getElementById('puissance4');
const message = document.getElementById('message');
const previewPiece = document.getElementById('preview-piece');
const previewZone = document.getElementById('preview-zone');

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
    board.addEventListener('mousemove', handleMouseMove);
    
    // Position initiale de la pièce de prévisualisation
    updatePreviewPiece(3); // colonne du milieu
}

function handleMouseMove(e) {
    if (!e.target.classList.contains('cell')) return;
    const col = parseInt(e.target.dataset.col);
    updatePreviewPiece(col);
}

function updatePreviewPiece(col) {
    // Calculer la position de la pièce de prévisualisation
    const cellWidth = 80 + 5; // largeur de cellule + gap
    const boardStartX = (previewZone.offsetWidth - (cols * cellWidth - 5)) / 2;
    const pieceX = boardStartX + (col * cellWidth) + (cellWidth / 2) - (previewPiece.offsetWidth / 2);
    
    previewPiece.style.left = pieceX + 'px';
    previewPiece.className = currentPlayer;
}

function handleClick(e) {
    if (!e.target.classList.contains('cell')) return;
    const col = parseInt(e.target.dataset.col);
    
    // Vérifier si la colonne est pleine
    if (grid[0][col].classList.contains('red') || grid[0][col].classList.contains('yellow')) {
        return; // Colonne pleine
    }
    
    // Trouver la ligne où la pièce va tomber
    let targetRow = -1;
    for (let r = rows - 1; r >= 0; r--) {
        if (!grid[r][col].classList.contains('red') && !grid[r][col].classList.contains('yellow')) {
            targetRow = r;
            break;
        }
    }
    
    if (targetRow !== -1) {
        // Désactiver les clics pendant l'animation
        board.removeEventListener('click', handleClick);
        
        // Créer et animer la pièce qui tombe
        animateFallingPiece(col, targetRow, () => {
            // Callback exécuté après l'animation
            grid[targetRow][col].classList.add(currentPlayer);
            grid[targetRow][col].classList.add('bounce');
            
            // Retirer l'animation bounce après un délai
            setTimeout(() => {
                grid[targetRow][col].classList.remove('bounce');
            }, 300);
            
            if (checkWin(targetRow, col)) {
                message.textContent = `${currentPlayer === 'red' ? '🔴 Rouge' : '🟡 Jaune'} a gagné !`;
                board.removeEventListener('mousemove', handleMouseMove);
                previewPiece.style.display = 'none';
            } else if (checkDraw()) {
                message.textContent = "Match nul ! 🤝";
                board.removeEventListener('mousemove', handleMouseMove);
                previewPiece.style.display = 'none';
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                updatePreviewPiece(col);
                // Réactiver les clics
                board.addEventListener('click', handleClick);
            }
        });
    }
}

function animateFallingPiece(col, targetRow, callback) {
    // Créer la pièce qui tombe
    const fallingPiece = document.createElement('div');
    fallingPiece.classList.add('falling-piece', currentPlayer);
    
    // Calculer les positions
    const boardRect = board.getBoundingClientRect();
    const cellSize = 80 + 5; // taille cellule + gap
    const startX = boardRect.left + (col * cellSize) + 15; // +15 pour centrer (80-70)/2 + 10 padding
    const startY = boardRect.top - 100; // Commencer au-dessus du plateau
    const endY = boardRect.top + (targetRow * cellSize) + 15; // Position finale
    
    // Positionner la pièce
    fallingPiece.style.position = 'fixed';
    fallingPiece.style.left = startX + 'px';
    fallingPiece.style.top = startY + 'px';
    
    document.body.appendChild(fallingPiece);
    
    // Animation de chute avec effet de rebond
    const duration = 400 + (targetRow * 80); // Plus long pour les rangées du bas
    fallingPiece.animate([
        { 
            top: startY + 'px',
            transform: 'scale(1)'
        },
        { 
            top: (endY - 20) + 'px',
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
        // Supprimer la pièce qui tombe
        document.body.removeChild(fallingPiece);
        // Exécuter le callback
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
    return checkDirection(row, col, 1, 0) ||  // horizontal
            checkDirection(row, col, 0, 1) ||  // vertical
            checkDirection(row, col, 1, 1) ||  // diagonal descendante
            checkDirection(row, col, 1, -1);   // diagonal montante
}

function checkDirection(row, col, dr, dc) {
    const color = grid[row][col].classList.contains('red') ? 'red' : 'yellow';
    let count = 1;

    // Compter dans une direction
    for (let i = 1; i < 4; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains(color)) {
            count++;
        } else break;
    }

    // Compter dans l'autre direction
    for (let i = 1; i < 4; i++) {
        const r = row - i * dr;
        const c = col - i * dc;
        if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains(color)) {
            count++;
        } else break;
    }

    return count >= 4;
}

// Initialiser le jeu
createGrid();