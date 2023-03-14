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
  welcomePopUp();

  setTimeout(() => {
    window.location = "http://127.0.0.1:5500/client/pages/login.html";
  }, 2300);
});

function welcomePopUp() {
  const html = document.createElement("div");
  html.id = "welcomePopUp";

  html.innerHTML = `
    <p class="welcomeText">Account Created</p>
    <br/> 
    <p class="welcomeText">Welcome</p>`;
  document.body.appendChild(html);
}
