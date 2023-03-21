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

  const isChecked = false;
  //FIXME: ska skicka med om boxen är iklickad eller ej
  //FIXME: Ska skicka med det användaren skrivit in i sin todo (men till todoLIST! ska ändras till todo)
  const addedTodoList = await fetch("http://127.0.0.1:5050/todoList", {
    method: "POST",
    body: JSON.stringify({ userInput, isChecked }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // console.log(addedTodoList);
  if (addedTodoList.status === 200) {
    document.body.appendChild(html);
    const checkbox = document.querySelector(".todo-checkbox");

    // Lyssnar efter 'change' på checkBoxen på todo'n
    checkbox.addEventListener("change", async () => {
      const checkboxFalse = await fetch("http://127.0.0.1:5050/todoList", {
        method: "PATCH",
        body: JSON.stringify({ isChecked }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    });

    console.log("Is it checked?:");
    console.log(checkbox.checked);
    // FIXME: här använd checked status
  } else {
    alert(addedTodoList.status);
  }

  // document.querySelector(".taskBtn").addEventListener("click", async (e) => {
  //   e.preventDefault();

  //   // FIXME:
  //   // här ska vi deleta todo -> Skapa todoRouten
  //   const respons = await fetch("http://127.0.0.1:5050/", {
  //     method: "DELETE",
  //     body: JSON.stringify({ username, password }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  // });
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
