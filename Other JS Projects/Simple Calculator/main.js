const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");
const equalBtn = document.querySelector(".btn-equal");
const clearBtn = document.querySelector(".btn-clear");

btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let number = btn.getAttribute("data-num");
    screen.value += number;
  });
});

equalBtn.addEventListener("click", function () {
  if (screen.value === "") {
    screen.value = "";
  } else {
    let result = eval(screen.value);
    screen.value = result;
  }
});

clearBtn.addEventListener("click", function () {
  screen.value = "";
});
