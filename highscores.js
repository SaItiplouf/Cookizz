const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const scoreboard = document.querySelector(".scoreboard");


// Met à jour le nombre de points totaux
const totalPoints = highScores.reduce((total, score) => total + parseInt(score.score), 0);
document.querySelector(".stats tbody tr:nth-child(2) td:nth-child(2)").textContent = totalPoints;

// Met à jour le nombre de joueurs
document.querySelector(".stats tbody tr:nth-child(1) td:nth-child(2)").textContent = highScores.length;





// Limite la boucle à 5 scores maximum et trie par score décroissant
highScores.slice(0, 5).sort((a, b) => b.score - a.score).forEach(score => {
  const playerDiv = document.createElement("div");
  playerDiv.classList.add("player");

  const playerNameSpan = document.createElement("span");
  playerNameSpan.classList.add("player-name");

  const removePlayerButton = document.createElement("button");
  removePlayerButton.classList.add("remove-player");
  removePlayerButton.textContent = "✖";

  const isHighScoreSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
isHighScoreSvg.setAttribute("viewBox", "0 0 44 35");
isHighScoreSvg.classList.add("is-high-score");
isHighScoreSvg.setAttribute("data-name", score.name); // <-- ici

  const isHighScorePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  isHighScorePath.setAttribute("d", "M26.7616 10.6207L21.8192 0L16.9973 10.5603C15.3699 14.1207 10.9096 15.2672 7.77534 12.9741L0 7.24138L6.56986 28.8448H37.0685L43.5781 7.72414L35.7425 13.0948C32.6685 15.2672 28.3288 14.0603 26.7616 10.6207Z");
  isHighScorePath.setAttribute("transform", "translate(0 0.301727)");

  const playerName = document.createTextNode(score.name);
  const counterDiv = document.createElement("div");
  counterDiv.classList.add("counter");
  const counterScore = document.createElement("span");
  counterScore.classList.add("counter-score");
  counterScore.textContent = score.score;

  playerNameSpan.appendChild(removePlayerButton);
  isHighScoreSvg.appendChild(isHighScorePath);
  playerNameSpan.appendChild(isHighScoreSvg);
  playerNameSpan.appendChild(playerName);

  counterDiv.appendChild(counterScore);

  playerDiv.appendChild(playerNameSpan);
  playerDiv.appendChild(counterDiv);

  scoreboard.appendChild(playerDiv);
});

// Vérifie si le tableau a plus de 5 scores et si un nouveau score est supérieur au plus petit score
if (highScores.length > 5 && user.score > highScores[4].score) {
  // Remplace le score le plus faible avec le nouveau score et trie le tableau par score décroissant
  highScores.splice(4, 1, {name: user.name, score: user.score});
  highScores.sort((a, b) => b.score - a.score);
  // Mets à jour le localStorage avec le nouveau tableau de scores
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

scoreboard.insertAdjacentHTML("beforeend", `
<form id="formulaire">
<input type = 'text' name = 'author' id = 'author' placeholder = 'Nickname'>  
<input type="text" name = 'content' id='content' placeholder="Envoie un message">
<button class="bouttonchat" onclick='postMessage(event)'> Send </button>
</form>
`);

function highlightTopScore() {
  // Récupérer le tableau des scores trié par ordre décroissant
  const sortedScores = highScores.sort((a, b) => b.score - a.score);
  
  // Sélectionner le premier score (le plus élevé)
  const topScore = sortedScores[0];
  
  // Sélectionner le SVG correspondant à ce score
  const topScoreSvg = document.querySelector(`[data-name="${topScore.name}"]`);

  // Ajouter la classe CSS si le SVG a été trouvé
  if (topScoreSvg) {
    topScoreSvg.classList.add("is-reallyhigh-score");
  }
}

// Appeler la fonction pour l'appliquer au chargement de la page
highlightTopScore();