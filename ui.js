export function displayVerse(verse) {
  const card = document.getElementById('verse-card');
  const text = document.getElementById('verse-text');
  const meta = document.getElementById('verse-meta');

  text.textContent = `"${verse.text}"`;
  meta.textContent = `– from "${verse.poemTitle}"`;
  card.classList.remove('hidden');
}

export function showReflections(reflections) {
  const container = document.getElementById('reflection-list');
  const list = document.getElementById('saved-reflections');

  list.innerHTML = '';
  reflections.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p>"${item.text}"</p>
      <small>– ${item.poemTitle} | Mood: ${item.mood} | ${item.date}</small>
    `;
    list.appendChild(li);
  });

  container.classList.remove('hidden');
}