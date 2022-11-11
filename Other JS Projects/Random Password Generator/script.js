const lengthSlider = document.getElementById("password-length-slider");
const lengthSliderValue = document.getElementById("password-length-value");
const generateBtn = document.getElementById("generate-btn");
const passwordOptions = document.querySelectorAll(".password__option-input");
const randomPasswordInput = document.getElementById("random-password");
const passwordIndicator = document.querySelector(".password__indicator");
const copyIcon = document.getElementById("copy-icon");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicated = false;
  passLength = lengthSlider.value;

  passwordOptions.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicated = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    const randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicated) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  randomPasswordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passwordIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  lengthSliderValue.innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(randomPasswordInput.value);
  copyIcon.innerText = "check";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
  }, 1500);
};

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
