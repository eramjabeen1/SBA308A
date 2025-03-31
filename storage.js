export function saveReflection(verse, mood) {
  const saved = JSON.parse(localStorage.getItem('reflections')) || [];
  saved.push({
    mood,
    text: verse.text,
    poemTitle: verse.poemTitle,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('reflections', JSON.stringify(saved));
}

export function getReflections() {
  return JSON.parse(localStorage.getItem('reflections')) || [];
}
