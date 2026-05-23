// Mood-color mapping for aura ball & background
const moodColors = {
  Happy: { bg: "radial-gradient(circle, #efc82aff, #dfd773ff)", shadow: "rgba(255, 217, 61, 0.7)", backdrop: "linear-gradient(135deg, #FFD93D, #FFEF9F)" },
  Angry: { bg: "radial-gradient(circle, #4facfe, #00f2fe)", shadow: "rgba(79, 172, 254, 0.7)", backdrop: "linear-gradient(135deg, #ff0844, #ffb199)" },
  Sad: { bg: "radial-gradient(circle, #667db6, #0082c8, #0082c8, #667db6)", shadow: "rgba(102, 125, 182, 0.7)", backdrop: "linear-gradient(135deg, #373B44, #4286f4)" },
  Excited: { bg: "radial-gradient(circle, #ff4e50, #f9d423)", shadow: "rgba(255, 78, 80, 0.7)", backdrop: "linear-gradient(135deg, #f7971e, #ffd200)" },
  Calm: { bg: "radial-gradient(circle, #d9268bff, #e49dceff)", shadow: "rgba(171, 47, 124, 0.7)", backdrop: "linear-gradient(135deg, #3a6186, #89253e)" },
  Tired: { bg: "radial-gradient(circle, #434343, #000000)", shadow: "rgba(67, 67, 67, 0.7)", backdrop: "linear-gradient(135deg, #232526, #414345)" },
  Lonely: { bg: "radial-gradient(circle, #8a2fabff, #ba8cc2ff)", shadow: "rgba(155, 47, 171, 0.7)", backdrop: "linear-gradient(135deg, #5C258D, #4389A2)" },
  Confident: { bg: "radial-gradient(circle, #56ab2f, #a8e063)", shadow: "rgba(86, 171, 47, 0.7)", backdrop: "linear-gradient(135deg, #11998e, #38ef7d)" },
  Anxious: { bg: "radial-gradient(circle, #373B44, #4286f4)", shadow: "rgba(55, 59, 68, 0.7)", backdrop: "linear-gradient(135deg, #373B44, #4286f4)" }
};

// Elements
const session = JSON.parse(localStorage.getItem("currentSession"));
const auraBall = document.getElementById("aura-ball");
const background = document.getElementById("background");
const sessionTitle = document.getElementById("session-title");
const sessionDetails = document.getElementById("session-details");
const sessionAudio = document.getElementById("session-audio");
const playBtn = document.getElementById("play-btn");

if (session) {
  sessionTitle.textContent = `${session.type} Session`;
  sessionDetails.textContent = `You were feeling ${session.mood}. This session is crafted to support you.`;

  // Apply aura + backdrop
  const colors = moodColors[session.mood] || moodColors.Calm;
  auraBall.style.background = colors.bg;
  auraBall.style.boxShadow = `0 0 60px 20px ${colors.shadow}`;
  background.style.background = colors.backdrop;

  // Assign sample audio
  const audioMap = {
    "Affirmations": "audios/affirmations.mp3",
    "Guided Meditations": "audios/meditation.mp3",
    "Self Help Blog": "audios/blog.mp3",
    "Breathing Exercise": "audios/breathing.mp3",
    "Journal Prompt": "audios/journal.mp3"
  };
  sessionAudio.src = audioMap[session.type] || "audios/default.mp3";
} else {
  sessionTitle.textContent = "No Session Found";
  sessionDetails.textContent = "Please take a session first.";
}

// Play/Pause Button Logic
playBtn.addEventListener("click", () => {
  if (sessionAudio.paused) {
    sessionAudio.play();
    playBtn.textContent = "⏸";
    playBtn.classList.add("playing");
  } else {
    sessionAudio.pause();
    playBtn.textContent = "▶";
    playBtn.classList.remove("playing");
  }
});

// Floating particles effect
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numParticles = 60;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

