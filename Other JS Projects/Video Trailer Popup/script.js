const openTrailerBtn = document.getElementById("open-trailer");
const closeTrailerBtn = document.getElementById("close-trailer");
const trailerContainer = document.querySelector(".trailer-container");
const videoEl = document.querySelector(".trailer-video");

openTrailerBtn.addEventListener("click", () => {
  trailerContainer.classList.add("active");
});
closeTrailerBtn.addEventListener("click", () => {
  trailerContainer.classList.remove("active");
  videoEl.pause();
  videoEl.currentTime = 0;
});
