let currentPlayer = document.getElementById("Bot");

let bulletPosition = -1;
let currentPosition = 0;

const result = document.getElementById("result");
const revolverWrapper = document.getElementById("RevolverWrapper");
const revolver = document.getElementById("Revolver");

const updateDirection = () => {
    revolverWrapper.classList.remove("rotate-left", "rotate-right");

    if (currentPlayer.id === 'Bot') {
        revolverWrapper.classList.add("rotate-left");
    } else {
        revolverWrapper.classList.add("rotate-right");
    }
};

let spin = () => {
    document.getElementById("Player").classList.remove("dead");
    document.getElementById("Bot").classList.remove("dead");

    bulletPosition = Math.floor(Math.random() * 6);
    currentPosition = 0;
    result.textContent = "🔁 Barillet tourné. Bonne chance !";

    // Redémarre proprement l'animation
    revolver.classList.remove("reload-spin");
    void revolver.offsetWidth; // force reflow
    revolver.classList.add("reload-spin");
};

let trigger = () => {
    if (bulletPosition === -1) {
        result.textContent = "💡 Tourne d'abord le barillet !";
        return;
    }

    if (currentPosition === bulletPosition) {
        currentPlayer.classList.add('dead');
        result.textContent = `💥 Bang ! ${currentPlayer.id} a perdu ! 😱`;
        bulletPosition = -1;
    } else {
        result.textContent = `😅 Clic ! ${currentPlayer.id} a survécu.`;
        currentPosition = (currentPosition + 1) % 6;

        currentPlayer = currentPlayer.id === 'Bot'
            ? document.getElementById("Player")
            : document.getElementById("Bot");
        updateDirection();
    }
};

document.getElementById("spinButton").addEventListener("click", () => {
    spin();
    updateDirection();
});

document.getElementById("triggerButton").addEventListener("click", trigger);

updateDirection(); // Initialisation


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