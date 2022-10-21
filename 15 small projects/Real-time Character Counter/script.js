const textareaEl = document.getElementById("textarea");
const totalCounterEl = document.getElementById("total-counter");
const remainingCounterEl = document.getElementById("remaining-counter");

textareaEl.addEventListener("keyup", () => {
  updateCounter();
});

updateCounter();

function updateCounter() {
  const currentLength = textareaEl.value.length;
  const maxLength = textareaEl.getAttribute("maxLength");

  totalCounterEl.innerText = currentLength;
  remainingCounterEl.innerText = maxLength - currentLength;
}
