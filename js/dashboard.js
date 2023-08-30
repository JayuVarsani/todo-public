let date = document.getElementById("add-date");
let head = document.getElementById("add-heading");
let details = document.getElementById("add-details");
let addBtn = document.getElementById("add-btn");
let contain = document.getElementById("details_container");
let form = document.getElementById("to-do");
let tabRight = document.getElementById("tab-2");
let logged_in_user = JSON.stringify(localStorage.getItem("logged_in_user"));
let popup = document.getElementById("task_popup");
let task_form = document.getElementById("add-task");
let task_line = document.getElementById("TaskBtn");
let show_total_task = document.getElementById("total_task_number");
// let task_bar = document.getElementById("total_task");
let dashboardArea = document.getElementById("dashboardArea");
let taskBtn1 = document.getElementById("taskBtn1");
let date_select = document.getElementById("date_filter");
let date1 = new Date();
let day = date1.getDate();
let month = date1.getMonth() + 1;
let year = date1.getFullYear();
let currentDate;
let showClick = document.getElementById("showClick");
let right_tab_id;
let header = document.getElementById("tab-1");
let tab = header.getElementsByClassName("right");
let totalTask=document.getElementById("task-form")
let todoNm = document.getElementById("todoNm");
let profile_img = document.getElementById("profile_img"); 
let myInput = document.getElementById("myInput")
let filterBtn=document.getElementById("filterBtn")
profile_img.innerHTML = `<img src="/img/profile.jpg" alt="profile" style="width:42px"></img>`;
if (month < 10) {
  currentDate = `${year}-0${month}-${day}`;
}
currentDate = new Date(currentDate).getTime();

window.onload = function () {
  if (localStorage.getItem("logged_in_user") === null) {
    location.replace("/login.html");
  }
};

//USERDATA
let id_container = JSON.parse(localStorage.getItem("logged_in_user"));
let current_id = id_container.id;
let userdata = [];
userdata = JSON.parse(localStorage.getItem("todo")) ?? [];

let completed_task_count = 0;
let ttl = 0;
function count() {
  completed_task_count = 0;
  ttl = 0;
  let task_count = userdata.forEach((data) => {
    if (data.id === current_id && data.mark === "done") {
      completed_task_count += 1;
    }
  });
  let total_task = userdata.forEach((data) => {
    if (data.id == current_id) {
      ttl += 1;
    }
    // return ttl;
  });
}
// console.log(ttl);

let eid = null;

// FOR SHOW USERNAME
let current_user = document.getElementById("profile_nm");
let upper=id_container.username
current_user.innerHTML = `${upper.toUpperCase()}`;

//FUNCTION TO SAVE CHANGES
function saveChanges(userdata) {
  localStorage.setItem("todo", JSON.stringify(userdata));
}

//
let mnth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const d = new Date();
document.getElementById("add-field").innerHTML = `${
  mnth[d.getMonth()]
} ${d.getDate()}-${d.getFullYear()} `;

function dashboard() {
  count();
  let work = (document.getElementById("work").innerHTML = `<p>Task Completed</p>
<h2>${completed_task_count} / ${ttl}</h2>`);
  let work1 = (document.getElementById(
    "work1"
  ).innerHTML = `<p>Remaining Task</p>
<h2>${ttl - completed_task_count} / ${ttl}</h2>`);
  importantTask();
  totalTask.style.display="flex";
  date_select.style.display = "none";
  contain.style.float="right"
  filterBtn.style.display="none";
  //for align imp task in line
  // contain.style.display = "flex";
  // contain.style.justifyContent = "center";
  // contain.style.flexDirection = "column";
  // contain.style.marginTop= "-195px";
  // contain.style.marginLeft = "100%";
  // contain.style.display="none";
  tabRight.style.alignItems = "flex-start";
  tabRight.style.justifyContent = "flex-start";
  // task_bar.style.display = "none";
  form.style.padding = "0px 30% 0% 0px";
  form.style.display = "none";
  dashboardArea.style.display = "inherit";
}
dashboard();

//FUNCTION TO ADD / UPDATE DATA ON ADD BUTTON
addBtn.onclick = () => {
  if (date.value && head.value && details.value) {
    let taskId = new Date().getTime();
    let addData = {
      id: current_id,
      task_id: taskId,
      date: date.value,
      head: head.value,
      details: details.value,
      mark: "",
      imp: "",
    };
  
    if (eid != null) {
      userdata.splice(eid, 1, addData);
      showClick.style.display = "block";
      todoNm.innerHTML = "Add Task";
      callingFunc(right_tab_id);
      showClick.innerHTML = "Data Edit Successfully";
      setTimeout(timeOut, 5000);
    } else {
      userdata.push(addData);
      showClick.style.display = "block";
      showClick.innerHTML = "Data Added Successfully";
      setTimeout(timeOut, 5000);
      count();
      // show_total_task.innerHTML = `Task Completed: ${completed_task_count}/${ttl}`
    }
    saveChanges(userdata);
    date.value = "";
    head.value = "";
    details.value = "";
    addBtn.innerHTML = "Add";
  }
  else if(date.value=='' && head.value=='' && details.value=='')
  {
    showClick.style.display = "block";
      showClick.innerHTML = "Please Fill All Fields";
      setTimeout(timeOut, 5000);
  }
};
function timeOut() {
  showClick.style.display = "none";
}
//FUNCTION TO CREATE NOTE/CARD
function createNote(data, index) {
  // contain.remove()
  var card = document.createElement("div");
  card.className = "card";

  let impCheck =
    data.imp === "yes"
      ? `<button onclick="impMark(${index})" title="Mark as Important" id="taskBtn1"><i class="fa fa-bookmark"  style="font-size:24px; color:red"></i>
  </button> `
      : `<button onclick="impMark(${index})" title="Mark as Important" id="taskBtn1"><i class="fa fa-bookmark-o"  style="font-size:24px; color:black"></i>
  </button>`;
  let markCheck =
    data.mark === "done"
      ? `<button onclick="done(${index})" title="Mark as Complete" id="taskBtn"><i class="fa fa-check-square" style="font-size:24px; color:black"></i>
  </button>`
      : `<button onclick="done(${index})" title="Mark as Complete" id="taskBtn"><i class="fa fa-check-square-o" style="font-size:24px; color:black"></i>
  </button>`;

  card.innerHTML = `
  <button onclick="deleteTask(${data.task_id})" title="Delete" id="taskBtn"><i class="fa fa-trash" style="font-size:24px;color:black"></i>
  </button>
  <button onclick="editTask(${index})" title="Edit" id="taskBtn"><i class="fa fa-edit" style="font-size:25px;color:black"></i>
  </button>
  ${markCheck}  
 ${impCheck}
  
  
  <h5>${data.date}</h5>
  <h3>${data.head}</h3>
  <p>${data.details}</p>
  `;
  contain.appendChild(card);
}

//FUNCTION TO SHOW ALL TODO's
function showData() {
  contain.style.display = "block";
  contain.innerHTML = `
  <h1 style="padding-left:10px;">Task List</h1>`;
  // date_select.style.display = "block";
  for (let i = 0; i < userdata.length; i++) {
    if (userdata[i].id == current_id) {
      createNote(userdata[i], i);
    }
  }
}

// document.onload = showData();

//FUNCTION TO DELTE TASK
function deleteTask(id) {
  popup.style.display = "block";
  contain.style.filter = "blur(20px)";
  dashboardArea.style.filter = "blur(20px)";
  let delete_tsk = document.getElementById("dlt");
  delete_tsk.addEventListener("click", () => delt(id));
}

function delt(id) {
  let asd = userdata.filter((data) => data.task_id !== id);
  userdata = asd;
  saveChanges(userdata);
  closePopup();

  for (var i = 0; i < tab.length; i++) {
    if (tab[i].className === "right active") {
      right_tab_id = i;
      console.log(right_tab_id);
    }
  }
  callingFunc(right_tab_id);

  showClick.style.display = "block";
  showClick.innerHTML = "Data Deleted Successfully";
  setTimeout(timeOut, 5000);
}
function closePopup() {
  popup.style.display = "none";
  contain.style.filter = "blur(0px)";
  dashboardArea.style.filter = "blur(0px)";
}

//FUNCTION TO EDIT TASK
function editTask(id) {
  eid = id;
  date.value = userdata[id].date;
  details.value = userdata[id].details;
  head.value = userdata[id].head;
  addBtn.innerHTML = "Save ";
  todoNm.innerHTML = "Edit Task";
  addTask();
  for (var i = 0; i < tab.length; i++) {
    if (tab[i].className === "right active") {
      right_tab_id = i;
      console.log(right_tab_id);
    }
  }
}

//FUNCTION TO SHOW ALL TASK
function alltask() {
  dashboardArea.style.display = "none";
  date_select.style.display = "none";
  contain.style.display = "block";
  // task_bar.style.display = "none";
  form.style.display = "none";
  showData();
  tabRight.style.alignItems = "flex-start";
  tabRight.style.justifyContent = "flex-start";
  filterBtn.style.display="block";
}
//FUNCTION TO SHOW FORM PAGE
function addTask() {
  dashboardArea.style.display = "none";
  tabRight.style.alignItems = "center";
  tabRight.style.justifyContent = "center";
  // task_bar.style.display = "block";
  form.style.display = "block";
  form.style.padding = "0px 15% 0px";
  contain.style.display = "none";
  date_select.style.display = "none";
  filterBtn.style.display="none";
}

//SEARCH BUTTON FUNCTION
function search_func() {
  let filter = document.getElementById("myInput").value.toLowerCase();

  let details = document.getElementById("details_container");

  let mydata = details.getElementsByTagName("h3");

  for (let i = 0; i < mydata.length; i++) {
    let myvalue = mydata[i].textContent || mydata[i].innerHTML;
    let field = document.getElementsByClassName("card");
    let indx = myvalue.toLowerCase().indexOf(filter);
    if (indx > -1) {
      field[i].style.display = "";
    } else {
      field[i].style.display = "none";
    }
  }
}
// show_total_task.innerHTML = `Task Completed: ${completed_task_count}/${ttl}`;
//FUNCTION TO OPEN NAV
function openNav() {
  document.getElementById("tab-1").style.width = "15%";
  document.getElementById("tab-2").style.marginLeft = "15%";
  document.getElementById("openNav").style.color = "white";
  document.getElementById("nav").style.width = "85%";
  myInput.style.margin="10px 25px 10px 20px";

}

//FUNCTION TO CLOSE NAV
function closeNav() {
  document.getElementById("tab-1").style.width = "0";
  document.getElementById("tab-2").style.marginLeft = "0";
  document.getElementById("openNav").style.color = "black";
  document.getElementById("nav").style.width = "100%";
  myInput.style.margin="10px 25px 10px 70px";
}

function signOut() {
  // JSON.stringify(localStorage.setItem("logged_in_user",[] ))
  localStorage.removeItem("logged_in_user");
}

//FUNCTION TO DISABLE BACK BUTTON
function preventBack() {
  window.history.forward();
}
setTimeout("preventBack()", 0);
window.onunload = function () {
  null;
};

//FUNCTION TO CHANGE COLOR OF SELECTED TAB
for (var i = 0; i < tab.length; i++) {
  tab[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function done(id) {
  if (userdata[id].mark === "done") {
    userdata[id].mark = "";
    showClick.style.display = "block";
    showClick.innerHTML = "Task Remove from Done";
    setTimeout(timeOut, 5000);
  } else {
    userdata[id].mark = "done";
    showClick.style.display = "block";
    showClick.innerHTML = "Task Mark as Done";
    setTimeout(timeOut, 5000);
  }
  saveChanges(userdata);
  count();
  for (var i = 0; i < tab.length; i++) {
    if (tab[i].className === "right active") {
      right_tab_id = i;
      console.log(right_tab_id);
    }
  }
  callingFunc(right_tab_id);
}

function impMark(id) {
  if (userdata[id].imp == "yes") {
    userdata[id].imp = "";
    showClick.style.display = "block";
    showClick.innerHTML = "Task remove from Important";
    setTimeout(timeOut, 5000);
  } else {
    userdata[id].imp = "yes";
    showClick.style.display = "block";
    showClick.innerHTML = "Task Mark as Important";
    setTimeout(timeOut, 5000);
  }
  saveChanges(userdata);
  for (var i = 0; i < tab.length; i++) {
    if (tab[i].className === "right active") {
      right_tab_id = i;
      console.log(right_tab_id);
    }
  }
  callingFunc(right_tab_id);
}
function callingFunc(right_tab_id) {
  if (right_tab_id === 0) {
    dashboard();
  } else if (right_tab_id === 2) {
    alltask();
  } else if (right_tab_id === 3) {
    remaining();
  } else if (right_tab_id === 4) {
    completed();
  } else if (right_tab_id === 5) {
    importantTask();
  }
}

function importantTask() {
  date_select.style.display = "none";
  dashboardArea.style.display = "none";
  tabRight.style.alignItems = "flex-start";
  tabRight.style.justifyContent = "flex-start";
  filterBtn.style.display="block";
  // task_bar.style.display = "none";
  form.style.display = "none";
  contain.style.display = "block";
  contain.innerHTML = `<h1 style="padding-left:10px;">Important Task List</h1>`;
  for (let i = 0; i < userdata.length; i++) {
    if (userdata[i].id === current_id && userdata[i].imp === "yes") {
      createNote(userdata[i], i);
    }
  }
}
function completed() {
  date_select.style.display = "none";
  dashboardArea.style.display = "none";
  tabRight.style.alignItems = "flex-start";
  tabRight.style.justifyContent = "flex-start";
  filterBtn.style.display="block";
  // task_bar.style.display = "none";
  form.style.display = "none";
  contain.style.display = "block";
  // contain.innerHTML = "";
  contain.innerHTML = `<h1 style="padding-left:10px;">Completed Task List</h1>`;
  userdata.forEach((data, index) => {
    if (data.id === current_id && data.mark === "done") {
      createNote(data, index);
    }
  });
}
function remaining() {
  date_select.style.display = "none";
  dashboardArea.style.display = "none";
  tabRight.style.alignItems = "flex-start";
  tabRight.style.justifyContent = "flex-start";
  filterBtn.style.display="block";
  // task_bar.style.display = "none";
  form.style.display = "none";
  contain.style.display = "block";
  // contain.innerHTML = "";
  contain.innerHTML = `<h1 style="padding-left:10px;">Remaining Task List</h1>`;
  userdata.forEach((data, index) => {
    if (data.id === current_id && data.mark !== "done") {
      createNote(data, index);
    }
  });
}
function filter() {
  dashboardArea.style.display = "none";
  tabRight.style.alignItems = "flex-start";
  tabRight.style.justifyContent = "flex-start";
  // task_bar.style.display = "none";
  form.style.display = "none";
  contain.innerHTML =
    contain.innerHTML = `<h1 style="padding-left:10px;">Filtering Task List</h1>`;
  contain.style.display = "block";
  date_select.style.display = "block";
  let dateStart = document.getElementById("date_start").value;
  let dateEnd = document.getElementById("date_end").value;
  let strt = new Date(dateStart);
  let startTime = strt.getTime();
  let end = new Date(dateEnd);
  let endTime = end.getTime();

  userdata.forEach((data, index) => {
    if (data.id == current_id) {
      let card_date = new Date(data.date).getTime();
      if (card_date >= startTime && card_date <= endTime) {
        createNote(data, index);
      } else if (dateEnd !== "" && dateStart === "" && card_date <= endTime) {
        createNote(data, index);
      } else if (
        dateEnd === "" &&
        dateStart !== "" &&
        card_date <= currentDate &&
        card_date >= startTime
      ) {
        createNote(data, index);
      }
    }
  });
}
//FUNCTION FOR CLEAR FILTER
function clearFilter() {
  // contain.innerHTML = "";
  document.getElementById("date_start").value = "";
  document.getElementById("date_end").value = "";
  filter();
}

// function todayTask() {
//   dashboardArea.style.display = "none";
//   tabRight.style.alignItems = "flex-start";
//   tabRight.style.justifyContent = "flex-start";

//   form.style.display = "none";
//   contain.innerHTML = ``;
//   contain.style.display = "block";
//   contain.innerHTML = `<i class="fa fa-bookmark" style="padding-top: 18px;font-size: 30px;">
//   </i><h1 style="padding-left:10px;">Today's Task List</h1>`;
//   date_select.style.display = "none";
//   for (let i = 0; i < userdata.length; i++) {
//     let temp_date = new Date(userdata[i].date).getTime();
//     if (userdata[i].id == current_id && temp_date === currentDate) {
//       createNote(userdata[i], i);
//     }
//   }
// }
// SHOW DASHBOARD

/* <i class="fa fa-exclamation-triangle	
  " style="padding-top: 18px;font-size: 30px; ">
  </i>
 <i class="fa fa-exclamation-triangle	
 " style="padding-top: 18px;font-size: 30px; ">
 </i>
 <i class="fa fa-calendar-check-o" style="padding-top: 18px;font-size: 30px;">
  </i>
  <i class="fa fa-bookmark" style="padding-top: 18px;font-size: 30px;color:red">
  </i>
  <i class="fa fa-bookmark" style="padding-top: 18px;font-size: 30px;color:red">
  </i>
<i class="fa fa-bookmark" style="padding-top: 18px;font-size: 30px;"> */