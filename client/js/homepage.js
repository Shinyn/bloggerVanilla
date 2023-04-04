// const listNameInput = document.querySelector("#listNameInput");
const listContainer = document.querySelector(".homepage-lists");
// const listForm = document.querySelector("#listForm");
const addListBtn = document.querySelector("#addListBtn");
const listSelect = document.querySelector("#listSelect");
getLists();

listSelect.addEventListener("change", (e) => {
  hideAllLists();
  showSelectedList();
});

addListBtn.addEventListener("click", async (e) => {
  const userInput = listNameInput.value;
  const addedTodoList = await fetch("http://127.0.0.1:5050/todoList", {
    method: "POST",
    body: JSON.stringify({ userInput }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (addedTodoList.status === 201) {
    getLists();
    const addTodoBtns = document.querySelectorAll(".generatedListTodoBtn");

    addTodoBtns.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const todo = document.createElement("div");
        todo.classList.add("generatedTodo");
        todo.innerHTML = `
            <input type="checkbox" class="todo-checkbox" />
            <p class="todo-text"> text here </p>
            <button class="todo-delete">Delete</button>
        `;
        const list = document.querySelector(".generatedListForm");
        list.appendChild(todo);
      });
    });
  } else if (addedTodoList.status === 411) {
    alert(addedTodoList.statusText);
  } else {
    alert("Something went wrong");
  }
});

async function getLists() {
  try {
    const response = await fetch("http://127.0.0.1:5050/todoList", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 500) {
      return alert("Server error");
    }
    if (response.status === 404) {
      return alert("Not found");
    }
    if (response.status === 200) {
      const lists = await response.json();
      listSelect.replaceChildren();
      listContainer.replaceChildren();
      lists.forEach((list) => {
        populateSelect(list);
        populateContainer(list);
      });
      // getTodos(list.id);
      return;
    }
    alert("Something went wrong");
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

function populateContainer(list) {
  const html = document.createElement("div");
  html.classList.add("generatedListMainDiv", "generatedListForm", "form");
  html.id = `${list.id}`;
  const p = document.createElement("p");
  p.classList.add("generatedListName");
  p.textContent = list.listName;
  const input = document.createElement("input");
  const addTodoBtn = document.createElement("button");
  addTodoBtn.textContent = "Add Todo";
  addTodoBtn.classList.add("generatedListTodoBtn");
  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.textContent = "Delete";
  deleteTodoBtn.classList.add("generatedListDeleteBtn");
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("generatedListTodoDiv");

  html.append(p, input, addTodoBtn, deleteTodoBtn, todoDiv);

  addTodoBtn.addEventListener("click", () => addTodo(list.id, input.value, todoDiv));

  deleteTodoBtn.addEventListener("click", () => deleteTodo(list.id));
  html.style.display = "none";
  listContainer.appendChild(html);
}

async function addTodo(id, content, todoContainer) {
  const respons = await fetch("http://127.0.0.1:5050/todo", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      listID: id,
      content: content,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (respons.status === 201) {
    const a = await respons.json();
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    const p = document.createElement("p");
    p.textContent = content;
    p.classList.add("todo-text");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo-delete");
    deleteBtn.textContent = "Delete";
    todoContainer.append(checkbox, p, deleteBtn);

    // getLists();
  }
}

async function deleteTodo(id) {
  const respons = await fetch(`http://127.0.0.1:5050/todoList/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (respons.status === 200) {
    getLists();
  }
}

function populateSelect(list) {
  if (listSelect.childElementCount < 1) {
    const empty = document.createElement("option");
    empty.text = "-Choose list-";
    empty.value = "-Choose list-";
    listSelect.add(empty);
  }

  const option = document.createElement("option");
  option.text = list.listName;
  option.value = list.id;
  listSelect.add(option);
}

async function getTodos(id) {
  try {
    const response = await fetch(`http://127.0.0.1:5050/todo/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

function hideAllLists() {
  const lists = document.querySelectorAll(".generatedListMainDiv");
  lists.forEach((item) => (item.style.display = "none"));
}

function showSelectedList() {
  const value = listSelect.value;
  const el = document.getElementById(`${value}`);
  el.style.display = "block";
  populateTodos(value);
}

// Checkboxen ska ha värdet som den har i databasen (Avbockad eller Ej)
// Make sure the names make sense! LastChild
async function populateTodos(id) {
  // Listan
  const todos = await getTodos(id);
  // För varje element i listan
  let lastChild = document.getElementById(id).lastChild;
  // Tömmer todos så det inte blir dubletter
  lastChild.replaceChildren();
  todos.forEach((todo) => {
    console.log(todo);
    const input = document.createElement("input");
    input.type = "checkbox";
    if (todo.marked === 1) {
      input.checked = true;
    }

    const p = document.createElement("p");
    p.textContent = todo.content;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    const separatorDiv = document.createElement("div");
    separatorDiv.append(input, p, deleteBtn);

    // Ska va tom, TÖM!

    console.log(lastChild);
    lastChild.append(separatorDiv);
  });
  // console.log("mina todos");
}

// //FIXME: Jag vill att när man klickar på en option i select drop-down'en så ska den genererade html snutten associerad med den visas.

// // function logout() {
// //   console.log("ska sätta cookien authtoken till ett datum som redan varit");
// // }

// const content = listSelect.options[listSelect.selectedIndex].text;
// Behövs för att göra GET till todos

// getTodos(value);
