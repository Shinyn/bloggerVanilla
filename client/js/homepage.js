"use strict";
const listNameInput = document.querySelector("#listNameInput");
const listContainer = document.querySelector(".homepage-lists");
// document.querySelector("#openAddListBtn").addEventListener("click", toogle);
const listForm = document.querySelector("#listForm");
const listFormBtn = document.querySelector("#addListBtn");
const listSelect = document.querySelector("#listSelect");
const listArr = [];
// listForm.style.display = "none";
window.onload = (event) => {
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

  console.log(addedTodoList.status);
  if (addedTodoList.status === 201) {
    getLists();
    console.log("after getLists");
    // -----------TODO: Man kommer aldrig hit ner------------
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
  try {
    const lists = await fetch("http://127.0.0.1:5050/todoList", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    const response = await lists;
    if (response.status === 302) {
      const data = await lists.json();
      //TODO:------------------------------------------------<<<<<<<<<<<<<<<<<<<<<<<<
      // Förhindrar att det blir dubletter av listorna och options
      listSelect.replaceChildren();
      listContainer.replaceChildren();
      // ---
      const empty = document.createElement("option");
      empty.text = "-Choose list-";
      empty.value = "-Choose list-";
      listSelect.add(empty);
      // ---
      data.forEach((list) => {
        const html = document.createElement("div");
        html.class = "generatedListMainDiv";
        html.id = `${list.id}`;
        html.innerHTML = `
        <div class="generatedListForm form">
        <p class="generatedListName">${list.listName}</p>
        <input></input>
        <button class="generatedListTodoBtn" value="${list.id}">Add Todo</button>
        <button class="generatedListDeleteBtn" value="${list.id}">Delete</button>
        <div class="generatedListTodoDiv"></div>
        </div>
        `;
        html.style.display = "none";
        listContainer.appendChild(html);
        //FIXME:------------------------------------------------<<<<<<<<<<<<<<<<<<<<<<<
        listArr.push(list.id); // förmodligen onödig
        const option = document.createElement("option");
        option.text = list.listName;
        option.value = list.id;
        listSelect.add(option);
        // Här kör en ny fetch mot todo
        //TODO:
        //TODO:
      });
      // getTodos(list.id);
    } else {
      alert("Unexpected error");
      return;
    }
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

// function logout() {
//   console.log("ska sätta cookien authtoken till ett datum som redan varit");
// }

async function getTodos(id) {
  console.log("list id for todo:", id);
  try {
    const todos = await fetch(`http://127.0.0.1:5050/todo?id=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    console.log("todos:", todos);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

listSelect.addEventListener("change", (e) => {
  const content = listSelect.options[listSelect.selectedIndex].text;
  const value = listSelect.value;
  console.log(value, content);

  const el = document.getElementById(`${value}`);
  console.log(el);
  if (el.style.display === "none") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }

  // getTodos(value);
});

//FIXME: Jag vill att när man klickar på en option i select drop-down'en så ska den genererade html snutten associerad med den visas.
