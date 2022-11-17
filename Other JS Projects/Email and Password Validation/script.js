const modal = document.querySelector(".modal");
const form = document.querySelector(".modal__form");
const formBtn = document.querySelector(".modal__btn");

const emailField = document.getElementById("modal-email");
const emailInput = emailField.querySelector(".email-input");

const createPassField = document.getElementById("create-password");
const createPassInput = createPassField.querySelector(".create-password-input");

const confPassField = document.getElementById("confirm-password");
const confPassInput = confPassField.querySelector(".confirm-password-input");

// Email validation
function checkEmail() {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!emailInput.value.match(emailPattern)) {
    return emailField.classList.add("invalid");
  }
  emailField.classList.remove("invalid");
}

// Hide/show password
const eyeIcons = form.querySelectorAll(".modal__show-hide");
eyeIcons.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const eyeParent = eyeIcon.parentElement.querySelector(".modal__input");
    if (eyeParent.type === "password") {
      eyeIcon.classList.replace("bx-hide", "bx-show");
      return (eyeParent.type = "text");
    }
    eyeIcon.classList.replace("bx-show", "bx-hide");
    return (eyeParent.type = "password");
  });
});

// Password validation
function createPass() {
  const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!createPassInput.value.match(passPattern)) {
    return createPassField.classList.add("invalid");
  }
  createPassField.classList.remove("invalid");
}

// Password confirmation
function confirmPass() {
  if (createPassInput.value !== confPassInput.value || confPassInput === "") {
    return confPassField.classList.add("invalid");
  }
  confPassField.classList.remove("invalid");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkEmail();
  createPass();
  confirmPass();

  emailInput.addEventListener("keyup", checkEmail);
  createPassInput.addEventListener("keyup", createPass);
  confPassInput.addEventListener("keyup", confirmPass);

  if (
    !emailField.classList.contains("invalid") &&
    !createPassField.classList.contains("invalid") &&
    !confPassField.classList.contains("invalid")
  ) {
    modal.innerHTML = "<h1>Success!</h1>";
    modal.style.textAlign = "center";
    modal.style.color = "lightgreen";
  }
});
