const qrReader = document.querySelector(".qr-reader");
const qrForm = document.querySelector(".qr-reader__form");
const qrFileInput = document.querySelector(".qr-reader__input");
const qrUploadText = document.querySelector(".qr-reader__descr");
const qrTextarea = document.querySelector(".qr-reader__textarea");
const closeBtn = document.getElementById("close-btn");
const copyBtn = document.getElementById("copy-btn");

function fetchRequest(formData, file) {
  qrUploadText.innerText = "Scanning QR Code...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      qrUploadText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldn't Scan QR Code";
      if (!result) return;

      if (qrForm.querySelector(".qr-reader__code")) {
        qrForm.querySelector(".qr-reader__code").remove();
      }

      const img = document.createElement("img");
      img.classList.add("qr-reader__code");
      img.src = URL.createObjectURL(file);
      qrForm.insertAdjacentElement("afterbegin", img);

      qrTextarea.innerText = result;
      qrReader.classList.add("active");
    })
    .catch(() => {
      qrUploadText.innerText = "Couldn't Scan QR Code";
    });
}

qrFileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
  let text = qrTextarea.textContent;
  navigator.clipboard.writeText(text);
});

closeBtn.addEventListener("click", () => {
  qrReader.classList.remove("active");
});

qrForm.addEventListener("click", () => qrFileInput.click());
