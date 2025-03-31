//  app.js - Code & Crumbs

console.log(" app.js is running");

// snack stack - meal generator 
const snackBtn = document.getElementById('get-snack');
const snackResult = document.getElementById('snack-result');

if (snackBtn) {
  snackBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      const meal = data.meals[0];
      snackResult.innerHTML = `
        <h3 class="fade-in">🍽️ Snack Stack:</h3>
        <p><strong>${meal.strMeal}</strong> - ${meal.strArea} Cuisine</p>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="fade-in" style="max-width: 100%; border-radius: 10px; margin-top: 1rem;" />
        <p><a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a></p>
      `;
    } catch (err) {
      snackResult.innerHTML = `<p class="fade-in"> Couldn't fetch a meal suggestion right now. Try a snack from your fridge!</p>`;
    }
  });
}

// coding playlist
const playlistSection = document.createElement('section');
playlistSection.classList.add('card');
playlistSection.innerHTML = `
  <h3> Coding Playlist</h3>
  <p>Enjoy some hip hop, R&B, and pop vibes while you code:</p>
  <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWYmmr74INQlb?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
`;
document.body.appendChild(playlistSection);

// daily js challenge prompts
const challengeSection = document.createElement('section');
challengeSection.classList.add('card');
const jsPrompts = [
  "Write a function to reverse a string.",
  "Create a function that checks for palindrome.",
  "Build a simple to-do list using an array.",
  "Create a clock that updates every second.",
  "Use fetch() to get data from a public API.",
  "Make a dropdown menu that toggles visibility.",
  "Code a basic calculator (add, subtract, etc).",
  "Create a random color generator.",
  "Write a function to flatten an array.",
  "Make a digital dice roller (1–6)."
];
const todayIndex = new Date().getDate() % jsPrompts.length;
const todaysPrompt = jsPrompts[todayIndex];
const promptKey = `challenge-${todayIndex}`;
const isCompleted = localStorage.getItem(promptKey) === "done";

challengeSection.innerHTML = `
  <h3>💡 Daily JavaScript Challenge</h3>
  <p id="daily-prompt" style="font-size: 1rem; font-family: 'VT323', monospace;">${todaysPrompt}</p>
  <button id="mark-done" style="margin-top: 1rem; background-color: ${isCompleted ? '#88f6b8' : '#ffd166'};">
    ${isCompleted ? '✅ Completed' : '✔️ Mark as Completed'}
  </button>
`;
document.body.appendChild(challengeSection);

document.getElementById("mark-done").addEventListener("click", () => {
  localStorage.setItem(promptKey, "done");
  const btn = document.getElementById("mark-done");
  btn.textContent = "✅ Completed";
  btn.style.backgroundColor = "#88f6b8";
});

// journal 
const journalContainer = document.createElement('section');
journalContainer.classList.add('card');
journalContainer.innerHTML = `
  <h3>📝 Dev Journal Corner</h3>
  <p style="font-size: 0.95rem;">Write down your thoughts, frustrations, breakthroughs, or reflections about your coding journey.</p>
  <textarea id="journal-entry" rows="5" placeholder="Today I learned..." 
    style="width: calc(100% - 2rem); padding: 1rem; font-family: 'VT323', monospace; margin: 1rem auto; border-radius: 10px; background-color: #2e2f31; color: #fff; border: 1px solid #ccc; display: block;"></textarea>
  <br>
  <button id="save-journal" style="margin-top: 1rem;">📌 Save Entry</button>
  <button id="download-journal" style="margin-top: 1rem; background: #88f6b8; color: #1f1f1f;">⬇️ Download Entries</button>
  <div id="journal-history" style="margin-top: 2rem;"></div>
`;
document.body.appendChild(journalContainer);

document.getElementById('save-journal').addEventListener('click', () => {
  const entry = document.getElementById('journal-entry').value.trim();
  if (!entry) return;

  const savedJournals = JSON.parse(localStorage.getItem('devJournal') || '[]');
  savedJournals.unshift({ entry, date: new Date().toLocaleString() });
  localStorage.setItem('devJournal', JSON.stringify(savedJournals));
  document.getElementById('journal-entry').value = '';
  displayJournalEntries();
});

document.getElementById('download-journal').addEventListener('click', () => {
  const savedJournals = JSON.parse(localStorage.getItem('devJournal') || '[]');
  let content = "Dev Journal Entries\n\n";
  savedJournals.forEach(j => {
    content += `${j.date}\n${j.entry}\n\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dev-journal.txt';
  a.click();
  URL.revokeObjectURL(url);
});

function displayJournalEntries() {
  const history = document.getElementById('journal-history');
  const savedJournals = JSON.parse(localStorage.getItem('devJournal') || '[]');

  if (savedJournals.length === 0) {
    history.innerHTML = "<p style='color: #aaa;'>No journal entries yet. Start writing! ✍️</p>";
    return;
  }

  history.innerHTML = savedJournals.map((j, index) => `
    <div style="background: rgba(255,255,255,0.05); padding: 1rem; margin-bottom: 1rem; border-radius: 10px;">
      <p style="font-size: 0.9rem;">${j.entry}</p>
      <small style="color: #aaa;">🕒 ${j.date}</small><br>
      <button onclick="deleteEntry(${index})" style="margin-top: 0.5rem; background: #ff7675; color: white;">🗑️ Delete</button>
    </div>
  `).join('');
}

window.deleteEntry = function(index) {
  let savedJournals = JSON.parse(localStorage.getItem('devJournal') || '[]');
  savedJournals.splice(index, 1);
  localStorage.setItem('devJournal', JSON.stringify(savedJournals));
  displayJournalEntries();
};

displayJournalEntries();
