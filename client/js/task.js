"use strict";
const input = document.querySelector("#inputField");
document.querySelector("#openTaskBtn").addEventListener("click", toogle);
const taskWindow = document.querySelector("#task-form");
taskWindow.style.display = "none";

taskWindow.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("adbgu in");

  const html = document.createElement("div");

  // ersätt med data vi får från databasen
  html.innerHTML = `
    <div class="taskDiv">
    <p class="task-text">Test text</p>
    <button class="task-btn">Delete</button>
    </div>`;
  document.body.appendChild(html);
});

function toogle() {
  if (taskWindow.style.display === "none") {
    taskWindow.style.display = "block";
  } else {
    taskWindow.style.display = "none";
  }
}
