const choices = document.querySelectorAll('.choice');
const questions = document.querySelectorAll('.question');
const resultSection = document.getElementById('results');
const resultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');

let scores = {
  Zora: 0,
  Jam: 0,
  Reii: 0,
  Emi: 0
};

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

  // customize result
  resultText.textContent = `You’re most like ${topFriend.charAt(0).toUpperCase() + topFriend.slice(1)}!`;
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
