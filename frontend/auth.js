// register function
function register(){
  let user = {
    name: document.getElementById("name").value,
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  localStorage.setItem("userData", JSON.stringify(user));
  alert("Registration successful!");
  window.location.href = "login.html";
}

// login function
function login(){
  let stored = JSON.parse(localStorage.getItem("userData"));

  let uname = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if(stored && uname === stored.username && pass === stored.password){
    alert("Login successful");
    localStorage.setItem("isLoggedIn","true");
    window.location.href = "newindex.html";
  }else{
    alert("Invalid credentials");
  }
}
function resetPassword(){
  let stored = JSON.parse(localStorage.getItem("userData"));

  let uname = document.getElementById("username").value;
  let newpass = document.getElementById("newpass").value;
  let confirmpass = document.getElementById("confirmpass").value;

  if(!stored || uname !== stored.username){
    alert("Username not found");
    return;
  }

  if(newpass !== confirmpass){
    alert("Passwords do not match");
    return;
  }

  stored.password = newpass;
  localStorage.setItem("userData", JSON.stringify(stored));

  alert("Password reset successful");
  window.location.href = "login.html";
}
