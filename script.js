function simulateDelay(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}

function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

async function loadNotes() {
    await simulateDelay(2000);
    return JSON.parse(localStorage.getItem("notes")) || [];
}

async function displayNotes() {
    const notesDisplay = document.getElementById("notes");
    notesDisplay.innerHTML = "Loading notes...";
    notesDisplay.style.fontSize = "25px";

    const notes = await loadNotes();

    notesDisplay.innerHTML = "";
    notes.forEach((note, index) => {
        const noteBody = document.createElement("div");
        noteBody.className = "noteData";

        const noteText = document.createElement("p");
        noteText.textContent = `${index + 1}. ${note}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => { deleteNote(index) });

        noteBody.appendChild(noteText);
        noteBody.appendChild(deleteButton);
        notesDisplay.appendChild(noteBody);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

document.getElementById("saveButton").addEventListener("click", () => {
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value.trim();
    if (note) {
        saveNote(note);
        noteInput.value = "";
        displayNotes();
    } else {
        alert("Enter Valid Notes!!!");
    }
});

displayNotes();