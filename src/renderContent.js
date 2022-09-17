import { icon } from "./helper.js";

//////////////////Display  Notes//////////////////

export const displayNotes = function (
  notesObj,
  removeNote,
  editNote,
  archiveNote,
  hideOverlayAndModal
) {
  const notesContainer = document.querySelector(".notes-container");

  const activeNotes = notesObj.filter((note) => !note.archived && note);
  let html = "";

  activeNotes.forEach((element) => {
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
                <div class="btn-edit" id='${
                  element.id
                }'><i class="uil uil-pen"></i></div>
                <div class="btn-archive" id='${
                  element.id
                }'><i class="uil uil-archive-alt"></i></div>
                <div class="btn-remove" id='${
                  element.id
                }'><i class="uil uil-trash-alt"></i></div>
              </div>
            </div>
      `;
  });

  notesContainer.innerHTML = html;

  document.querySelectorAll(".btn-remove").forEach((btn) =>
    btn.addEventListener("click", function () {
      removeNote(this.id);
    })
  );

  document.querySelectorAll(".btn-archive").forEach((btn) =>
    btn.addEventListener("click", function () {
      archiveNote(this.id);
    })
  );

  document.querySelectorAll(".btn-edit").forEach((btn) =>
    btn.addEventListener("click", function () {
      editNote(this.id);
    })
  );

  hideOverlayAndModal();
};

//////////////////Display Archived Notes//////////////////

export const displayArchivedNotes = function (notesObj) {
  const archivedContainer = document.querySelector(".archived-container");
  const archivedNotes = notesObj.filter((note) => (note.archived ? note : ""));

  let html = "";

  archivedNotes.forEach((element) => {
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
              <div class="btn-archive" id='${
                element.id
              }'><i class="uil uil-archive-alt"></i></div>
              </div>
          </div>
    `;
  });

  archivedContainer.innerHTML = html;
};

//////////////////Display Categories//////////////////

export const displayCategories = function (categories, countActiveArchived) {
  categories = [
    countActiveArchived("Task"),
    countActiveArchived("Random Thought"),
    countActiveArchived("Idea"),
    countActiveArchived("Quote"),
  ];

  let html = "";

  categories.forEach((category) => {
    html += `
      <div class="container-content note-category-content">
              <div class="note-icon-title-container">
                <div class="icon-container">
                  <i class="uil ${icon(category.name)} note-icon"></i>
                </div>
                <h3>${category.name}</h3>
              </div>
              <div class="active-number">
                <h4>${category.active}</h4>
              </div>
              <div class="archived-number">
                <h4>${category.archived}</h4>
              </div>
            </div>`;
  });

  document.querySelector(".categories-container").innerHTML = html;
};
