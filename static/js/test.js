let selectedPiece = null;
let turn = "white"; // Suivi du tour actuel : "white" ou "black"
const coordinates = {
    startRow: null,
    startCol: null,
    endRow: null,
    endCol: null
};

// Fonction pour générer l'échiquier
function generateChessBoard() {
    const chessboard = document.getElementById("chessboard");

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const square = document.createElement("div");
            square.classList.add('square');

            square.dataset.row = r;
            square.dataset.col = c;

            if ((r + c) % 2 === 0) {
                square.classList.add('white');
            } else {
                square.classList.add('black');
            }
            chessboard.appendChild(square);
            BlackPiecePlacement(square, r, c);
            whitePiecePlacement(square, r, c);
        }
    }
}

// Fonction d'initialisation du jeu
function initGame() {
    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('click', () => {
            const piece = square.querySelector('.white-piece, .black-piece');

            if (selectedPiece) {
                // Coordonnées de destination
                coordinates.startRow = parseInt(selectedPiece.parentElement.dataset.row);
                coordinates.startCol = parseInt(selectedPiece.parentElement.dataset.col);
                coordinates.endRow = parseInt(square.dataset.row);
                coordinates.endCol = parseInt(square.dataset.col);

                if (selectedPiece === piece) {
                    selectedPiece.classList.remove('selected');
                    selectedPiece = null;
                } else {
                    handleMove(square);
                }
            } else if (piece) {
                // Vérifie si c'est au tour de cette couleur
                const pieceColor = piece.classList.contains('white-piece') ? "white" : "black";
                if (pieceColor === turn) {
                    piece.classList.add('selected');
                    selectedPiece = piece;
                } else {
                    alert(`C'est au tour des ${turn}s de jouer.`);
                }
            }
        });
    });
}

// Fonction pour gérer le roulement du jeux 
function handleMove(square) {
    const validMove = isValidMove(square); // Vérifier si le mouvement est valide
    if (validMove) {
        capturePiece(square); // Capturer si le mouvement est valide
        square.appendChild(selectedPiece);
        selectedPiece.classList.remove('selected');
        selectedPiece = null;

        // Passer au joueur suivant
        turn = turn === "white" ? "black" : "white";
    } else {
        alert("Mouvement imposible");
    }
}

function BlackPiecePlacement(square, r, c) {
    if (r === 1) {
        const blackPawn = document.createElement('div');
        blackPawn.classList.add('black-pawn', 'black-piece', 'first-move');
        square.appendChild(blackPawn);
    } else if (r === 0) {
        if (c === 0 || c === 7) {
            const blackRook = document.createElement('div');
            blackRook.classList.add('black-rook', 'black-piece');
            square.appendChild(blackRook);
        } else if (c === 1 || c === 6) {
            const blackKnight = document.createElement('div');
            blackKnight.classList.add('black-knight', 'black-piece');
            square.appendChild(blackKnight);
        } else if (c === 2 || c === 5) {
            const blackBishop = document.createElement('div');
            blackBishop.classList.add('black-bishop', 'black-piece');
            square.appendChild(blackBishop);
        } else if (c === 3) {
            const blackQueen = document.createElement('div');
            blackQueen.classList.add('black-queen', 'black-piece');
            square.appendChild(blackQueen);
        } else if (c === 4) {
            const blackKing = document.createElement('div');
            blackKing.classList.add('black-king', 'black-piece');
            square.appendChild(blackKing);
        }
    }
}
function whitePiecePlacement(square, r, c) {
    if (r === 6) {
        const whitePawn = document.createElement('div');
        whitePawn.classList.add('white-pawn', 'white-piece', 'first-move');
        square.appendChild(whitePawn);
    } else if (r === 7) {
        if (c === 0 || c === 7) {
            const whiteRook = document.createElement('div');
            whiteRook.classList.add('white-rook', 'white-piece');
            square.appendChild(whiteRook);
        } else if (c === 1 || c === 6) {
            const whiteKnight = document.createElement('div');
            whiteKnight.classList.add('white-knight', 'white-piece');
            square.appendChild(whiteKnight);
        } else if (c === 2 || c === 5) {
            const whiteBishop = document.createElement('div');
            whiteBishop.classList.add('white-bishop', 'white-piece');
            square.appendChild(whiteBishop);
        } else if (c === 3) {
            const whiteQueen = document.createElement('div');
            whiteQueen.classList.add('white-queen', 'white-piece');
            square.appendChild(whiteQueen);
        } else if (c === 4) {
            const whiteKing = document.createElement('div');
            whiteKing.classList.add('white-king', 'white-piece');
            square.appendChild(whiteKing);
        }
    }
}
// Fonction pour capturer une pièce ennemie
function capturePiece(square) {
    const targetPiece = square.querySelector(selectedPiece.classList.contains('black-piece') ? '.white-piece' : '.black-piece');
    if (targetPiece) {
        targetPiece.remove();
    }
}
// Vérification de la validité du mouvement
function isValidMove(square) {
    // vérifie si c'est la même coleur
    const targetPiece = square.querySelector('.white-piece, .black-piece');
    if (targetPiece) {
        const sameColor = selectedPiece.classList.contains('white-piece') && targetPiece.classList.contains('white-piece') ||
                          selectedPiece.classList.contains('black-piece') && targetPiece.classList.contains('black-piece');

        if (sameColor) {
            return false;
        }
    }


    if (selectedPiece.classList.contains('black-pawn')) {
        return isValidBlackPawnMove(square);
    } else if (selectedPiece.classList.contains('white-pawn')) {
        return isValidWhitePawnMove(square);
    } else if (selectedPiece.classList.contains('white-rook') || selectedPiece.classList.contains('black-rook')) {
        return isValidRookMove();
    } else if (selectedPiece.classList.contains('white-knight') || selectedPiece.classList.contains('black-knight')){
        return isValidknightMove();
    } else if (selectedPiece.classList.contains('white-bishop') || selectedPiece.classList.contains('black-bishop')){
        return isValidBishopMove();
    } else if (selectedPiece.classList.contains('white-queen') || selectedPiece.classList.contains('black-queen')){
        return isValidQueenMove();
    } else if (selectedPiece.classList.contains('black-king') || selectedPiece.classList.contains('white-king')){
        return isValidKingMove();
    }
    // Ajoutez ici les autres vérifications pour les mouvements des pièces
    return false;
}
function isValidBlackPawnMove(square) {
    const { startRow, startCol, endRow, endCol } = coordinates;
    
    // Vérifie si la case devant est occupée
    const chessboard = document.getElementById("chessboard");
    const forwardSquare = chessboard.querySelector(`[data-row="${startRow + 1}"][data-col="${startCol}"]`);
    const twoForwardSquare = chessboard.querySelector(`[data-row="${startRow + 2}"][data-col="${startCol}"]`);

    const isBlocked = forwardSquare.querySelector('.white-piece, .black-piece');
    const isTwoStepBlocked = startRow === 1 && twoForwardSquare.querySelector('.white-piece, .black-piece');

    const blackPawnMove = !isBlocked && startRow === endRow - 1 && startCol === endCol;
    const blackPawnFirstMove = !isBlocked && !isTwoStepBlocked && startRow === endRow - 2 && startCol === endCol && selectedPiece.classList.contains('first-move');
    const diagonalCapture = startRow === endRow - 1 && Math.abs(startCol - endCol) === 1 && square.querySelector('.white-piece');

    if (selectedPiece.classList.contains('first-move')) {
        selectedPiece.classList.remove('first-move');
    }

    return blackPawnMove || blackPawnFirstMove || diagonalCapture;
}
function isValidWhitePawnMove(square) {
    const { startRow, startCol, endRow, endCol } = coordinates;
    
    // Vérifie si la case devant est occupée
    const chessboard = document.getElementById("chessboard");
    const forwardSquare = chessboard.querySelector(`[data-row="${startRow - 1}"][data-col="${startCol}"]`);
    const twoForwardSquare = chessboard.querySelector(`[data-row="${startRow - 2}"][data-col="${startCol}"]`);

    const isBlocked = forwardSquare.querySelector('.white-piece, .black-piece');
    const isTwoStepBlocked = startRow === 6 && twoForwardSquare.querySelector('.white-piece, .black-piece');

    const whitePawnMove = !isBlocked && startRow === endRow + 1 && startCol === endCol;
    const whitePawnFirstMove = !isBlocked && !isTwoStepBlocked && startRow === endRow + 2 && startCol === endCol && selectedPiece.classList.contains('first-move');
    const diagonalCapture = startRow === endRow + 1 && Math.abs(startCol - endCol) === 1 && square.querySelector('.black-piece');

    if (selectedPiece.classList.contains('first-move')) {
        selectedPiece.classList.remove('first-move');
    }

    return whitePawnMove || whitePawnFirstMove || diagonalCapture;
}
function isValidRookMove() {
    const { startRow, endRow, startCol, endCol } = coordinates;
    // Vérifie si le mouvement est horizontal ou vertical
    const horizontalMove = startRow === endRow;
    const verticalMove = startCol === endCol;

    if (!(horizontalMove || verticalMove)) {
        return false; // Pas un mouvement valide pour une tour
    }
    // Vérifie s'il y a des obstacles sur le chemin
    const chessboard = document.getElementById("chessboard");
    if (horizontalMove || verticalMove) {
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);
        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        for (let col = minCol + 1; col < maxCol; col++) {
            const squareBetween = chessboard.querySelector(`[data-row="${startRow}"][data-col="${col}"]`);
            if (squareBetween.querySelector('.white-piece, .black-piece')) {
                return false; // Il y a une pièce sur le chemin
            }
        }
        for (let row = minRow + 1; row < maxRow; row++) {
            const squareBetween = chessboard.querySelector(`[data-row="${row}"][data-col="${startCol}"]`);
            if (squareBetween.querySelector('.white-piece, .black-piece')) {
                return false; // Il y a une pièce sur le chemin
            }
        }
    } 
    return true; // Le mouvement est valide
}
function isValidknightMove() {
    const {startCol, endCol, startRow, endRow} = coordinates;

    const knightMove = Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 1|| Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 2;

    return knightMove;

}
function isValidBishopMove() {
    const { startCol, endCol, startRow, endRow } = coordinates;
    // Vérifie que le déplacement est en diagonale
    if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) {
        return false;
    }
    // Parcourt les cases entre le départ et l'arrivée
    const rowStep = startRow < endRow ? 1 : -1;
    const colStep = startCol < endCol ? 1 : -1;
    let row = startRow + rowStep;
    let col = startCol + colStep;

    while (row !== endRow && col !== endCol) {
        if (document.querySelector(`[data-row="${row}"][data-col="${col}"] .white-piece, [data-row="${row}"][data-col="${col}"] .black-piece`)) {
            return false; // Une pièce bloque le chemin
        }
        row += rowStep;
        col += colStep;
    }
    return true;
}

function isValidQueenMove(){
    const queenMove = isValidRookMove() || isValidBishopMove();

    return queenMove;
}
function isValidKingMove(){
    const { startCol, endCol, startRow, endRow } = coordinates;
    const kingMove = Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1;

    return kingMove;
}

generateChessBoard();
initGame();
