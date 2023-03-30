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

  if (addedTodoList.status === 201) {
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

    document.querySelector(".generatedListTodoBtn").addEventListener("click", async (e) => {
      e.preventDefault();

      console.log("generatedListTodoBtn clicked");
      const todo = document.createElement("div");
      todo.class = "generatedTodo";
      todo.innerHTML = `
          <div class="todo">
            <input type="checkbox" class="todo-checkbox" />
            <p class="todo-text"> text here </p>
            <button class="todo-delete">Delete</button>
          </div>
        `;
      const list = document.querySelector(".generatedListForm");
      list.appendChild(todo);
    });
  } else if (addedTodoList.status === 411) {
    alert(addedTodoList.statusText);
  } else {
    alert("Something went wrong");
  }
});

function toogle() {
  if (listForm.style.display === "none") {
    listForm.style.display = "block";
  } else {
    listForm.style.display = "none";
  }
}
