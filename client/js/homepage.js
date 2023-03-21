"use strict";
const input = document.querySelector("#inputField");
document.querySelector("#openTaskBtn").addEventListener("click", toogle);
const taskWindow = document.querySelector("#taskForm");
taskWindow.style.display = "none";

taskWindow.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userInput = input.value;
  const html = document.createElement("div");
  html.id = "taskMainDiv";
  html.innerHTML = `
  <form method="DELETE" class="todo-Form">
      <input type="checkbox" class="todo-checkbox" />
      <p class="todo-text" aria-placeholder="Lorem">${userInput}
      </p>
      <button class="todo-delete">Delete</button>
    </form>
  `;
  document.body.appendChild(html); // Detta borde göras efter att fetchen har gått igenom annars ERROR

  // kolla cookien och se om det är rätt användare?
  // await fetch("")
  const body = { userInput };

  // Ska skicka med det användaren skrivit in i sin todo (men till todoLIST! ska ändras till todo)
  const addedTodo = await fetch("http://127.0.0.1:5050/todoList", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

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
