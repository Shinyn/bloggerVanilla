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
    <div class="taskDiv">
    <p class="taskText">${input.value}</p>
    <button class="taskBtn">Delete</button>
    </div>`;
  document.body.appendChild(html);
  document.querySelector(".taskBtn").addEventListener("click", destroyElement);
  // ska göra POST till servern - kolla så det är rätt användare osv.
});

function destroyElement() {
  console.log("Yes");
  // här ska vi köra en DELETE
  // lägg i separat script?
}

function toogle() {
  if (taskWindow.style.display === "none") {
    taskWindow.style.display = "block";
  } else {
    taskWindow.style.display = "none";
  }
}
