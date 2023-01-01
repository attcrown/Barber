//------------FirebaseConfig---------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import{getDatabase ,ref ,set ,child ,get ,update ,remove ,onValue} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyC9Wj5xc54F8z4NcK-7RBJBuVfMh6zh-xc",
  authDomain: "projectbarber64-9435e.firebaseapp.com",
  databaseURL: "https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectbarber64-9435e",
  storageBucket: "projectbarber64-9435e.appspot.com",
  messagingSenderId: "31761681328",
  appId: "1:31761681328:web:9cacd2e8ed95f3b7a4a475",
  measurementId: "G-E9B3F9EB0E"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());

//--------เก็บค่าจาก id------
const submit = document.getElementById('sub_btn');
const Closebar = document.getElementById('Closebarber');
const Openbar = document.getElementById('Openbarber');

// get(child(dbRef,"Stopday/")).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//     if(snapshot.val().Sun != ""){
//       document.getElementById("Sunday").checked=true;
//     }
//     if(snapshot.val().Mon != ""){
//       document.getElementById("Monday").checked=true;
//     }
//     if(snapshot.val().Tue != ""){
//       document.getElementById("Tuesday").checked=true;
//     }
//     if(snapshot.val().Wed != ""){
//       document.getElementById("Wednesday").checked=true;
//     }
//     if(snapshot.val().Thu != ""){
//       document.getElementById("Thursday").checked=true;
//     }
//     if(snapshot.val().Fir != ""){
//       document.getElementById("Firday").checked=true;
//     }
//     if(snapshot.val().Sat != ""){
//       document.getElementById("Saturday").checked=true;
//     }
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
        
//---------assign the events-------
submit.addEventListener('click',SaveDay);

// save day
const TimeMonth = document.getElementById("TimeMonth");
const TimeWeek = document.getElementById("TimeWeek");
const TimeYear = document.getElementById("TimeYear");
function SaveDay(){
  if(Openbar.value == "Open Barber" || Closebar.value == "Close Barber"){
    alert("กรุณาระบุเวลาเปิด-ปิดร้าน");
    return;
  }
  console.log(Openbar.value);
  console.log(Closebar.value);
  update(ref(db,"TimeShop/"+TimeYear.value+"/"+TimeMonth.value+"/"+TimeWeek.value),
      {
        open: Openbar.value,
        close: Closebar.value,
        Sun: Sunday(),
        Mon: Monday(),
        Tue: Tuesday(),
        Wed: Wednesday(),
        Thu: Thursday(),
        Fir: Firday(),
        Sat: Saturday()
      }) 
      .then(function(){
        alert("บันทึกสำเร็จ");
      })
      .catch((error)=>{
        alert("บันทึกerror"+ error);
      })                 
}


//---------DAY------------
function Sunday(){
    let Sun = document.getElementById('Sunday').checked;
    if(Sun == false){
      Sun = "";
    }
    else{
      Sun = "Sun";
    }
  return Sun;  
}
function Monday(){
    let Mon = document.getElementById('Monday').checked;
    if(Mon == false){
      Mon = "";
    }
    else{
      Mon = "Mon";
    }
  return Mon;  
}function Tuesday(){
    let Tue = document.getElementById('Tuesday').checked;
    if(Tue == false){
      Tue = "";
    }
    else{
      Tue = "Tue";
    }
  return Tue;  
}function Wednesday(){
    let Wed = document.getElementById('Wednesday').checked;
    if(Wed == false){
      Wed = "";
    }
    else{
      Wed = "Wed";
    }
  return Wed;  
}function Thursday(){
    let Thu = document.getElementById('Thursday').checked;
    if(Thu == false){
      Thu = "";
    }
    else{
      Thu = "Thu";
    }
  return Thu;  
}function Firday(){
    let Fir = document.getElementById('Firday').checked;
    if(Fir == false){
      Fir = "";
    }
    else{
      Fir = "Fir";
    }
  return Fir;  
}function Saturday(){
    let Sat = document.getElementById('Saturday').checked;
    if(Sat == false){
      Sat = "";
    }
    else{
      Sat = "Sat";
    }
  return Sat;  
}