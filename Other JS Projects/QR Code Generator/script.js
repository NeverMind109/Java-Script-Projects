const generator = document.querySelector(".generator");
const generatorBtn = document.querySelector(".generator__btn");
const generatorInput = document.querySelector(".generator__input");
const generatorQRCode = document.querySelector(".generator__qr-code");

generatorBtn.addEventListener("click", () => {
  generatorQRCode.textContent = "";
  let qrValue = generatorInput.value;
  if (!qrValue) return;
  generatorBtn.innerText = "Generating QR Code...";

  const img = document.createElement("img");
  img.src = ` https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
  generatorQRCode.appendChild(img);

  img.addEventListener("load", () => {
    generator.classList.add("active");
    generatorBtn.innerText = "Generate QR Code";
  });
});

generatorInput.addEventListener("keyup", () => {
  if (!generatorInput.value) {
    generator.classList.remove("active");
  }
});
