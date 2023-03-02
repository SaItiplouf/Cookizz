const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');


////////////////////////////////////////////////////////////////////////////
///////  ///  ///  ///  ///  ///  ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Affiche les prochaines questions et de manière aléatoire, empêche de réutiliser plusieurs questions (stockées dans le tableau tableauAskedquestions)


let randomQuestionIndex = 0;
let tableauAskedQuestions = [];
const choiceElements = document.querySelectorAll('.choice-text');
let numQuestions = 0; // Initialisation en dehors de la fonction

async function loadRandomQuestion() {
  const response = await fetch('./api/questions.php');
  const questions = await response.json();
  
  // On ne veut poser que 3 questions au maximum
  if (tableauAskedQuestions.length >= 3) {
    return;
  }

  // Sélection d'un élément aléatoire du tableau (en dehors des éléments déjà posés)
  let randomIndex = questions.length;
  while (tableauAskedQuestions.includes(randomIndex) || randomIndex >= questions.length) {
    randomIndex = Math.floor(Math.random() * questions.length);
  }

  // Mise à jour de l'élément HTML de la question avec la nouvelle question aléatoire
  const questionElement = document.getElementById('question');
  questionElement.textContent = questions[randomIndex].question;

  // Stockage de l'index de la question actuelle pour éviter de sélectionner la même question deux fois de suite
  randomQuestionIndex = randomIndex;

  // Mise à jour des éléments HTML des choix de réponse avec les nouvelles données aléatoires
  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].textContent = questions[randomIndex]['choice' + (i+1)];
    choiceElements[i].classList.remove('correct', 'incorrect'); // Retirer les classes CSS existantes
  }

  // Ajout de l'index de la question posée dans le tableau des questions déjà posées
  tableauAskedQuestions.push(randomIndex);

  // Mise à jour du numéro de la question
  const questionNumberElement = document.getElementById('questionCounter');
  questionNumberElement.textContent = `${tableauAskedQuestions.length}/3`;
  
  //Update ProgressBar
  const progressBarFull = document.getElementById('progressBarFull');
  const progress = ((tableauAskedQuestions.length-1) / 3) * 100; // Calcule le pourcentage de questions posées
  progressBarFull.style.width = `${progress}%`; // Met à jour la largeur de la barre de progression
  

  const fireworkContainers = document.querySelectorAll('.firework-container');
  fireworkContainers.forEach(container => container.remove());
}
let score = 0;
const scoreTexte = document.getElementById('score');
const CORRECT_BONUS = 10;

// Fonction pour incrémenter le score
const incrementScore = num => {
  score += num;
  scoreText.innerText = score;
  localStorage.setItem('score', score); // Enregistre le score dans le localStorage
};

function checkAnswer(event) {
  const selectedChoice = event.target;
  const selectedAnswer = selectedChoice.textContent;
  // Vérification de la réponse
  const response = fetch('./api/questions.php')
    .then(response => response.json())
    .then(questions => {
      const answer = questions[randomQuestionIndex].answer;
      const isCorrect = (selectedAnswer === questions[randomQuestionIndex]['choice' + answer]);
      console.log(isCorrect ? "Correct" : "Incorrect");

      // Ajout de la classe CSS correspondante
      if (isCorrect) {
        selectedChoice.classList.add('correct');
        incrementScore(CORRECT_BONUS)
        selectedChoice.classList.add('valid-answer'); // Ajout de la classe pour jouer l'animation
        console.log(score);
         // Ajout des éléments HTML pour l'animation de feu d'artifice
        const fireworkContainer = document.createElement('div');
        fireworkContainer.classList.add('firework-container');
        for (let i = 0; i < 3; i++) {
          const firework = document.createElement('div');
          firework.classList.add('firework');
          fireworkContainer.appendChild(firework);
        }
        selectedChoice.parentElement.appendChild(fireworkContainer);
        
      
      } else {
        selectedChoice.classList.add('incorrect');
        selectedChoice.classList.add('wrong-answer');
      }
    });
};



for (let i = 0; i < choiceElements.length; i++) {
  choiceElements[i].addEventListener('click', function(event) {
    // Mise à jour du nombre de questions posées
    numQuestions++;

    // Vérification de la réponse
    checkAnswer(event);

    // Attente de 2 secondes avant de passer à la question suivante
    setTimeout(loadRandomQuestion, 2000);

    if (numQuestions === 3) {
      // Attente de 5 secondes avant de rediriger l'utilisateur vers la page end.html
      setTimeout(function() {
        window.location.href = './end.html';
      }, 2000);
    }
  });
}



// Chargement de la première question
loadRandomQuestion();



////////////////////////////////////////////////////////////////////////////
///////  ///  ///  ///  ///  ///  ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////








