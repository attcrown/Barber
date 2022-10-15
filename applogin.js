//ตรวจสอบรหัส
const Userid = document.getElementById('Userid')
const Passid = document.getElementById('Passid')
function login(){
  if(Userid == "admin" || Passid == "admin"){
    
  }else{
    alert ("เข้าสู่ระบบไม่สำเร็จ")
  }
  return login;
}

function go(){
  window.open("indexAdmin.html")
}

function go2(){
  window.open("indexBarber.html")
}

    



  


