var date = document.getElementById("add-date").value;
var head = document.getElementById("add-heading").value;
var details = document.getElementById("add-details").value;
let userdata = [];

userdata = JSON.parse(localStorage.getItem("Todo-list")) ?? [];

function addCard() {

  //   var task =document.getElementById("tab-2")
  if (date || head || details) {
    // let details = document.getElementById("details_container");
    // let mydata = details.getElementsByTagName("h3");
    // localStorage.setItem(head,details)
    // myJson = `{ [${date},${head},${details}] }`;
    // userdata.push(JSON.parse(myJson));

 
    userdata.push(date);
    userdata.push(head);
    userdata.push(details);
    let myJson=JSON.stringify(userdata);
    localStorage.setItem("Todo-list",myJson);
    
    // var contain = document.getElementById("details_container");
    // var card = document.createElement("div");
    // card.className = "card";
    // card.innerHTML = `
    // <h3>${head}</h3>
    // <h5>${date}</h5>
    // <p>${details}</p>
    // <button onclick="editTask(this)">Edit</button>
    // <button onclick="deleteTask(this)">Delete</button>
    // `;
  }
  // contain.appendChild(card);
  // document.getElementById("add-details").value='';
}

function search_func() {
  let filter = document.getElementById("myInput").value.toLowerCase();

  let details = document.getElementById("details_container");

  let mydata = details.getElementsByTagName("h3");

  for (let i = 0; i < mydata.length; i++) {
    // let heading =mydata.getElementsByTagName("h3");
    let myvalue = mydata[i].textContent || mydata[i].innerHTML;
    let field = document.getElementsByClassName("card");
    let indx = myvalue.toLowerCase().indexOf(filter);
    if (indx > -1) {
      mydata[i].style.display = "";
    } else {
      field[i].style.display = "none";
    }
  }
}
function editTask(e) {
  debugger;

  let date_to_insert = e.getElementsByTagName("h5").textContent;
  let heading_to_insert = e.getElementsByTagName("h3").textContent;
  let details_to_insert = e.getElementsByTagName("p").textContent;
  var date = (document.getElementById("add-date").value = date_to_insert);
  var head = document.getElementById("add-heading");
  var details = (document.getElementById("add-details").value =
    details_to_insert);
  head.value = heading_to_insert;
  // deleteTask(e);
}
function deleteTask(button) {
  var contain = document.getElementById("details_container");
  let rmv = button.parentNode;
  console.log(button.parentNode);
  contain.removeChild(rmv);
}
function alltask() {
  let main = document.getElementById("tab-2");
  // let rem=document.getElementById("main");
  let details = document.getElementById("details_container");
  main.innerHTML = "";
  main.appendChild(details);
}
// function dashboard()
// {
//   let main = document.getElementById("tab-2");
// }
function filter() {
  let main = document.getElementById("tab-2");
  main.innerHTML = "";
  main.innerHTML += `
  <label for="date_filter">Select Date:</label>
  <select name="cars" id="date_filter">
  <option value="volvo">Today</option>
  </select>
  `;
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  let details = document.getElementById("details_container");

  let mydata = details.getElementsByTagName("h5");
  for (let i = 0; i < mydata.length; i++) {
    if (mydata[i] == currentDate) {
    }
  }
}
