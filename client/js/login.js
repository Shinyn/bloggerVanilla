const usernameInput = document.querySelector("#loginFormUsername");
const passwordInput = document.querySelector("#loginFormPassword");
const form = document.querySelector(".loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username.length >= 3 && username.length <= 20 && password.length >= 3 && password.length <= 20) {
    const respons = await fetch("http://127.0.0.1:5050/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const message = await respons.text();

    if (respons.status !== 200) {
      alert(message);
      return;
    }
    if (respons.status === 200) {
      window.location = "http://127.0.0.1:5500/client/pages/homepage.html";
    }
  } else {
    alert("Username and password must be between 3 and 20 characters long, try again!");
  }
});
