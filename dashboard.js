// Quotes Array
const quotes = [
  "Breathe. You’re stronger than you think.",
  "Small steps every day lead to big changes.",
  "Your mind is your sanctuary. Keep it calm.",
  "Be gentle with yourself, you’re doing your best.",
  "Peace begins with a deep breath."
];

// Show random quotes
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

document.getElementById("daily-quote").textContent = getRandomQuote();
document.getElementById("quote-card").textContent = getRandomQuote();

// Mood Tracker
const moods = document.querySelectorAll(".mood");
const moodStatus = document.getElementById("mood-status");

// Load saved mood
const savedMood = localStorage.getItem("userMood");
if (savedMood) {
  moodStatus.textContent = `Last time you felt: ${savedMood}`;
}

moods.forEach(mood => {
  mood.addEventListener("click", () => {
    const selected = mood.textContent;
    localStorage.setItem("userMood", selected);
    moodStatus.textContent = `You are feeling: ${selected}`;
  });
});
