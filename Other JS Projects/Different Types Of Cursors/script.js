const cursors = document.querySelectorAll(".cursor-box");
const alertEl = document.querySelector(".alert");

cursors.forEach((cursor) => {
  cursor.innerText = cursor.getAttribute("data-cursor");
  cursor.style.cursor = cursor.getAttribute("data-cursor");

  cursor.addEventListener("click", () => {
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = `cursor: ${cursor.getAttribute("data-cursor")}`;
    document.body.appendChild(inputEl);
    inputEl.select();
    document.execCommand("copy");
    document.body.removeChild(inputEl);
    alertEl.style.opacity = "1";
    alertEl.style.visibility = "visible";
    setTimeout(() => {
      alertEl.style.opacity = "0";
      alertEl.style.visibility = "hidden";
    }, 2000);
  });
});
