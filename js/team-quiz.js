(async function () {
  const root = document.getElementById('teamQuizRoot');

  let wines = [];
  let winesById = {};
  let rounds = [];
  let roundIndex = 0;
  let score = 0;
  let missed = [];
  let answered = false;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Simple striped jersey shape in the club's real kit colors — no crest
  // or logo artwork, just the colors, so it stays clear of trademark use.
  function jerseySvg(colors) {
    const [c1, c2] = colors;
    return `
      <svg viewBox="0 0 160 160" width="120" height="120" role="img" aria-label="Team jersey">
        <defs>
          <clipPath id="jerseyClip">
            <path d="M 55 20 L 40 40 L 20 55 L 35 80 L 45 70 L 45 140 L 115 140 L 115 70 L 125 80 L 140 55 L 120 40 L 105 20 C 100 30 90 35 80 35 C 70 35 60 30 55 20 Z"/>
          </clipPath>
        </defs>
        <g clip-path="url(#jerseyClip)">
          <rect x="0" y="0" width="160" height="160" fill="${c1}"/>
          <rect x="20" y="0" width="16" height="160" fill="${c2}"/>
          <rect x="52" y="0" width="16" height="160" fill="${c2}"/>
          <rect x="84" y="0" width="16" height="160" fill="${c2}"/>
          <rect x="116" y="0" width="16" height="160" fill="${c2}"/>
        </g>
        <path d="M 55 20 L 40 40 L 20 55 L 35 80 L 45 70 L 45 140 L 115 140 L 115 70 L 125 80 L 140 55 L 120 40 L 105 20 C 100 30 90 35 80 35 C 70 35 60 30 55 20 Z"
              fill="none" stroke="#201712" stroke-width="2.5" stroke-linejoin="round"/>
      </svg>
    `;
  }

  function categoryLabel(cat) {
    const labels = { white: 'White', red: 'Red', rose: 'Rosé', sparkling: 'Sparkling', dessert: 'Dessert' };
    return labels[cat] || cat;
  }

  function buildRounds() {
    const pairings = shuffle(window.TEAM_QUIZ_PAIRINGS);
    return pairings.map(pairing => {
      const correctWine = winesById[pairing.wineId];
      if (!correctWine) return null;

      // Dessert wines are excluded from this quiz entirely — as wrong
      // answers too, not just correct ones, so a Champagne round doesn't
      // suddenly offer a Sauternes as an option.
      const others = wines.filter(w => w.id !== pairing.wineId && w.category !== 'dessert');
      const distractors = shuffle(others).slice(0, 2);
      const options = shuffle([correctWine, ...distractors]);

      return { pairing, correctWine, options };
    }).filter(Boolean);
  }

  function scrollToQuizTop() {
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderIntro() {
    root.innerHTML = `
      <div class="team-quiz-intro">
        <p>${rounds.length} clubs, ${rounds.length} regions. Match each one to the wine on our list from the same place.</p>
        <button id="teamQuizStartBtn" class="start-quiz-btn">Start →</button>
      </div>
    `;
    document.getElementById('teamQuizStartBtn').addEventListener('click', () => {
      roundIndex = 0;
      score = 0;
      missed = [];
      renderRound();
      scrollToQuizTop();
    });
  }

  function renderRound() {
    answered = false;
    const round = rounds[roundIndex];
    const { pairing, correctWine, options } = round;

    root.innerHTML = `
      <div class="team-quiz-progress">Round ${roundIndex + 1} of ${rounds.length} · Score: ${score}</div>
      <div class="team-quiz-card">
        <div class="team-jersey">${jerseySvg(pairing.colors)}</div>
        <div class="team-name">${pairing.team}</div>
        <div class="team-meta">${pairing.city} · ${pairing.league}</div>
        <div class="team-quiz-options" id="teamQuizOptions">
          ${options.map(w => `
            <button class="team-quiz-option" data-id="${w.id}">
              <span class="tag tag-${w.category}">${categoryLabel(w.category)}</span>
              <span class="team-quiz-option-name">${w.name}</span>
              <span class="team-quiz-option-producer">${w.producer}</span>
            </button>
          `).join('')}
        </div>
        <div class="team-quiz-feedback" id="teamQuizFeedback" hidden></div>
      </div>
    `;

    document.querySelectorAll('.team-quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosenId = btn.dataset.id;
        const correct = chosenId === correctWine.id;

        document.querySelectorAll('.team-quiz-option').forEach(b => {
          b.disabled = true;
          if (b.dataset.id === correctWine.id) b.classList.add('option-correct');
          else if (b.dataset.id === chosenId) b.classList.add('option-incorrect');
        });

        if (correct) {
          score += 1;
        } else {
          missed.push({ pairing, correctWine });
        }

        const feedback = document.getElementById('teamQuizFeedback');
        feedback.hidden = false;
        feedback.innerHTML = `
          <div class="feedback-line ${correct ? 'feedback-correct' : 'feedback-incorrect'}">
            ${correct ? 'Got it!' : `Not quite — it's ${correctWine.name}.`}
          </div>
          <div class="feedback-fact">${pairing.funFact}</div>
          <button id="teamQuizNextBtn" class="start-quiz-btn">
            ${roundIndex + 1 < rounds.length ? 'Next →' : 'See Results →'}
          </button>
        `;
        // Bring the result + Next button into view immediately — don't
        // make the person scroll down to see if they got it right.
        feedback.scrollIntoView({ behavior: 'smooth', block: 'end' });
        document.getElementById('teamQuizNextBtn').addEventListener('click', () => {
          roundIndex += 1;
          if (roundIndex < rounds.length) {
            renderRound();
          } else {
            renderResults();
          }
          scrollToQuizTop();
        });
      });
    });
  }

  function renderResults() {
    root.innerHTML = `
      <div class="team-quiz-results">
        <div class="quiz-score">${score} / ${rounds.length}</div>
        <div class="quiz-score-label">${score === rounds.length ? "Perfect — you know this list cold." : "Nice work."}</div>
        ${missed.length > 0 ? `
          <div class="team-quiz-review-label">Worth another look</div>
          <div class="team-quiz-review">
            ${missed.map(m => `
              <div class="team-quiz-review-row">
                <strong>${m.pairing.team}</strong> (${m.pairing.city}) → ${m.correctWine.name}
              </div>
            `).join('')}
          </div>
        ` : ''}
        <button id="teamQuizAgainBtn" class="start-quiz-btn">Play Again →</button>
      </div>
    `;
    document.getElementById('teamQuizAgainBtn').addEventListener('click', () => {
      rounds = buildRounds();
      renderIntro();
      scrollToQuizTop();
    });
  }

  try {
    const data = await window.DataSource.load();
    wines = data.wines || [];
    wines.forEach(w => { winesById[w.id] = w; });
    rounds = buildRounds();
    renderIntro();
  } catch (err) {
    root.innerHTML = '<p style="color:var(--paper-dim)">Could not load the wine list.</p>';
    console.error(err);
  }
})();
