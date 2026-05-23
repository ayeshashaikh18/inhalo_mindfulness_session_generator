document.getElementById("sessionForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const mood = document.querySelector('input[name="mood"]:checked');
  const type = document.querySelector('input[name="type"]:checked');

  if (!mood || !type) {
    alert("Please select both mood and support type.");
    return;
  }

  const sessionData = {
    mood: mood.value,
    type: type.value,
    date: new Date().toLocaleString()
  };

  // Save session
  let sessions = JSON.parse(localStorage.getItem("userSessions")) || [];
  sessions.push(sessionData);
  localStorage.setItem("userSessions", JSON.stringify(sessions));

  // Pass data to session result
  localStorage.setItem("currentSession", JSON.stringify(sessionData));

  // Redirect
  window.location.href = "session-result.html";
});
