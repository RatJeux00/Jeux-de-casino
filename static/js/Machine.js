const walletElement = document.getElementById('wallet');
let wallet = 1000;
walletElement.textContent = wallet;

function machine() {
    let inputMise = document.getElementById('mise');
    let mise = parseInt(inputMise.value);
    console.log(mise);
    if (!mise || mise <= 0 || mise > wallet) {
        result.innerHTML = 'Mise invalide ou supérieure au montant du portefeuille.';
        return;
    }

    const fruits = ["banane", "fraise", "orange", "pomme"];
    
    const cellA = document.getElementById('cellA');
    const cellB = document.getElementById('cellB');
    const cellC = document.getElementById('cellC');

    cellA.className = 'cell';
    cellB.className = 'cell';
    cellC.className = 'cell';

    cellA.classList.add('rolling');
    cellB.classList.add('rolling');
    cellC.classList.add('rolling');

    let a = Math.floor(Math.random() * 4);
    let b = Math.floor(Math.random() * 4);
    let c = Math.floor(Math.random() * 4);

    setTimeout(() => {
        cellA.classList.remove('rolling');
        cellA.classList.add(fruits[a]);
    }, 500); // Affiche le fruit dans cellA après 500ms

    setTimeout(() => {
        cellB.classList.remove('rolling');
        cellB.classList.add(fruits[b]);
    }, 1000); // Affiche le fruit dans cellB après 1000ms

    setTimeout(() => {
        cellC.classList.remove('rolling');
        cellC.classList.add(fruits[c]);

        const result = document.getElementById('result');
        if (a === b && b === c) {
            result.innerHTML = 'Tu as gagné(e) !!!';
            wallet = wallet + 2 * mise;
        } else {
            result.innerHTML = 'Tu as perdu, recommence.';
            wallet = wallet - mise;
        }

        walletElement.textContent = wallet;
    }, 1500); // Affiche le fruit dans cellC après 1500ms et calcule le résultat
}
