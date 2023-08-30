const d=document.getElementById('data');
const a=[];
const nme=document.getElementById('nm').value;
const asd=(e)=>{
    debugger    
    e.preventDefault();

a.push(nme);
    console.log(a);
}
d.addEventListener("submit",asd);
