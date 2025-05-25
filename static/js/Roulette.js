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
