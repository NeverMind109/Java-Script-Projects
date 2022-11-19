let allCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
];

const captchaText = document.querySelector(".captcha__text");
const reloadBtn = document.querySelector(".captcha__reload");
const captchaInputField = document.querySelector(".captcha__input");
const checkBtn = document.querySelector(".captcha__check");
const statusMessage = document.querySelector(".captcha__message");

function createCaptcha() {
  captchaText.innerText = "";
  for (let i = 0; i < 6; i++) {
    let randomChar =
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
    captchaText.innerText += ` ${randomChar}`;
  }
}
createCaptcha();

reloadBtn.addEventListener("click", createCaptcha);

checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  statusMessage.style.display = "block";
  const enteredCaptcha = captchaInputField.value.split("").join(" ");

  if (enteredCaptcha == captchaText.innerText) {
    statusMessage.style.color = "#4db2ec";
    statusMessage.innerText = "Nice! You don't appear to be a robot";
    setTimeout(() => {
      statusMessage.style.display = "none";
      captchaInputField.value = "";
      createCaptcha();
    }, 4000);
  } else {
    statusMessage.style.color = "#ff0000";
    statusMessage.innerText = "Captcha not matched. Please try again!";
  }
});
