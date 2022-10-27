const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
  const hexColor = getRandomHex();
  document.body.style.backgroundColor = hexColor;
  color.textContent = hexColor;
});

function getRandomHex() {
  let randomHex = "#";
  while (randomHex.length < 7) {
    randomHex += hex[Math.floor(Math.random() * hex.length)];
  }
  return randomHex;
}
