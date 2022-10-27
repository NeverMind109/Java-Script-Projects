const startStopBtn = document.querySelector("#startStopBtn");
const resetBtn = document.querySelector("#resetBtn");
const timer = document.getElementById("timer");

// time values
let seconds = 0;
let minutes = 0;
let hours = 0;

// variables for set interval & time status
let timerInterval = null;
let timerStatus = "stopped";

// stop watch function
function stopWatch() {
  seconds++;
  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;

    if (minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }
  }

  timer.innerText = `${addZero(hours)}:${addZero(minutes)}:${addZero(
    seconds
  )} `;
}

function addZero(time) {
  if (time < 10) {
    resultTime = "0" + time.toString();
  } else {
    resultTime = time;
  }
  return resultTime;
}

startStopBtn.addEventListener("click", function () {
  if (timerStatus === "stopped") {
    timerInterval = window.setInterval(stopWatch, 1000);
    startStopBtn.innerHTML = `<i class="fa-solid fa-pause" id="pause"></i>`;
    timerStatus = "started";
  } else {
    window.clearInterval(timerInterval);
    startStopBtn.innerHTML = `<i class="fa-solid fa-play" id="play"></i>`;
    timerStatus = "stopped";
  }
});

resetBtn.addEventListener("click", function () {
  if (timerStatus === "started") {
    startStopBtn.innerHTML = `<i class="fa-solid fa-play" id="play"></i>`;
    timerStatus = "stopped";
  }
  window.clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  timer.innerHTML = "00:00:00";
});
