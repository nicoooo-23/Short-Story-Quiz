// get elements
const choices = document.querySelectorAll('.choice');
const questions = document.querySelectorAll('.question');
const resultSection = document.getElementById('results');
const resultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');

// initialize scores
let scores = {
  Zora: 0,
  Jam: 0,
  Reii: 0,
  Emi: 0
};

// results data
const results = {
  Zora: {
    name: "Z",
    description: "You’re most like Z — unserious, funny, and a little bit unusual (in a good way). You turn everything into a joke, even when things get weird, and your imagination runs the whole show. You’d 100% survive a horror story by confusing the villain with your commentary.",
    image: "images/z.png"
  },
  Jam: {
    name: "J",
    description: "You’re most like J — curious to a dangerous degree. You poke things you shouldn’t, open doors just to see what’s behind them, and somehow make chaos look fun. You’d probably be the first to die in a horror story, but everyone would love you for it.",
    image: "images/j.png"
  },
  Reii: {
    name: "R",
    description: "You’re most like R — calmly dying under pressure but weirdly good at figuring things out. While everyone else is panicking or breaking stuff, you’re over there solving puzzles like it’s a side quest. You’d definitely be the one who makes it to the end just by quietly observing and petting the baby dragon.",
    image: "images/r.png"
  },
  Emi: {
    name: "E",
    description: "You’re most like Emi — gentle, kind, and a quiet source of comfort. Even in strange places, you bring warmth and calmness to everyone around you. You’d be the one to find a way home — and make sure everyone gets there safely.",
    image: "images/e.png"
  }
};

// start quiz
const startBtn = document.getElementById('start-btn');
const instructions = document.getElementById('instructions');
const quizContainer = document.getElementById('quiz-container');

startBtn.addEventListener('click', () => {
  // hide instructions
  instructions.style.display = 'none';

  // show quiz
  quizContainer.style.display = 'block';

  // start at the first question
  document.getElementById('question1').classList.add('active');
});

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const friend = choice.dataset.friend;
    const nextQuestionId = choice.dataset.next;

    // add 1 point to that friend
    scores[friend]++;

    // hide current question
    choice.closest('.question').classList.remove('active');

    // go to next or results
    if (nextQuestionId === "results") {
      showResults();
    } else {
      document.getElementById(nextQuestionId).classList.add('active');
    }
  });
});

function showResults() {
  resultSection.classList.add('active');

  // find top-scoring friend
  const topFriend = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  // pull data from results object
  const friendResult = results[topFriend];

  // display info
  document.getElementById('resultName').textContent = friendResult.name;
  document.getElementById('resultDescription').textContent = friendResult.description;
  document.getElementById('resultImage').src = friendResult.image;
}

// restart button
restartBtn.addEventListener('click', () => {
  // reset scores
  for (let key in scores) scores[key] = 0;

  // hide results
  resultSection.classList.remove('active');

  // show first question again
  document.getElementById('question1').classList.add('active');
});
