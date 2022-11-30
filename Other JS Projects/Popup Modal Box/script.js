const popup = document.querySelector(".popup");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const overlay = document.querySelector(".popup__overlay");

openModalBtn.addEventListener("click", () => {
  popup.classList.add("active");
});
closeModalBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});
overlay.addEventListener("click", () => {
  popup.classList.remove("active");
});
