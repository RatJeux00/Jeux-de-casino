document.addEventListener("DOMContentLoaded", function () {
    // Créer le tableau de jeu et l'ajouter au conteneur
    const morpionContainer = document.getElementById('morpion');

    // Créer les 9 cases
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        morpionContainer.appendChild(cell);
    }

    // Variables pour gérer le tour et les couleurs
    let currentPlayer = 'X'; // Le joueur qui commence
    let isGameActive = true;  // Le jeu est actif au départ

    // Fonction pour gérer les clics sur les cases
    morpionContainer.addEventListener('click', function (event) {
        if (!isGameActive) return;

        const clickedCell = event.target;

        // Vérifier si la case est vide
        if (!clickedCell.classList.contains('cell') || clickedCell.textContent !== '') return;

        // Ajouter le symbole du joueur et changer la couleur de la case
        clickedCell.textContent = currentPlayer;

        const result = document.getElementById('result');

        // Vérifier si un joueur a gagné
        if (checkWinner()) {
            result.innerHTML = currentPlayer + ' a gagné!';
            //ajouté le systéme de clear avec un bouton
            isGameActive = false;
        }

        // Changer de joueur
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    });

    // Fonction pour vérifier si un joueur a gagné
    function checkWinner() {
        const cells = document.querySelectorAll('.cell');
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
            [0, 4, 8], [2, 4, 6] // Diagonales
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent && 
                   cells[a].textContent === cells[b].textContent && 
                   cells[a].textContent === cells[c].textContent;
        });
    }

    const buttonClear = document.getElementById('buttonClear');
    const cells = document.querySelectorAll('.cell');

    buttonClear.addEventListener('click', function (event){
        cells.innerHTML = "";
    });
});

