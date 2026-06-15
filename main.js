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