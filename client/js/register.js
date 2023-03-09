const usernameInput = document.querySelector("#registerFormUsername");
const passwordInput = document.querySelector("#registerFormPassword");
const form = document.querySelector(".registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("eventlistener on form");

  const username = usernameInput.value;
  const password = passwordInput.value;

  const body = {
    username: username,
    password: password,
  };

  const respons = await fetch("http://127.0.0.1:5500/pages/register.html", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  //   console.log("titta här");
  //   console.log(await respons);
});
