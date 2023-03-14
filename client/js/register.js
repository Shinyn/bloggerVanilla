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
});
