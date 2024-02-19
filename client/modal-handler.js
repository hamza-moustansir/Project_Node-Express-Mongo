function openAddModal() {
  const modal = document.getElementById("addNoteModal");
  const closeSpan = document.getElementById("closeAdd");
  const cancelButton = document.getElementById("cancelAddNoteBtn");

  clearModal();
  modal.style.display = "block";
  closeSpan.onclick = () => {
    modal.style.display = "none";
  };
  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}

function clearModal() {
  const titrestr = (document.getElementById("addTitle").value = "");
  const contentstr = (document.getElementById("addContent").value = "");
  document.getElementById("addError").innerHTML = error = "";
}

function saveNewNote() {
  const titrestr = document.getElementById("addTitle").value;
  const contentstr = document.getElementById("addContent").value;
  const noteData = { title: titrestr, content: contentstr };
  addNote(noteData)
    .then((reponse) => {
      if (reponse.ok) {
        const modal = document.getElementById("addNoteModal");
        modal.style.display = "none";
        reponse.json().then((data) => {
          var newNoteId = data["_id"];
          updateNotesTable("newNoteId");
        });
      } else {
        reponse.text().then((error) => {
          document.getElementById("addError").innerHTML = error;
        });
      }
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("addError").innerHTML = error;
    });
}

function openEditModal(noteId) {
  const modal = document.getElementById("editNoteModal");
  const closeSpan = document.getElementById("closeEdit");
  const cancelButton = document.getElementById("cancelEditNoteBtn");

  clearModal();
  modal.style.display = "block";
  closeSpan.onclick = () => {
    modal.style.display = "none";
  };
  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
  loadEditData(noteId);
}

function loadEditData(noteId) {
  var modal = document.getElementById("editNoteModal");
  var noteIdAtrribute = document.createAttribute("noteid");
  noteIdAtrribute.value = noteId;
  modal.setAttributeNode(noteIdAtrribute);
  getNoteById(noteId).then((data) => {
    document.getElementById("editTitle").value = data["title"];
    document.getElementById("editContent").value = data["content"];
  });
}

function saveEditNote() {
  var modal = document.getElementById("editNoteModal");
  const noteId = modal.getAttribute("noteid");
  const titrestr = document.getElementById("editTitle").value;
  const contentstr = document.getElementById("editContent").value;
  const noteData = { _id: noteId, title: titrestr, content: contentstr };
  updateNote(noteData)
    .then((reponse) => {
      if (reponse.ok) {
        const modal = document.getElementById("editNoteModal");
        modal.style.display = "none";
        updateNotesTable(noteId);
      } else {
        reponse.text().then((error) => {
          document.getElementById("addError").innerHTML = error;
        });
      }
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("addError").innerHTML = error;
    });
}
