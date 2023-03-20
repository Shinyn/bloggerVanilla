"use strict";
const input = document.querySelector("#inputField");
document.querySelector("#openTaskBtn").addEventListener("click", toogle);
const taskWindow = document.querySelector("#taskForm");
taskWindow.style.display = "none";

taskWindow.addEventListener("submit", (e) => {
  e.preventDefault();
  const html = document.createElement("div");
  html.id = "taskMainDiv";
  // ersätt med data vi får från databasen?
  html.innerHTML = `
  <form method="DELETE" class="todo-Form">
      <input type="checkbox" class="todo-checkbox" />
      <p class="todo-text" aria-placeholder="Lorem">${input.value}
      </p>
      <button class="todo-delete">Delete</button>
    </form>
  `;
  document.body.appendChild(html);
  document.querySelector(".taskBtn").addEventListener("click", async (e) => {
    e.preventDefault();

    // FIXME:
    // här ska vi deleta todo -> Skapa todoRouten
    const respons = await fetch("http://127.0.0.1:5050/", {
      method: "DELETE",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  });
  // ska göra DELETE till servern - kolla så det är rätt användare osv.
  // ska deleta elementet också
});

function toogle() {
  if (taskWindow.style.display === "none") {
    taskWindow.style.display = "block";
  } else {
    taskWindow.style.display = "none";
  }
}
