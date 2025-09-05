export function initLogin() {
  

  let email = document.getElementById("signin_email");
  let password = document.getElementById("signin_password");
  let loginBtn = document.getElementById("loginbtn");
  let incorrectMsg = document.getElementById("incorrectMsg");
  let RequiedInputs = document.getElementById("RequiedInputs");

  
  let username;

  let users = [];
  if (JSON.parse(localStorage.getItem("users")) != null) {
    users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
  }

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (email.value !== "" && password.value !== "") {
      let vaildUser = isValidUser(email.value, password.value);

      if (vaildUser) {
        sessionStorage.setItem("currentUser", JSON.stringify(vaildUser));
        Toastify({
          text: "Account login successfully!",
          duration: 1000,
          style: {
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(86, 84, 83, 1))",
          },
        }).showToast();
        setTimeout(() => {
          window.location.href = "home.html";
        }, 2000);
        sessionStorage.setItem("n", username);
      } else {
        incorrectMsg.classList.remove("d-none");
        RequiedInputs.classList.add("d-none");
      }
    } else {
      RequiedInputs.classList.remove("d-none");
      incorrectMsg.classList.add("d-none");
    }
  });

  /* validation inputs */
  function isValidUser(emailInput, passwordInput) {
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === emailInput &&
        users[i].password === passwordInput
      ) {
        username = users[i].name;
        
        return users[i];
      }
    }
    return false;
  }
}
