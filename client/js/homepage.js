"use strict";
const input = document.querySelector("#inputField");
document.querySelector("#openTaskBtn").addEventListener("click", toogle);
const taskWindow = document.querySelector("#taskForm");
taskWindow.style.display = "none";

taskWindow.addEventListener("submit", (e) => {
  e.preventDefault();
  const html = document.createElement("div");
  html.id = "taskMainDiv";
  // ersätt med data vi får från databasen
  html.innerHTML = `
  <form method="DELETE" class="todo-Form">
      <input type="checkbox" class="todo-checkbox" />
      <p class="todo-text" aria-placeholder="Lorem">${input.value}
      </p>
      <button class="todo-delete">Delete</button>
    </form>
  `;
  document.body.appendChild(html);
  document.querySelector(".taskBtn").addEventListener("click", destroyElement);
  // ska göra DELETE till servern - kolla så det är rätt användare osv.
});

function destroyElement() {
  console.log("hej");
}

function toogle() {
  if (taskWindow.style.display === "none") {
    taskWindow.style.display = "block";
  } else {
    taskWindow.style.display = "none";
  }
}
