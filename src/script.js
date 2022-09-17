import { extractDates, dateCreated } from "./helper.js";
import { monthNames, notesObj, randomId } from "./config.js";
import {
  displayNotes,
  displayArchivedNotes,
  displayCategories,
} from "./renderContent.js";

/////////////////////////////////////////////////USED ELEMENTS/////////////////////////////////////////////////

// App elements
const crateNoteBtn = document.querySelector(".btn-create-note");
const modalWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalWindow = document.querySelector(".btn--close-modal");
const archivedHeader = document.querySelector(".archived-header");
const archivedContainer = document.querySelector(".archived-container");

//Modal elements
const addTitle = document.querySelector(".add-title");
const addCategory = document.querySelector(".select-category");
const addContent = document.querySelector(".add-content");
const btnDoneCreate = document.querySelector(".btn-done-create");
const btnDoneEdit = document.querySelector(".btn-done-edit");

let idElem;

/////////////////////////////////////////////////FUNCTIONS/////////////////////////////////////////////////

const countActiveAndArchived = function (category) {
  return {
    name: category,
    active: notesObj.filter(
      (item) => item.category === category && item.archived === false
    ).length,
    archived: notesObj.filter(
      (item) => item.category === category && item.archived === true
    ).length,
  };
};

let categories = [
  countActiveAndArchived("Task"),
  countActiveAndArchived("Random Thought"),
  countActiveAndArchived("Idea"),
  countActiveAndArchived("Quote"),
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
  addContent.value = "";
};

const updatePage = function () {
  displayArchivedNotes(notesObj);
  displayNotes(
    notesObj,
    removeNote,
    editNote,
    archiveNote,
    hideOverlayAndModal
  );
  displayCategories(categories, countActiveAndArchived);
};

const removeNote = function (id) {
  const currentElement = notesObj.findIndex((note) => `${note.id}` === id);
  notesObj.splice(currentElement, 1);

  updatePage();
};

const editNote = function (id) {
  displayOverlayAndModal();

  btnDoneEdit.classList.remove("hidden");
  btnDoneCreate.classList.add("hidden");

  const currentElement = notesObj.findIndex((note) => `${note.id}` === id);
  idElem = currentElement;

  addTitle.value = notesObj[currentElement].title;
  addCategory.value = notesObj[currentElement].category;
  addContent.value = notesObj[currentElement].content;
};

const archiveNote = function (id) {
  const currentElement = notesObj.findIndex((note) => `${note.id}` === id);
  notesObj[currentElement].archived = !notesObj[currentElement].archived;

  updatePage();
};

/////////////////////////////////////////////////EVENT LISTENERS/////////////////////////////////////////////////

closeModalWindow.addEventListener("click", hideOverlayAndModal);

crateNoteBtn.addEventListener("click", function () {
  displayOverlayAndModal();

  btnDoneCreate.classList.remove("hidden");
  btnDoneEdit.classList.add("hidden");
});

btnDoneCreate.addEventListener("click", function (e) {
  e.preventDefault();

  if (addTitle.value === "" || addContent.value === "") {
    return alert("Please fill inpututs!");
  }

  const myObj = {
    id: randomId(),
    created: dateCreated(monthNames),
    title: addTitle.value,
    category: addCategory.value,
    categoryText: addCategory.textContent,
    content: addContent.value,
    dates: extractDates(addContent.value),
    archived: false,
  };
  notesObj.push(myObj);

  cleanInputs();
  updatePage();
});

btnDoneEdit.addEventListener("click", function (e) {
  e.preventDefault();

  notesObj[idElem] = {
    created: dateCreated(monthNames),
    title: addTitle.value,
    category: addCategory.value,
    content: addContent.value,
    dates: extractDates(addContent.value),
    archived: false,
  };

  cleanInputs();
  updatePage();
});

archivedHeader.addEventListener("click", function () {
  archivedContainer.classList.toggle("hidden");
});

//////////////////////////////////////////////////////////////////////APP//////////////////////////////////////////////////////////////////////
try {
  displayArchivedNotes(notesObj);
  displayNotes(
    notesObj,
    removeNote,
    editNote,
    archiveNote,
    hideOverlayAndModal
  );
  displayCategories(categories, countActiveAndArchived);
} catch (error) {
  console.error(error);
}
