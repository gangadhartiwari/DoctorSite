const ADMIN_PASSWORD = "admin123";
const WHATSAPP_NUMBER = "919009664469";

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
const table = document.getElementById("adminTable");

function openTab(id){
  document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function loginAdmin(){
  if(adminPass.value === ADMIN_PASSWORD){
    adminLogin.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    renderTable();
  } else alert("Wrong password");
}

function renderTable(){
  table.innerHTML="";
  appointments.forEach(a=>{
    table.innerHTML+=`
      <tr>
        <td>${a.name}</td>
        <td>${a.phone}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>${a.problem}</td>
      </tr>`;
  });
}

appointmentForm.addEventListener("submit",e=>{
  e.preventDefault();

  const data={
    name:name.value,
    phone:phone.value,
    date:date.value,
    time:time.value,
    problem:problem.value
  };

  appointments.push(data);
  localStorage.setItem("appointments",JSON.stringify(appointments));

  emailjs.send("SERVICE_ID","TEMPLATE_ID",data);

  const msg=`New Appointment:
${data.name}
${data.phone}
${data.date} ${data.time}
${data.problem}`;

  whatsappBtn.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  alert("Appointment submitted");
  appointmentForm.reset();
});

function exportToExcel(){
  let csv="Name,Phone,Date,Time,Concern\n";
  appointments.forEach(a=>{
    csv+=`"${a.name}","${a.phone}","${a.date}","${a.time}","${a.problem}"\n`;
  });
  const blob=new Blob([csv],{type:"text/csv"});
  const link=document.createElement("a");
  link.href=URL.createObjectURL(blob);
  link.download="appointments.csv";
  link.click();
}

function clearAppointments(){
  if(confirm("Clear all?")){
    localStorage.clear();
    appointments=[];
    renderTable();
  }
}
