const birthday = new Date("2025-02-15T00:00:00"); // CHANGE DATE
const countdown = document.getElementById("countdown");
const surprise = document.getElementById("surprise");

function updateCountdown() {
  const now = new Date();
  const diff = birthday - now;

  if (diff <= 0) {
    countdown.innerText = "🎉 It's your Birthday 🎉";
    surprise.style.display = "block";
    startConfetti();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.innerText = `${days} days to go 💖`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

function playMusic() {
  document.getElementById("bgMusic").play();
}

/* 🎈 Confetti */
function startConfetti() {
  const canvas = document.getElementById("confetti");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
