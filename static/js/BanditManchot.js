let wallet = 1000;
const fruits = ['🍎', '🍌', '🍊', '🍓', '🍇', '🥝', '🍒', '🥭', '🍑', '🍍'];
let isSpinning = false;

function updateWallet() {
    document.getElementById('wallet').textContent = wallet;
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

// FONCTION TOTALEMENT REÉCRITE pour créer l'animation de roulement
function createReelAnimation(reelId, finalSymbol, duration) {
    const reel = document.getElementById(reelId);
    const cell = reel.parentElement;
    
    // Masquer le symbole original
    reel.style.opacity = '0';
    
    // Créer le container de défilement
    const scrollContainer = document.createElement('div');
    scrollContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(145deg, #2c3e50, #34495e);
        border-radius: 12px;
    `;
    
    // Créer le contenu qui va défiler
    const scrollContent = document.createElement('div');
    scrollContent.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: translateY(0px);
        transition: none;
    `;
    
    // Créer une liste de symboles pour l'animation
    const symbolList = [];
    for (let i = 0; i < 20; i++) {
        symbolList.push(fruits[Math.floor(Math.random() * fruits.length)]);
    }
    symbolList.push(finalSymbol);
    
    // Créer les éléments visuels
    symbolList.forEach((symbol, index) => {
        const symbolElement = document.createElement('div');
        symbolElement.textContent = symbol;
        symbolElement.style.cssText = `
            font-size: 4rem;
            line-height: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
            font-weight: bold;
            background: ${index % 2 === 0 ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
            margin: 2px 0;
            border-radius: 8px;
            width: 100%;
            border: 1px solid rgba(255, 215, 0, 0.2);
        `;
        scrollContent.appendChild(symbolElement);
    });
    
    scrollContainer.appendChild(scrollContent);
    cell.appendChild(scrollContainer);
    
    // Calculer la position finale pour que le dernier symbole soit centré
    const symbolHeight = 124; // hauteur + marge
    const cellHeight = 120; // hauteur de la cellule
    const centerOffset = (cellHeight - symbolHeight) / 2; // pour centrer
    const finalPosition = -((symbolList.length - 1) * symbolHeight) + centerOffset;
    
    // Démarrer l'animation depuis le haut (plusieurs symboles au-dessus)
    let currentPosition = symbolHeight * 3; // Commencer encore plus haut
    scrollContent.style.transform = `translateY(${currentPosition}px)`;
    
    // Animation progressive
    const startTime = Date.now();
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Courbe d'accélération/décélération plus douce
        const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        currentPosition = (symbolHeight * 3) + (finalPosition - (symbolHeight * 3)) * easeProgress;
        scrollContent.style.transform = `translateY(${currentPosition}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation terminée - s'assurer que le dernier symbole est parfaitement centré
            scrollContent.style.transform = `translateY(${finalPosition}px)`;
            
            setTimeout(() => {
                reel.textContent = finalSymbol;
                reel.style.opacity = '1';
                if (cell.contains(scrollContainer)) {
                    cell.removeChild(scrollContainer);
                }
            }, 300);
        }
    };
    
    // Commencer l'animation après un petit délai
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 50);
}

function machine() {
    if (isSpinning) return;

    playSpinSound()

    const mise = parseInt(document.getElementById('mise').value);
    const resultDiv = document.getElementById('result');
    const machineDiv = document.getElementById('machine');

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

    // Ajouter l'effet de vibration à la machine
    machineDiv.classList.add('spinning');
    
    // Générer les résultats finaux
    const results = [
        fruits[Math.floor(Math.random() * fruits.length)],
        fruits[Math.floor(Math.random() * fruits.length)],
        fruits[Math.floor(Math.random() * fruits.length)]
    ];

    resultDiv.textContent = "🎰 Les rouleaux tournent...";
    resultDiv.className = "";

    // Lancer les animations de roulement avec des durées différentes
    createReelAnimation('reelA', results[0], 2000);
    createReelAnimation('reelB', results[1], 2500);
    createReelAnimation('reelC', results[2], 3000);

    // Traitement des résultats après la plus longue animation
    setTimeout(() => {
        machineDiv.classList.remove('spinning');
        
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
                resultDiv.textContent = "💸 Plus de crédits ! Rechargez votre portefeuille.";
                resultDiv.className = 'result-lose';
            }, 2000);
        }

        isSpinning = false;
    }, 3200);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateWallet();
    createParticles();

    // Initialiser les symboles
    document.getElementById('reelA').textContent = '🍎';
    document.getElementById('reelB').textContent = '🍌';
    document.getElementById('reelC').textContent = '🍊';
});

// Permettre de jouer avec Enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        machine();
    }
});

// Effet sur le bouton
document.addEventListener('DOMContentLoaded', function() {
    const leverButton = document.querySelector('.btn');
    if (leverButton) {
        leverButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

//Son Spin
function playSpinSound() {
    const audio = new Audio('../static/sounds/Bandit-Manchot_spin.mp3');
    audio.volume = 0.1;
    audio.play().catch(() => {}); // Ignore les erreurs d'autoplay

    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Réinitialise la lecture
    }, 4500);
}