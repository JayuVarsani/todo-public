const add_date = document.getElementById("add-date");

const add_head = document.getElementById("add-heading");

const add_detail = document.getElementById("add-details");

const form = document.getElementById("add-task");

const btn = document.getElementById("add-btn");

const open = document.getElementById("add-task");

const display = document.getElementById("display_data");

const prfl = document.getElementById("profile-tab");
// const buttn=document.getElementById("add-btn");
const arr = [];
console.log(arr);

const addForm = (e) => {
  e.preventDefault();

  const date = add_date.value;
  const head = add_head.value;
  const details = add_detail.value;
  const addtoarray = {
    datetoshow: date,
    headtoshow: head,
    detailtoshow: details,
  };
  arr.push(addtoarray);
  console.log(arr);
  show_data();
  // alert("Hello");
};

function open_form() {
  open.style.display = "block";
}

// function open_profile() {
//   prfl.style.display="block";
// }

// function show_data() {
//   let table = "";
//   arr.forEach = (data, i) => {
//     table += 
    
//     `
//     <tr>
//     <th scope="row">${i + 1}</th>
//     <td>${data.datetoshow}</td>
//     <td>${data.headtoshow}</td>
//     <td>${data.detailtoshow}</td>
//     </tr>
//     `
    

//     display.innerHTML = table;
//   };
 
// }
// show_data();

function show_data(){
  let  table = '';
  arr.forEach((data , i)=>{
    table += 

    `
    <tr>
         <th scope="row">${i + 1}</th>
         <td>${data.datetoshow}</td>
       <td>${data.headtoshow}</td>
      <td>${data.detailtoshow}</td>
       </tr>

    `
    display.innerHTML = table;
  }) ;
  
}
 show_data();

// function displayINfo() {

//   let table = '';
//       userdata.forEach((data, i) => {
//           table +=
//               `
//           <tr>
//           <th scope="row">${i+1}</th>
//           <td>${data.user}</td>
//           <td>${data.userage}</td>
          
//           <td>
//               <span class="dlt-btn" onclick=' deleteInfo(${i})'><i
//                       class=" fa-regular fa-trash-can "></i></span>
//               <span class="dlt-btn" onclick=' editInfo(${i})'><i
//                       class="fa-regular fa-pen-to-square"></i></span>
//           </td>
          
//       </tr>
          
//       `
      
//       });

//       displayRecord.innerHTML = table;
// }
// displayINfo()

form.addEventListener("submit", addForm);
btn.addEventListener("submit",show_data());

// function show()
// {
//     const date=add_date;
//     const head=add_head;
//     const details=add_detail;
//     arr.push(date,head,details);
//     console.log(arr);
// }
