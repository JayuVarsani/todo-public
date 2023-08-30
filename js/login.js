let rightTab = document.getElementById("right");
let login = document.getElementById("loginDiv");
let register = document.getElementById("registrationDiv");
let logginUser = document.getElementById("loggin_username");
let logginPassword = document.getElementById("loggin_password");
let notmatch = document.getElementById("h4");
let notmatch_regi = document.getElementById("err_msg");

// let  = [];
//  = JSON.parse(localStorage.getItem("registered_user")) ?? [];
window.onload = function () {
  if (localStorage.getItem("logged_in_user") !== null) {
    window.location.pathname = "/dashboard.html";
  }
};

let form = document.getElementById("myForm");
let regi_form = document.getElementById("regi_form");
if(notmatch.style.display==='' )
{
  form.addEventListener("submit", handleForm);
}
if(notmatch_regi.style.display==='' )
{
  regi_form.addEventListener  ("submit", handleForm);
}
function handleForm(e)
{
      e.preventDefault();
}

let regi_arr = [];
let id = 0;
regi_arr = JSON.parse(localStorage.getItem("registered_user")) ?? [];
function showRegi() {
  login.style.display = "none";
  register.style.display = "block";
}
function showLogin() {
  login.style.display = "block";
  register.style.display = "none";
}
// function registerd() {
//   id = new Date().getTime();
//   let user = document.getElementById("user");
//   let password = document.getElementById("password");
//   let email = document.getElementById("Email");
//   let mobile = document.getElementById("Mobile");
//   let addData = {
//     id: id,
//     username: user.value,
//     password: password.value,
//     email: email.value,
//     mobile: mobile.value,
//   };
//   for(let i=0;i<regi_arr.length;i++)
//   {
//     if(regi_arr[i].username===user.value)
//     {
//       notmatch_regi.style.display = "block";
//       notmatch_regi.innerHTML="Username Already Exist"
//       break;
//     }
//     else if(regi_arr[i]===regi_arr.length-1)
//     {
//       notmatch_regi.style.display = "none";
//       regi_arr.push(addData);
//       localStorage.setItem("registered_user", JSON.stringify(regi_arr));
//       showLogin();
//       break;
//     }
//   }
// }
function registerd() {
  id = new Date().getTime();
  let user = document.getElementById("user");
  let password = document.getElementById("password");
  let email = document.getElementById("Email");
  let mobile = document.getElementById("Mobile");
  let addData = {
    id: id,
    username: user.value,
    password: password.value,
    email: email.value,
    mobile: mobile.value,
  };
  for(let i=0;i<regi_arr.length;i++)
    {
      if(regi_arr[i].username===user.value)
      {
        notmatch_regi.style.display = "block";
        notmatch_regi.innerHTML="Username Already Exist"
        user.value==""
        break;
      }
      else if(i==regi_arr.length-1)
      {
        notmatch_regi.style.display = "none";
        regi_arr.push(addData);
        localStorage.setItem("registered_user", JSON.stringify(regi_arr));
        showLogin();
        break;
      }

  // regi_arr.push(addData);
  // localStorage.setItem("registered_user", JSON.stringify(regi_arr));
}
}

function LoggedIN() {
  notmatch.style.display = "none";
  for (let i = 0; i < regi_arr.length; i++) {
    if (
      regi_arr[i].username == logginUser.value &&
      regi_arr[i].password == logginPassword.value
    ) {
      let var1 = {
        id: regi_arr[i].id,
        username: regi_arr[i].username,
      };
      localStorage.setItem("logged_in_user", JSON.stringify(var1));
      // history.replaceState(null, null, "dashboard.html");
      window.location="dashboard.html"
      break;
    } 
     else if (
      regi_arr[i].username == logginUser.value &&
      regi_arr[i].password != logginPassword.value
    ) {
      logginPassword.value = "";
      notmatch.innerHTML = "Password Does Not matched";
      notmatch.style.display = "block";
      break;
    } else if (i == regi_arr.length - 1) {
      if (regi_arr[i].username != logginUser.value) {
        logginUser.value = "";
        logginPassword.value = "";
        notmatch.innerHTML = " Username Not Found ";
        notmatch.style.display = "block";
      }
    }
  }
}
// FUNCTION TO DISABLE BACK BUTTON
function preventBack() {
  window.history.forward();
}
setTimeout("preventBack()", 0);

