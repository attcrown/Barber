  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
  import { getFirestore ,collection ,getDocs ,addDoc ,deleteDoc ,doc} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyC9Wj5xc54F8z4NcK-7RBJBuVfMh6zh-xc",
    authDomain: "projectbarber64-9435e.firebaseapp.com",
    projectId: "projectbarber64-9435e",
    storageBucket: "projectbarber64-9435e.appspot.com",
    messagingSenderId: "31761681328",
    appId: "1:31761681328:web:9cacd2e8ed95f3b7a4a475",
    measurementId: "G-E9B3F9EB0E"
  };

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app)
  const tableadmin = document.getElementById("tableMemberListAdmin")
  const form = document.getElementById("addform")
  
  //------------ Link Firebase เข้ากับแอพ------------
  async function getEmployees(database){
      const empCol = collection(database,'employeesbarber')
      const empDocument =getDocs(empCol)
      return empDocument
  }
  function showData(employee){
    //console.log(employee.data().First_name);
    const row = tableadmin.insertRow(-1)
    const FirstCol = row.insertCell(0)
    const LastCol = row.insertCell(1)
    const EmailCol = row.insertCell(2)
    const PassCol = row.insertCell(3)
    const deleteCol = row.insertCell(4)
    FirstCol.innerHTML = employee.data().First_name
    LastCol.innerHTML = employee.data().Last_name
    EmailCol.innerHTML = employee.data().Email
    PassCol.innerHTML = employee.data().Password

    //สร้างปุ่มลบ
    let btn = document.createElement('button')
    btn.textContent="ลบข้อมูล"
    btn.setAttribute('class','btn btn-danger')
    btn.setAttribute('data-id',employee.id)
    deleteCol.appendChild(btn)
    btn.addEventListener('click',(e)=>{
      let id = e.target.getAttribute('data-id')
      //console.log(id)
      deleteDoc(doc(database,'employeesbarber',id))
      alert("ลบข้อมูลเรียนร้อย")
      setTimeout(() => {
        document.location.reload();
      }, 500);
    })

  }
//ดึงกลุ่ม document
  const data = await getEmployees(database)
  data.forEach(employee => {
    showData(employee)
  })

  //ดึงข้อมูล
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    addDoc(collection(database,'employeesbarber'),{
        First_name:form.Firstadmin.value,
        Last_name:form.Lastadmin.value,
        Email:form.Emailadmin.value,
        Password:form.Passadmin.value

    })
    form.Firstadmin.value=""
    form.Lastadmin.value=""
    form.Emailadmin.value=""
    form.Passadmin.value=""
    alert("บันทึกข้อมูลเรียนร้อย")
    //console.log(form.First_name.value)
    //console.log(form.Last_name.value)
    //console.log(form.Username.value)
    //console.log(form.Password.value)
    setTimeout(() => {
      document.location.reload();
    }, 500);
  })
  


