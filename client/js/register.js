"use strict";

const usernameInput = document.querySelector("#registerFormUsername");
const passwordInput = document.querySelector("#registerFormPassword");
const form = document.querySelector(".registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  const respons = await fetch("http://127.0.0.1:5050/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const message = await respons.text();
  const ress = await respons;

  if (username.length >= 3 && username.length <= 20 && password.length >= 3 && password.length <= 20) {
    if (ress.status === 400) {
      alert(message);
      return;
    }
    if (ress.status === 500) {
      alert(message);
      return;
    }
    if (ress.status === 201) {
      welcomePopUp(message);
      setTimeout(() => {
        window.location = "http://127.0.0.1:5500/client/pages/login.html";
      }, 2300);
    }
  } else {
    alert("Username and password must be between 3 and 20 characters long, try again!");
  }
});

function welcomePopUp(message) {
  const html = document.createElement("div");
  html.id = "welcomePopUp";

  html.innerHTML = `
    <p class="welcomeText">${message}</p>
    <br/> 
    <p class="welcomeText">Welcome</p>`;
  document.body.appendChild(html);
}
