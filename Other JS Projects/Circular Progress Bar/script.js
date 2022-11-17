const circularProgressEl = document.querySelector(".progress-bar__wrapper");
const progressValueEl = document.querySelector(".progress-bar__value");

let progressStartValue = 0;
let progressEndValue = 90;
let speed = 100;

let progress = setInterval(() => {
  progressStartValue++;

  progressValueEl.textContent = `${progressStartValue}%`;
  circularProgressEl.style.background = `conic-gradient(#7d2ae8 ${
    progressStartValue * 3.6
  }deg, #ededed 0deg)`;

  if (progressStartValue == progressEndValue) {
    clearInterval(progress);
  }
}, speed);
