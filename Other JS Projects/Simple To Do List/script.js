const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");

addTask.addEventListener("click", function () {
  if (inputTask.value === "") {
    alert("Please enter a task");
  } else {
    const task = document.createElement("div");
    task.classList.add("task");

    let taskName = document.createElement("span");
    taskName.innerText = `${inputTask.value}`;
    task.appendChild(taskName);

    let checkButton = document.createElement("button");
    checkButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    checkButton.classList.add("checkTask");
    task.appendChild(checkButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteTask");
    task.appendChild(deleteButton);

    taskContainer.appendChild(task);
    inputTask.value = "";
    checkButton.addEventListener("click", function () {
      checkButton.parentElement.style.textDecoration = "line-through";
    });

    deleteButton.addEventListener("click", function (e) {
      let target = e.target;
      target.parentElement.parentElement.remove();
    });
  }
});
