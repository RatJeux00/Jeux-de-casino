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
  // Génère les 10 images + la dernière image qui sera le résultat
  reelElement.innerHTML = createReelHTML();
  reelElement.innerHTML += `<img src="../static/images/${finalFruit}.png" alt="${finalFruit}">`;

  // Force le style pour réinitialiser avant animation
  reelElement.style.transition = 'none';
  reelElement.style.transform = 'translateY(0px)';
  void reelElement.offsetHeight;

  // Calcule la hauteur totale à faire défiler (nombre d'images * 80px)
  const totalHeight = (reelElement.children.length - 1) * 80;

  // Lance l’animation
  reelElement.style.transition = 'transform 1.5s ease-out';
  reelElement.style.transform = `translateY(-${totalHeight}px)`;

  // Attend la fin de l'animation
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
