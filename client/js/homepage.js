"use strict";
const listNameInput = document.querySelector("#listNameInput");
const listContainer = document.querySelector(".homepage-lists");
// document.querySelector("#openAddListBtn").addEventListener("click", toogle);
const listForm = document.querySelector("#listForm");
const listFormBtn = document.querySelector("#addListBtn");
const listSelect = document.querySelector("#listSelect");
// listForm.style.display = "none";
window.onload = (event) => {
  console.log(event);
  getLists();
};

listFormBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // ska in i value
  console.log(e.target.value);

  const userInput = listNameInput.value;
  const addedTodoList = await fetch("http://127.0.0.1:5050/todoList", {
    method: "POST",
    body: JSON.stringify({ userInput }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // withCredentials: true,

  if (addedTodoList.status === 201) {
    // hämta alla todolistor och stoppa in här - i separat funktion
    const option = document.createElement("option");
    option.text = userInput;
    listSelect.add(option);
    const html = document.createElement("div");
    html.class = "generatedListMainDiv";
    html.innerHTML = `
      <div class="generatedListForm form">
        <p class="generatedListName">${userInput}</p>
        <button class="generatedListTodoBtn" value="todoListID ska in här">Add Todo</button>
        <button class="generatedListDeleteBtn" value="todoListID ska in här">Delete</button>
        <div class="generatedListTodoDiv"></div>
      </div>
    `;
    listContainer.appendChild(html);
    // -----------------------
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

// function toogle() {
//   if (listForm.style.display === "none") {
//     listForm.style.display = "block";
//   } else {
//     listForm.style.display = "none";
//   }
// }

async function getLists() {
  // Behöver köra en get på alla listor när man lägger till en lista också
  try {
    const lists = await fetch("http://127.0.0.1:5050/todoList", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    const data = await lists.json();
    console.log(typeof data);
    data.forEach((list) => {
      console.log("Item in list:", list);
    });

    // listContainer <- här ska allt in
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

function logout() {
  console.log("ska sätta cookien authtoken till ett datum som redan varit");
}
