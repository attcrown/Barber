//ตรวจสอบรหัส
const Userid = document.getElementsByName("Userinput")
const Passid = document.getElementsByName("passinput")
const UserBIG = "admin"
const PassBIG = "admin"

function login(){
  if("adm" == UserBIG || "adm" == PassBIG){
    alert ("เข้าสู่ระบบสำเร็จ")
    window.open("indexAdmin.html");
  }else{
    alert ("เข้าสู่ระบบไม่สำเร็จ"+ UserBIG + PassBIG + Userid.values);
  }
}

function go2(){
  window.open("indexBarber.html")
}

function mysum() {
  document.getElementById("login12").submit();
}    



  


