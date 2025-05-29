const fruits = ["banane", "fraise", "orange", "pomme"];
let wallet = 1000;

function createReelHTML() {
    let html = '';
    for (let i = 0; i < 10; i++) {
        const fruit = fruits[Math.floor(Math.random() * fruits.length)];
        html += `<img src="../static/images/BanditManchot/${fruit}.png" alt="${fruit}">`;
    }
    return html;
}

async function spinReel(reelElement, finalFruit) {
    reelElement.innerHTML = createReelHTML();
    reelElement.innerHTML += `<img src="../static/images/BanditManchot/${finalFruit}.png" alt="${finalFruit}">`;

    reelElement.style.transition = 'none';
    reelElement.style.transform = 'translateY(0px)';
    void reelElement.offsetHeight;

    const totalHeight = (reelElement.children.length - 1) * 80;

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