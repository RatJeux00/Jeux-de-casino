const walletElement = document.getElementById('wallet');
const resultElement = document.getElementById('result');
const inputMise = document.getElementById('mise');
const cells = {
    A: document.getElementById('cellA'),
    B: document.getElementById('cellB'),
    C: document.getElementById('cellC')
};

const fruits = ["banane", "fraise", "orange", "pomme"];
let wallet = 1000;
walletElement.textContent = wallet;

function updateWallet(amount) {
    wallet += amount;
    walletElement.textContent = wallet;
}

function resetCells() {
    Object.values(cells).forEach(cell => {
        cell.className = 'cell rolling'; // Reset and add rolling animation
    });
}

function revealFruit(cell, index, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            cell.classList.remove('rolling');
            cell.classList.add(fruits[index]);
            resolve();
        }, delay);
    });
}

function getRandomFruitIndex() {
    return Math.floor(Math.random() * fruits.length);
}

function validateBet(mise) {
    if (!mise || mise <= 0 || mise > wallet) {
        resultElement.textContent = 'Mise invalide ou supérieure au montant du portefeuille.';
        return false;
    }
    return true;
}

async function machine() {
    const mise = parseInt(inputMise.value);
    if (!validateBet(mise)) return;

    resetCells();

    const results = [getRandomFruitIndex(), getRandomFruitIndex(), getRandomFruitIndex()];

    await revealFruit(cells.A, results[0], 500);
    await revealFruit(cells.B, results[1], 1000);
    await revealFruit(cells.C, results[2], 1500);

    const [a, b, c] = results;

    if (a === b && b === c) {
        resultElement.textContent = '🎉 Tu as gagné(e) !!!';
        updateWallet(mise * 2);
    } else {
        resultElement.textContent = '😢 Tu as perdu, recommence.';
        updateWallet(-mise);
    }
}
