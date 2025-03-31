export async function fetchRandomVerse() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();

    return {
      text: data.slip.advice,
      poemTitle: "– Advice Slip"
    };
  } catch (err) {
    console.error("Advice Slip API Error:", err);
    throw err;
  }
}
