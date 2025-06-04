// Gestion des crédits
let userCredits = parseInt(localStorage.getItem('casinoCredits')) || 10000;

function updateCreditsDisplay() {
    document.getElementById('creditsAmount').textContent = userCredits.toLocaleString() + ' 💰';
    localStorage.setItem('casinoCredits', userCredits);
}

function addCredits() {
    userCredits += 1000;
    updateCreditsDisplay();
    
    // Animation de notification
    const creditsEl = document.getElementById('creditsAmount');
    creditsEl.style.transform = 'scale(1.2)';
    creditsEl.style.color = '#4CAF50';
    setTimeout(() => {
        creditsEl.style.transform = 'scale(1)';
        creditsEl.style.color = '#ffd700';
    }, 300);
}

// Navigation vers les jeux
function playGame(gameType) {
    const gameUrls = {
        'roulette': '/Roulette',
        'bandit': '/Bandit-Manchot',
        'morpion': '/Morpion',
        'puissance4': '/Puissance4',
        'click': '/Click',
        'cartes': '/jeu de carte'
    };
    
    if (gameUrls[gameType]) {
        // Animation de sortie
        document.body.style.opacity = '0.8';
        document.body.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            window.location.href = gameUrls[gameType];
        }, 300);
    }
}

// Génération des particules
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
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

// Animation des cartes au scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach(card => observer.observe(card));
}

// Sons d'ambiance (optionnel)
function playAmbientSound() {
    // Ici tu peux ajouter des sons d'ambiance casino
    // const audio = new Audio('sounds/casino-ambient.mp3');
    // audio.loop = true;
    // audio.volume = 0.1;
    // audio.play().catch(() => {}); // Ignore les erreurs d'autoplay
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateCreditsDisplay();
    createParticles();
    animateOnScroll();
    
    // Effet de transition d'entrée
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Effet de curseur personnalisé sur les cartes
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});