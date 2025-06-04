let wallet = parseInt(localStorage.getItem('banditWallet')) || 1000;
const fruits = ['🍎', '🍌', '🍊', '🍓', '🍇', '🥝'];
let isSpinning = false;

function updateWallet() {
    document.getElementById('wallet').textContent = wallet;
    localStorage.setItem('banditWallet', wallet);
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (3 + Math.random() * 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

function createFireworks() {
    const container = document.createElement('div');
    container.className = 'jackpot-effect';
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'jackpot-firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            container.appendChild(firework);
        }, i * 100);
    }

    setTimeout(() => {
        document.body.removeChild(container);
    }, 3000);
}

function machine() {
    if (isSpinning) return;

    const mise = parseInt(document.getElementById('mise').value);
    const resultDiv = document.getElementById('result');

    if (!mise || mise < 1) {
        resultDiv.textContent = "Veuillez entrer une mise valide !";
        resultDiv.className = 'result-lose';
        return;
    }

    if (mise > wallet) {
        resultDiv.textContent = "Mise trop élevée ! Fonds insuffisants.";
        resultDiv.className = 'result-lose';
        return;
    }

    wallet -= mise;
    updateWallet();
    isSpinning = true;

    const reels = ['reelA', 'reelB', 'reelC'];
    reels.forEach(reel => {
        document.getElementById(reel).classList.add('spinning');
    });

    const results = [
        fruits[Math.floor(Math.random() * fruits.length)],
        fruits[Math.floor(Math.random() * fruits.length)],
        fruits[Math.floor(Math.random() * fruits.length)]
    ];

    setTimeout(() => {
        reels.forEach((reel, index) => {
            const reelElement = document.getElementById(reel);
            reelElement.textContent = results[index];
            reelElement.classList.remove('spinning');
        });

        let gain = 0;
        let message = "";
        let resultClass = "";

        if (results[0] === results[1] && results[1] === results[2]) {
            gain = mise * 10;
            message = `🎉 JACKPOT ! Vous gagnez ${gain} crédits !`;
            resultClass = 'result-win';
            createFireworks();
        } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
            gain = mise * 2;
            message = `✨ Paire ! Vous gagnez ${gain} crédits !`;
            resultClass = 'result-win';
        } else {
            message = `💔 Perdu ! Vous perdez ${mise} crédits.`;
            resultClass = 'result-lose';
        }

        wallet += gain;
        updateWallet();

        resultDiv.textContent = message;
        resultDiv.className = resultClass;

        if (wallet <= 0) {
            setTimeout(() => {
                resultDiv.textContent = "💸 Plus de crédits ! Retournez à l'accueil pour en ajouter.";
                resultDiv.className = 'result-lose';
            }, 2000);
        }

        isSpinning = false;
    }, 2000);

    resultDiv.textContent = "🎰 Les rouleaux tournent...";
    resultDiv.className = "";
}

document.addEventListener('DOMContentLoaded', function() {
    updateWallet();
    createParticles();

    document.getElementById('reelA').textContent = '🍎';
    document.getElementById('reelB').textContent = '🍌';
    document.getElementById('reelC').textContent = '🍊';
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        machine();
    }
});
