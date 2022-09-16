const crateNoteBtn = document.querySelector(".btn-create-note");
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalWindow = document.querySelector(".btn--close-modal");
const notesContainer = document.querySelector(".notes-container");
const archivedContainer = document.querySelector(".archived-container");

//Form elements
const addTitle = document.querySelector(".add-title");
const addCategory = document.querySelector(".select-category");
const addContent = document.querySelector(".add-content");
const btnDoneCreate = document.querySelector(".btn-done-create");
const btnDoneEdit = document.querySelector(".btn-done-edit");

let idElem;
let notesObj = [
  {
    created: "March 25, 2022",
    title: "Note 1",
    category: "Random Thought",
    content: "go home",
    dates: "dates",
    archived: false,
  },
  {
    created: "June 2, 2022",
    title: "Buy Coffe",
    category: "Task",
    content: "Buy coffe",
    dates: "dates",
    archived: false,
  },
  {
    created: "July 15, 2022",
    title: "I have an idea!",
    category: "Idea",
    content: "Make a notelist",
    dates: "dates",
    archived: false,
  },
  {
    created: "August 20, 2022",
    title: "122233",
    category: "Quote",
    content: "lorem",
    dates: "dates",
    archived: false,
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const hideOverlayAndModal = function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
  cleanInputs();
};

const displayOverlayAndModal = function () {
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const cleanInputs = function () {
  addTitle.value = "";
  addCategory.value = "random";
  addContent.value = "";
};

const dateCreated = function () {
  const date = new Date();
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

const icon = function (value) {
  if (value === "Task") {
    return "uil-shopping-cart-alt";
  } else if (value === "Random Thought") {
    return "uil-cog";
  } else if (value === "Idea") {
    return "uil-lightbulb";
  } else if (value === "Quote") {
    return "uil-google-hangouts-alt";
  }
};

closeModalWindow.addEventListener("click", hideOverlayAndModal);

crateNoteBtn.addEventListener("click", displayOverlayAndModal);

btnDoneCreate.addEventListener("click", function (e) {
  e.preventDefault();
  if (addTitle.value === "" || addContent.value === "") {
    return alert("Please fill inpututs!");
  }

  const myObj = {
    created: dateCreated(),
    title: addTitle.value,
    category: addCategory.value,
    categoryText: addCategory.textContent,
    content: addContent.value,
    dates: "dates",
    archived: false,
  };
  notesObj.push(myObj);

  cleanInputs();
  displayNotes();
});
///Show notes

const displayNotes = function () {
  const activeNotes = notesObj.filter((note) => !note.archived && note);
  let html = "";

  activeNotes.forEach((element, index) => {
    html += `
    <div class="container-content note-content">
            <div class="note-icon-title-container">
              <div class="icon-container">
                <i class="uil ${icon(element.category)} note-icon"></i>
              </div>
              <h3>${element.title}</h3>
            </div>
            <div class="date-created">
              <h4>${element.created}</h4>
            </div>
            <div class="name-category">
              <h4>${element.category}</h4>
            </div>
            <div class="content">
              <h4>${element.content}</h4>
            </div>
            <div class="dates">
              <h4>${element.dates}</h4>
            </div>
            <div class="btns-container">
              <div class="btn-edit" id='${index}' onClick='editNote(this.id)'><i class="uil uil-pen"></i></div>
              <div class="btn-archive" id='${index}'onClick='archiveNote(this.id)'><i class="uil uil-archive-alt"></i></div>
              <div class="btn-remove" id='${index}' onClick='removeNote(this.id)'><i class="uil uil-trash-alt"></i></div>
            </div>
          </div>
    `;
  });

  notesContainer.innerHTML = html;
  hideOverlayAndModal();
};

displayNotes();

const removeNote = function (id) {
  notesObj.splice(id, 1);
  displayNotes();
};

const editNote = function (id) {
  displayOverlayAndModal();
  idElem = id;
  addTitle.value = notesObj[id].title;
  addCategory.value = notesObj[id].category;
  addContent.value = notesObj[id].content;
};

btnDoneEdit.addEventListener("click", function (e) {
  e.preventDefault();
  notesObj[idElem] = {
    created: dateCreated(),
    title: addTitle.value,
    category: addCategory.value,
    content: addContent.value,
    dates: "dates",
    archived: false,
  };
  cleanInputs();
  displayNotes();
});

const archiveNote = function (id) {
  notesObj[id].archived = !notesObj[id].archived;
  const archivedNotes = notesObj.filter((note) => (note.archived ? note : ""));
  let html = "";
  archivedNotes.forEach((element, index) => {
    html += `
    <div class="container-content note-content">
            <div class="note-icon-title-container">
              <div class="icon-container">
                <i class="uil ${icon(element.category)} note-icon"></i>
              </div>
              <h3>${element.title}</h3>
            </div>
            <div class="date-created">
              <h4>${element.created}</h4>
            </div>
            <div class="name-category">
              <h4>${element.category}</h4>
            </div>
            <div class="content">
              <h4>${element.content}</h4>
            </div>
            <div class="dates">
              <h4>${element.dates}</h4>
            </div>
            <div class="btns-container">
              <div class="btn-edit" id='${index}' onClick='editNote(this.id)'><i class="uil uil-pen"></i></div>
              <div class="btn-archive" id='${index}'onClick='archiveNote(this.id)'><i class="uil uil-archive-alt"></i></div>
              <div class="btn-remove" id='${index}' onClick='removeNote(this.id)'><i class="uil uil-trash-alt"></i></div>
            </div>
          </div>
    `;
  });

  archivedContainer.innerHTML = html;
  displayNotes();
};
