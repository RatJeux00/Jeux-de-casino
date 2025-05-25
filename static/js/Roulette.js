let currentPlayer = document.getElementById("Bot");

let bulletPosition = -1; // Position de la balle dans le barillet
let currentPosition = 0; // Position actuelle du barillet

const result = document.getElementById("result");
const revolver = document.getElementById("Revolver");

const updateDirection = () => {
    if (currentPlayer.id === 'Bot') {
        revolver.classList.remove("rotate-right");
        revolver.classList.add("rotate-left");
    } else {
        revolver.classList.remove("rotate-left");
        revolver.classList.add("rotate-right");
    }
};

let spin = () => {
    document.getElementById("Player").classList.remove("dead");
    document.getElementById("Bot").classList.remove("dead");

    bulletPosition = Math.floor(Math.random() * 6); // Place la balle
    currentPosition = 0; // Réinitialise le barillet
    console.log("💣 Balle dans la chambre :", bulletPosition);

    result.textContent = "🔁 Barillet tourné. Bonne chance !";

    revolver.style.animation = "rotate 1s ease";
    setTimeout(() => {
        revolver.style.animation = "";
    }, 1000);
};

let trigger = () => {
    if (bulletPosition === -1) {
        result.textContent = "💡 Tourne d'abord le barillet !";
        return;
    }

    console.log("🔫 Tentative avec chambre :", currentPosition);

    if (currentPosition === bulletPosition) {
        currentPlayer.classList.add('dead');
        result.textContent = `💥 Bang ! ${currentPlayer.id} a perdu ! 😱`;
        bulletPosition = -1; // Réinitialise la partie
    } else {
        result.textContent = `😅 Clic ! ${currentPlayer.id} a survécu.`;
        currentPosition = (currentPosition + 1) % 6; // Avance le barillet

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
