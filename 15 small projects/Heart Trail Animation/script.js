document.body.addEventListener("mousemove", (e) => {
  const xPos = e.offsetX;
  const yPos = e.offsetY;

  const heartEl = document.createElement("span");
  heartEl.classList.add("heart");

  heartEl.style.top = yPos + "px";
  heartEl.style.left = xPos + "px";
  const size = Math.floor(Math.random() * 100);
  heartEl.style.width = size + "px";
  heartEl.style.height = size + "px";

  document.body.insertAdjacentElement("afterbegin", heartEl);
  setTimeout(() => {
    heartEl.remove();
  }, 3000);
});
