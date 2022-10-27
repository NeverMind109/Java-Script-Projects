const textareaEl = document.querySelector(".converter__textarea");
const fileNameEl = document.getElementById("file-name");
const selectEl = document.querySelector(".converter__select");
const saveBtn = document.querySelector(".converter__btn");

selectEl.addEventListener("change", () => {
  const selectedOption = selectEl.options[selectEl.selectedIndex].text;
  saveBtn.innerText = `Save as ${selectedOption.split(" ")[0]} File`;
});

saveBtn.addEventListener("click", () => {
  const textValue = textareaEl.value;
  const fileName = fileNameEl.value;
  const selectedFormat = selectEl.value;

  const blob = new Blob([textValue], { type: selectedFormat });
  const fileURL = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = fileURL;
  link.click();
});
