document.addEventListener("DOMContentLoaded", () => {
  const progressList = document.getElementById("progress-list");

  function loadProgress() {
    progressList.innerHTML = "";
    const sessions = JSON.parse(localStorage.getItem("userSessions")) || [];

    if (sessions.length === 0) {
      progressList.innerHTML = "<li>No sessions yet. Start your journey today 🌿</li>";
    } else {
      sessions.reverse().forEach(session => {
        const li = document.createElement("li");
        li.textContent = `${session.date} – ${session.mood} – ${session.type}`;
        progressList.appendChild(li);
      });
    }
  }

  loadProgress();
});
