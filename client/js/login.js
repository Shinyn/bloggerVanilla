"use strict";

const usernameInput = document.querySelector("#loginFormUsername");
const passwordInput = document.querySelector("#loginFormPassword");
const form = document.querySelector(".loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("login form");

  const username = usernameInput.value;
  const password = passwordInput.value;

  const respons = await fetch("http://127.0.0.1:5050/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  console.log(respons);
  const body = await respons.text();
  console.log(body);

  if (
    //TODO: måste kolla här om usern ens finns i databasen också. Samma på server delen.
    username.length >= 3 &&
    username.length <= 20 &&
    password.length >= 3 &&
    password.length <= 20
  ) {
    window.location = "http://127.0.0.1:5500/client/pages/homepage.html";
  } else {
    alert(
      "Username and password must be between 3 and 20 characters long, try again!"
    );
  }
});
