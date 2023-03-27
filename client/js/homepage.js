"use strict";
const listNameInput = document.querySelector("#listNameInput");
const listContainer = document.querySelector(".homepage-lists");
document.querySelector("#openAddListBtn").addEventListener("click", toogle);
const listForm = document.querySelector("#listForm");
listForm.style.display = "none";

listForm.addEventListener("submit", async (e) => {
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

  if (addedTodoList.status === 200) {
    const html = document.createElement("div");
    html.class = "generatedListMainDiv";
    // Vi har båda formsen i en gemensam div så när man lägger till en todo i todolist så hamnar den under
    html.innerHTML = `
    <div class="generatedContainerDiv">
    <form method="DELETE" class="generatedListForm">
      <p class="generatedListName">${userInput}</p>
      <button class="generatedListDeleteBtn">Delete</button>
    </form>
    </div>
  `;
    listContainer.appendChild(html);
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
