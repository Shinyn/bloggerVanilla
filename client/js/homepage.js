"use strict";
const listNameInput = document.querySelector("#listNameInput");
const listContainer = document.querySelector(".homepage-lists");
document.querySelector("#openAddListBtn").addEventListener("click", toogle);
const listForm = document.querySelector("#listForm");
const listFormBtn = document.querySelector("#addListBtn");
listForm.style.display = "none";

listFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const userInput = listNameInput.value;
  const addedTodoList = await fetch("http://127.0.0.1:5050/todoList", {
    method: "POST",
    body: JSON.stringify({ userInput }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  console.log(addedTodoList);

  if (addedTodoList.status === 200) {
    const html = document.createElement("div");
    html.class = "generatedListMainDiv";
    html.innerHTML = `
    <div class="generatedListForm form">
      <p class="generatedListName">${userInput}</p>
      <button class="generatedListTodoBtn">Add Todo</button>
      <button class="generatedListDeleteBtn">Delete</button>
      <div class="generatedListTodoDiv"></div>
    </div>
  `;
    listContainer.appendChild(html);
  } else {
    alert(addedTodoList.status);
  }

  document
    .querySelector(".generatedListTodoBtn")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      const todo = document.createElement("div");
      todo.class = "generatedTodo";
      todo.innerHTML = `
      <div class="generatedListForm form">
        <p class="generatedListName">${userInput}</p>
        <button class="generatedListTodoBtn">Add Todo</button>
        <button class="generatedListDeleteBtn">Delete</button>
        <div class="generatedListTodoDiv"></div>
      </div>
    `;
    });
});

// Kan göras om så den funkar på ALLA knappar
function toogle() {
  if (listForm.style.display === "none") {
    listForm.style.display = "block";
  } else {
    listForm.style.display = "none";
  }
}
