const fruits = ["banane", "fraise", "orange", "pomme"];
let wallet = 1000;

function createReelHTML() {
    let html = '';
    for (let i = 0; i < 10; i++) {
        const fruit = fruits[Math.floor(Math.random() * fruits.length)];
        html += `<img src="../static/images/${fruit}.png" alt="${fruit}">`;
    }
    return html;
}

async function spinReel(reelElement, finalFruit) {
    // Génère les 10 images + dernière image qui sera le résultat
    reelElement.innerHTML = createReelHTML();
    reelElement.innerHTML += `<img src="../static/images/${finalFruit}.png" alt="${finalFruit}">`;

    // Force le style pour reinitialiser avant animation
    reelElement.style.transition = 'none';
    reelElement.style.transform = 'translateY(0px)';
    void reelElement.offsetHeight;

    // Calcule la hauteur totale a faire défiler (nombre d'images * 80px)
    const totalHeight = (reelElement.children.length - 1) * 80;

    // Lance l’animation
    reelElement.style.transition = 'transform 1.5s ease-out';
    reelElement.style.transform = `translateY(-${totalHeight}px)`;

    
    return new Promise(resolve => {
        setTimeout(() => resolve(), 1600);
    });
}

async function machine() {
    const mise = parseInt(document.getElementById('mise').value);
    const resultDiv = document.getElementById('result');
    const walletDiv = document.getElementById('wallet');

    if (!mise || mise <= 0 || mise > wallet) {
        resultDiv.textContent = "Mise invalide.";
        return;
    }

    const reels = [
        document.getElementById('reelA'),
        document.getElementById('reelB'),
        document.getElementById('reelC')
    ];

    const finalFruits = reels.map(() => fruits[Math.floor(Math.random() * fruits.length)]);

    for (let i = 0; i < reels.length; i++) {
        await spinReel(reels[i], finalFruits[i]);
    }

    const [a, b, c] = finalFruits;
    if (a === b && b === c) {
        resultDiv.textContent = "🎉 Tu as gagné !";
        wallet += mise * 2;
    } else {
        resultDiv.textContent = "❌ Perdu...";
        wallet -= mise;
    }

    walletDiv.textContent = wallet;
}
// const walletElement = document.getElementById('wallet');
// const resultElement = document.getElementById('result');
// const inputMise = document.getElementById('mise');
// const cells = {
//     A: document.getElementById('cellA'),
//     B: document.getElementById('cellB'),
//     C: document.getElementById('cellC')
// };

// const fruits = ["banane", "fraise", "orange", "pomme"];
// let wallet = 1000;
// walletElement.textContent = wallet;

// function updateWallet(amount) {
//     wallet += amount;
//     walletElement.textContent = wallet;
// }

// function resetCells() {
//     Object.values(cells).forEach(cell => {
//         cell.className = 'cell rolling'; // Reset and add rolling animation
//     });
// }

// function revealFruit(cell, index, delay) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             cell.classList.remove('rolling');
//             cell.classList.add(fruits[index]);
//             resolve();
//         }, delay);
//     });
// }

// function getRandomFruitIndex() {
//     return Math.floor(Math.random() * fruits.length);
// }

// function validateBet(mise) {
//     if (!mise || mise <= 0 || mise > wallet) {
//         resultElement.textContent = 'Mise invalide ou supérieure au montant du portefeuille.';
//         return false;
//     }
//     return true;
// }

// async function machine() {
//     const mise = parseInt(inputMise.value);
//     if (!validateBet(mise)) return;

//     resetCells();

//     const results = [getRandomFruitIndex(), getRandomFruitIndex(), getRandomFruitIndex()];

//     await revealFruit(cells.A, results[0], 500);
//     await revealFruit(cells.B, results[1], 1000);
//     await revealFruit(cells.C, results[2], 1500);

//     const [a, b, c] = results;

//     if (a === b && b === c) {
//         resultElement.textContent = '🎉 Tu as gagné(e) !!!';
//         updateWallet(mise * 2);
//     } else {
//         resultElement.textContent = '😢 Tu as perdu, recommence.';
//         updateWallet(-mise);
//     }
// }
