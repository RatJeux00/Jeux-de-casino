let currentPlayer = document.getElementById("Bot");

let bulletPosition = -1;
let currentPosition

const Player = document.getElementById("Player");
const Bot = document.getElementById("Bot");
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
    document.getElementById("Player").classList.remove("dead")
    document.getElementById("Bot").classList.remove("dead")
    bulletPosition = Math.floor(Math.random() * 6);
    result.textContent = "🔁 Barillet tourné. Bonne chance !";

    revolver.style.animation = "rotate 1s ease";
    setTimeout(() => {
        revolver.style.animation = "";
    }, 1000);
};

let trigger = () => {
    if (loadedChamber === -1) {
        result.textContent = "💡 Tourne d'abord le barillet !";
        return;
    }

    const randomChamber = Math.floor(Math.random() * 6);

    if (randomChamber === loadedChamber) {
        currentPlayer.classList.add('dead');
        result.textContent = `💥 Bang ! ${currentPlayer.id} a perdu ! 😱`;
        loadedChamber = -1;
    } else {
        result.textContent = `😅 Clic ! ${currentPlayer.id} a survécu.`;
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
