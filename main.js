let randInt = Math.floor(Math.random() * 10);
let header = document.createElement("h1");

if (randInt == 0) {
    header.innerHTML = "you won the game??";
    document.body.appendChild(header);
} else {
    header.innerHTML = "you lost the game";
    document.body.appendChild(header);
}

document.addEventListener("DOMContentLoaded", () => {
  const flyers = document.querySelectorAll('.flyer');
  const totalFlyers = flyers.length;

  flyers.forEach((flyer, index) => {

    const topPosition = 5 + (index * (80 / totalFlyers));
    flyer.style.top = `${topPosition}%`;

    const duration = 15 + Math.random() * 10;
    flyer.style.animationDuration = `${duration}s`;

    const negativeDelay = Math.random() * duration;
    flyer.style.animationDelay = `-${negativeDelay}s`;

    flyer.style.animationName = 'flyRight';
    flyer.style.animationTimingFunction = 'linear';
    flyer.style.animationIterationCount = 'infinite';
  });
});

const API_BASE = "https://api-game.geodearc.com";
const COOLDOWN_MS = 1800000;
const STORAGE_KEY = "site_counter_last_click";

const btn = document.getElementById("counter-btn");
const valueEl = document.getElementById("counter-value");
const cooldownEl = document.getElementById("cooldown-text");

function getRemainingMs() {
  const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
  return Math.max(0, (last + COOLDOWN_MS) - Date.now());
}

function formatTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

async function loadCount() {
  const res = await fetch(`${API_BASE}/count`);
  const data = await res.json();
  valueEl.textContent = data.count;
}

function updateCooldownUI() {
  const remaining = getRemainingMs();
  if (remaining > 0) {
    btn.disabled = true;
    btn.style.display = "none";
    cooldownEl.textContent = `Cooldown: ${formatTime(remaining)} remaining`;
  } else {
    btn.disabled = false;
    btn.style.display = "block";
    cooldownEl.textContent = "";
  }
}

btn.addEventListener("click", async () => {
  const remaining = getRemainingMs();
  if (remaining > 0) {
    updateCooldownUI();
    return;
  }

  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/click`, { method: "POST" });
    if (!res.ok) throw new Error("Request failed");

    const data = await res.json();
    valueEl.textContent = data.count;
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    updateCooldownUI();
    } catch (err) {
    console.error(err);
  }
});

loadCount();
updateCooldownUI();
setInterval(updateCooldownUI, 1000);