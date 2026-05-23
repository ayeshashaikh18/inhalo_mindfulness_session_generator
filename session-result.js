// Mood-color mapping for aura ball
const moodColors = {
  Angry: { bg: "radial-gradient(circle, #4facfe, #00f2fe)", shadow: "rgba(79, 172, 254, 0.7)" },
  Sad: { bg: "radial-gradient(circle, #667db6, #0082c8)", shadow: "rgba(102, 125, 182, 0.7)" },
  Happy: { bg: "radial-gradient(circle, #ff4e50, #f9d423)", shadow: "rgba(255, 78, 80, 0.7)" },
  Calm: { bg: "radial-gradient(circle, #d9268bff, #e49dceff)", shadow: "rgba(171, 47, 124, 0.7)" },
  Lonely: { bg: "radial-gradient(circle, #8a2fabff, #ba8cc2ff)", shadow: "rgba(155, 47, 171, 0.7)" },
  Confident: { bg: "radial-gradient(circle, #56ab2f, #a8e063)", shadow: "rgba(86, 171, 47, 0.7)" },
  Anxious: { bg: "radial-gradient(circle, #373B44, #4286f4)", shadow: "rgba(55, 59, 68, 0.7)" }
};

// Load session data
const session = JSON.parse(localStorage.getItem("currentSession"));

const auraBall = document.getElementById("aura-ball");
const sessionTitle = document.getElementById("session-title");
const sessionDetails = document.getElementById("session-details");
const sessionAudio = document.getElementById("session-audio");
const playPauseBtn = document.getElementById("playPauseBtn");

if (session) {
  sessionTitle.textContent = `${session.type} Session`;
  sessionDetails.textContent = `You were feeling ${session.mood}. This session is crafted to support you.`;

  // Apply aura ball theme
  const colors = moodColors[session.mood] || moodColors.Calm;
  auraBall.style.background = colors.bg;
  auraBall.style.boxShadow = `0 0 80px 25px ${colors.shadow}`;

  // Assign sample audio
  const audioMap = {
    "Affirmations": "audios/affirmations.mp3",
    "Guided Meditations": "audios/meditation.mp3",
    "Journal Prompt": "audios/journal.mp3"
  };

  sessionAudio.src = audioMap[session.type] || "audios/default.mp3";

  // Play/Pause toggle
  let isPlaying = false;
  playPauseBtn.addEventListener("click", () => {
    if (!isPlaying) {
      sessionAudio.play();
      playPauseBtn.textContent = "⏸";
    } else {
      sessionAudio.pause();
      playPauseBtn.textContent = "▶";
    }
    isPlaying = !isPlaying;
  });
} else {
  sessionTitle.textContent = "No Session Found";
  sessionDetails.textContent = "Please take a session first.";
}
