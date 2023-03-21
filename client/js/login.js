"use strict";

const usernameInput = document.querySelector("#loginFormUsername");
const passwordInput = document.querySelector("#loginFormPassword");
const form = document.querySelector(".loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (
    //TODO: måste kolla här om usern ens finns i databasen också. Samma på server delen.
    username.length >= 3 &&
    username.length <= 20 &&
    password.length >= 3 &&
    password.length <= 20
  ) {
    const respons = await fetch("http://127.0.0.1:5050/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (respons.status === 404) {
      alert("No user with that name");
      return;
    }
    console.log("INFO---------------------------------<><><<<");
    console.log(respons);
    console.log(respons.status);
    // if (respons.status)
    window.location = "http://127.0.0.1:5500/client/pages/homepage.html";
  } else {
    alert(
      "Username and password must be between 3 and 20 characters long, try again!"
    );
  }
});
