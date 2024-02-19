function updateNotesTable(noteId, noteTitle) {
  var table = document.getElementById("notes-table");
  var rowCount = table.rows.length;
  while (--rowCount) {
    table.deleteRow(rowCount);
  }
  getNotes(noteTitle)
    .then((data) => {
      data.forEach((note) => {
        var row = table.insertRow(1);
        var idAtrribute = document.createAttribute("id");
        idAtrribute.value = note["_id"];
        row.setAttributeNode(idAtrribute);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = note["title"];
        cell2.innerHTML = note["content"];
        cell3.innerHTML = note["createdDate"];
        cell4.innerHTML = note["updatedDate"];
        cell5.innerHTML = `<a onclick="openEditModal('${note["_id"]}')" href="#"><img  src="images/edit.png" style="width: 22px;"</a>
                           <a onclick="confirmDeleteNote('${note["_id"]}')" href="#"><img  src="images/delete.png" style="width: 22px;"</a>`;
      });
    })
    .then(() => {
      if (noteId) {
        var row = document.getElementById(noteId);
        row.setAttribute("style", "animation: new-row 5s;");
      }
    });
}
function searchNotes() {
  const search = document.getElementById("searchInput").value;
  updateNotesTable(undefined, search);
}

function confirmDeleteNote(noteId) {
  var action = confirm("Are you sure you want to delete this note?");
  if (action == true) {
    deleteNote(noteId).then(() => {
      updateNotesTable();
    });
  }
}
