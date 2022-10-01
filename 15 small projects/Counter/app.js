const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

//  set initial count
let count = 0;

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const operation = btn.classList;
    if (operation.contains("increase")) {
      count++;
    } else if (operation.contains("decrease")) {
      count--;
    } else if (operation.contains("reset")) {
      count = 0;
    }
    if (count > 0) {
      value.style.color = "green";
    }
    if (count < 0) {
      value.style.color = "red";
    }
    if (count === 0) {
      value.style.color = "#222";
    }
    value.textContent = count;
  });
});
