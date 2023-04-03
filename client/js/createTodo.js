// let userInput = listNameInput.value;"use strict";
const listNameInput = document.querySelector("#listNameInput");
document.querySelector("#openAddListBtn").addEventListener("click", toogle);
const listForm = document.querySelector("#listForm");
listForm.style.display = "none";

//FIXME:
//FIXME: THIS IS NOT IMPLEMENTED - THIS IS OLD CODE THAT I REFERENCE TOO WHEN WORKING ON AN UPDATED VERSION
//FIXME:

listForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userInput = listNameInput.value;
  const html = document.createElement("div");
  html.id = "taskMainDiv";
  html.innerHTML = `
  <form method="DELETE" class="todo-Form">
      <input type="checkbox" class="todo-checkbox" />
      <p class="todo-text">${userInput}
      </p>
      <button class="todo-delete">Delete</button>
    </form>
  `;

  const isChecked = false;
  const addedTodoList = await fetch("http://127.0.0.1:5050/todo", {
    method: "POST",
    body: JSON.stringify({ userInput, isChecked }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (addedTodoList.status === 200) {
    document.body.appendChild(html);
    const checkbox = document.querySelector(".todo-checkbox");

    // Lyssnar efter 'change' på checkBoxen på todo'n
    checkbox.addEventListener("change", async () => {
      const checkboxFalse = await fetch("http://127.0.0.1:5050/todo", {
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

// Kan göras om så den funkar på ALLA knappar
function toogle() {
  if (listForm.style.display === "none") {
    listForm.style.display = "block";
  } else {
    listForm.style.display = "none";
  }
}
