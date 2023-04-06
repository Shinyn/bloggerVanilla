const listContainer = document.querySelector(".homepage-lists");
const addListBtn = document.querySelector("#addListBtn");
const listSelect = document.querySelector("#listSelect");
const usersContainer = document.querySelector("#users-container");
const addedFriendsContainer = document.querySelector("#friends-container");
const friendsListsContainer = document.querySelector("#friendLists");
getLists();
getUsers();
getAddedFriends();

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
      return console.log("You currently have no lists");
    }
    if (response.status === 200) {
      const lists = await response.json();
      listSelect.replaceChildren();
      listContainer.replaceChildren();
      lists.forEach((list) => {
        populateSelect(list);
        populateContainer(list);
      });
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

  const deleteTodoListBtn = document.createElement("button");
  deleteTodoListBtn.textContent = "Delete";
  deleteTodoListBtn.classList.add("generatedListDeleteBtn");
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("generatedListTodoDiv");

  html.append(p, input, addTodoBtn, deleteTodoListBtn, todoDiv);

  addTodoBtn.addEventListener("click", () => addTodo(list.id, input.value, todoDiv));

  deleteTodoListBtn.addEventListener("click", () => deleteTodoList(list.id));
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
  const data = await respons.json();
  if (respons.status === 201) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    const p = document.createElement("p");
    p.textContent = content;
    p.classList.add("todo-text");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo-delete");
    deleteBtn.textContent = "Delete";

    const separatorDiv = document.createElement("div");
    separatorDiv.classList.add("separatorDiv");
    separatorDiv.append(checkbox, p, deleteBtn);
    todoContainer.append(separatorDiv);

    deleteBtn.addEventListener("click", function () {
      deleteTodo(data.id);
      getTodos(id);
    });

    checkbox.addEventListener("change", function () {
      if (this.checked) {
        patchTodo(data.id, 1);
      } else {
        patchTodo(data.id, 0);
      }
    });
  } else {
    alert(data);
    return;
  }
}

async function deleteTodoList(id) {
  const respons = await fetch(`http://127.0.0.1:5050/todoList/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  if (respons.status === 200) {
    getLists();
    //FIXME:
    // Förmodligen ett dåligt sätt att göra det på men det funkar - METIN
    // location.reload();
  }
}

async function deleteTodo(id) {
  const respons = await fetch(`http://127.0.0.1:5050/todo/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
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

async function patchTodo(id, completed) {
  const response = await fetch(`http://127.0.0.1:5050/todo`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      todoID: id,
      isChecked: completed,
    }),
  });
  if (!response.status === 200) {
    console.log("Something went wrong");
  }
}

async function populateTodos(id) {
  // Listan
  const todos = await getTodos(id);
  // Hämtar div'en som alla todos ska vara i
  let todoContainer = document.getElementById(id).lastChild;
  // Tömmer todos så det inte blir dubletter
  todoContainer.replaceChildren();
  // För varje element i listan
  todos.forEach((todo) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("todo-checkbox");
    if (todo.marked === 1) {
      input.checked = true;
    }
    // Lägger på en eventListener på checkbox och kör PATCH vid ändring
    input.addEventListener("change", function () {
      if (this.checked) {
        patchTodo(todo.id, 1);
      } else {
        patchTodo(todo.id, 0);
      }
    });

    const p = document.createElement("p");
    p.textContent = todo.content;
    p.classList.add("todo-text");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("todo-delete");

    // Re-adds eventListener to delete button when fetched from database
    deleteBtn.addEventListener("click", function () {
      deleteTodo(todo.id);
      getTodos(todo.listID);
    });

    const separatorDiv = document.createElement("div");
    separatorDiv.classList.add("separatorDiv");
    separatorDiv.append(input, p, deleteBtn);

    todoContainer.append(separatorDiv);
  });
}

async function getUsers() {
  const response = await fetch("http://127.0.0.1:5050/friends", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  if (response.status === 200) {
    const data = await response.json();
    data.forEach((user) => {
      const p = document.createElement("p");
      p.textContent = user.username;
      p.classList.add("generated-users");
      p.addEventListener("click", function () {
        addFriend(user.id);
      });
      usersContainer.append(p);
    });
  }
}

async function addFriend(id) {
  const response = await fetch(`http://127.0.0.1:5050/friends/${id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  if (response.status === 200) {
    location.reload();
  } else {
    alert(data);
    return;
  }
}

async function getAddedFriends() {
  const response = await fetch("http://127.0.0.1:5050/friends/added", {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  if (response.status === 200) {
    data.forEach((friend) => {
      const friendContainer = document.createElement("div");
      friendContainer.classList.add("generated-friends");
      friendContainer.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        deleteFriend(friend.friendID);
      });
      friendContainer.addEventListener("click", function () {
        getFriendList(friend.friendID);
      });
      friendContainer.append(friend.friend);
      addedFriendsContainer.append(friendContainer);
    });
  } else {
    alert(data);
    return;
  }
}

async function getFriendList(id) {
  const response = await fetch(`http://127.0.0.1:5050/friends/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  friendsListsContainer.replaceChildren();
  if (response.status === 200) {
    data.forEach((list) => {
      const friendListDiv = document.createElement("div");
      const p = document.createElement("p");
      p.textContent = list.listName;
      friendListDiv.classList.add("generatedFriendListDiv");
      friendListDiv.append(p);
      friendsListsContainer.append(friendListDiv);
    });
  } else {
    alert(data);
  }
}

async function deleteFriend(id) {
  const response = await fetch(`http://127.0.0.1:5050/friends/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  if (response.status === 200) {
    location.reload();
  } else {
    alert(data);
    return;
  }
}
