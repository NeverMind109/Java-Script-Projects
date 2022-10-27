const addBtn = document.getElementById("add");
const notesContainer = document.querySelector(".notes-container");

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(noteText = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="note-tools">
        <button class="btn note-edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn note-delete">
          <i class="fas fa-trash-alt"></i>
        </button>
    </div>
    <div class="note-body ${noteText ? "" : "hidden"}"></div>
    <textarea class="note-textarea ${noteText ? "hidden" : ""}"></textarea>
    `;
  notesContainer.appendChild(note);

  const editBtn = note.querySelector(".note-edit");
  const deleteBtn = note.querySelector(".note-delete");
  const noteBody = note.querySelector(".note-body");
  const noteTextarea = note.querySelector(".note-textarea");

  noteTextarea.value = noteText;
  noteBody.innerHTML = marked.parse(noteText);

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLS();
  });

  editBtn.addEventListener("click", () => {
    noteBody.classList.toggle("hidden");
    noteTextarea.classList.toggle("hidden");
  });

  noteTextarea.addEventListener("input", (e) => {
    const { value } = e.target;
    noteBody.innerHTML = marked.parse(value);

    updateLS();
  });
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
