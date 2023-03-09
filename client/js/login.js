"use strict";

const usernameInput = document.querySelector("#loginFormUsername");
const passwordInput = document.querySelector("#loginFormPassword");
const form = document.querySelector(".loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("login form");

  const username = usernameInput.value;
  const password = passwordInput.value;

  const respons = await fetch("http://127.0.0.1:5500/pages/login.html", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
});
