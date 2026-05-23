// ====== Journal Writing ======
const journalText = document.getElementById("journal-text");
window.onload = () => {
  const savedEntry = localStorage.getItem("journalEntry");
  if (savedEntry) journalText.value = savedEntry;
};

function saveJournal() {
  localStorage.setItem("journalEntry", journalText.value);
  alert("Journal saved ✅ (currently stored in your browser)");
}

function clearJournal() {
  journalText.value = "";
  localStorage.removeItem("journalEntry");
  alert("Journal cleared 🗑");
}

// ====== Doodle Canvas ======
const canvas = document.getElementById("doodleCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;

const colorPicker = document.getElementById("color");
const sizePicker = document.getElementById("size");

// Drawing logic
canvas.addEventListener("mousedown", () => { drawing = true; });
canvas.addEventListener("mouseup", () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = sizePicker.value;
  ctx.lineCap = "round";


  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}


// Clear doodle
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Download doodle
function downloadCanvas() {
  const link = document.createElement("a");
  link.download = "inhalo-doodle.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

