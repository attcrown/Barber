//------calderปฎิทิน------
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

var numday;
var sum;  
const d = new Date();
let years = d.getFullYear();
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var name = month[d.getMonth()];
const MonthYear = document.getElementById("MonthYear");
const days = document.getElementById("Calbody");
MonthYear.innerHTML = name+" "+d.getFullYear();
var tr = "<tr>";
var trend = "</tr>";
var td = "<td>";
var tdend = "</td>"
var tdclass = "<td style='color:rgb(140, 140, 140);'>"
sum = tr;
d.setDate(1);

if(d.getMonth()==1){
    let feb = d.getFullYear() % 4;
    if(feb == 3){
      numday = 29;
    }else{numday = 28;}
  }else if(d.getMonth() == 0 || d.getMonth() == 2 || d.getMonth() == 4 
    || d.getMonth() == 6 || d.getMonth() == 7 || d.getMonth() == 9 
    || d.getMonth() == 11){
    numday = 31;
  }else if(d.getMonth() == 3 || d.getMonth() == 5 || d.getMonth() == 8 
    || d.getMonth() == 10){
    numday = 30;
  }          
  if(d.getDay() > 0){
    for(let i = 0;i<d.getDay();i++){
      sum += tdclass+tdend; 
    }
  }
  for(let i = 1; i<=numday; i++){
    sum += td+"<button type='button' class='btn btn-light btn-sm' style='font-size:15px' onclick='showdaycal(value,id)' id="+i+" value="+name+" data-bs-toggle='modal' data-bs-target='#staticBackdrop' disabled >"+i+"</button>"+tdend;
    if(i+d.getDay() == 7 || i+d.getDay() == 14 || i+d.getDay() == 21 || i+d.getDay() == 28 || i+d.getDay() == 35){
      sum += trend+tr;
    }
  }
  d.setDate(numday);
  if(d.getDay() < 6){
    for(let i = d.getDay();i<6;i++){
      sum += tdclass+tdend; 
    }
  }

days.innerHTML = sum;
importyears(years);
editbtn();
setTimeout(()=>{
  editbtnbarber();
  console.log("editbtnbarber()");
},800);

// function calder pre Next
const pre = document.getElementById("pre");
const next = document.getElementById("next");
var a = d.getMonth();
pre.addEventListener('click',(e)=>{
  a = a-1;
  if(a == -1){
    a = 11;
    years -= 1;
  }
  name = month[a];
  MonthYear.innerHTML = name+" "+years;
  sum = "";
  dateday();
});
next.addEventListener('click',(e)=>{
  a = a+1;
  if(a == 12){
    a = 0;
    years += 1;
  }
  name = month[a];
  MonthYear.innerHTML = name+" "+years;
  sum = "";
  dateday();
});

//Function pre Next ปุ่มไป ปุ่มกลับ ปฏิทิน
function dateday(){
  const n = new Date(name+","+years);
  n.setDate(1);
  sum = tr; 
  if(n.getDay() > 0){
    for(let i = 0;i<n.getDay();i++){
      sum += tdclass+tdend; 
    }
  }
  for(let i = 1; i<=numday; i++){
    sum += td+"<button type='button' class='btn btn-light btn-sm' onclick='showdaycal(value,id)' id="+i+" value="+name+" data-bs-toggle='modal' data-bs-target='#staticBackdrop' disabled>"+i+"</button>"+tdend;
    if(i+n.getDay() == 7 || i+n.getDay() == 14 || i+n.getDay() == 21 || i+n.getDay() == 28 || i+n.getDay() == 35){
      sum += trend+tr;
    }
  }
  n.setDate(numday);
  console.log(n.getDay());
  if(n.getDay() < 6){
    for(let i = n.getDay();i<6;i++){
      sum += tdclass+tdend; 
    }
  }
  console.log(n);
days.innerHTML = sum;
importyears(years);
editbtn();
editbtnbarber();
}

//-------delete day calder-------
const Delday = document.getElementById('Delday');
Delday.addEventListener('click',(e)=>{
    remove(ref(db,"TimeฺBarber/"+pullnames+"/"+importyear+"/"+montha+"/"+dayb),{})
    console.log("ลบ "+montha,dayb,importyear);
    document.getElementById(dayb).classList.remove("btn-info");
    document.getElementById(dayb).classList.add("btn-success");
});

//-------saveCalder----------
const Subday = document.getElementById('Subday');
Subday.addEventListener('click',(e)=>{
  const editStartWork = document.getElementById('editStartWork');
  const editStopWork = document.getElementById('editStopWork');
  const editStartBreak = document.getElementById('editStartBreak');
  const editStopBreak = document.getElementById('editStopBreak');
  if(editStartWork.value == "Start Work" || editStopWork.value == "Stop Work"){
    alert("กรุณาระบุเวลาเข้างาน และเวลาออกงาน");
    return;
  }
  if(editStartBreak.value == "Start Break" || editStopBreak.value == "Stop Break"){
    alert("กรุณาระบุเวลาเข้างาน และเวลาออกงาน");
    return;
  }
  set(ref(db,"TimeฺBarber/"+pullnames+"/"+importyear+"/"+montha+"/"+dayb),{
    StartWork : editStartWork.value,
    StopWork : editStopWork.value,
    StartBreak : editStartBreak.value,
    StopBreak : editStopBreak.value
  })
  editbtnbarber();
});

//------savetick-------
//--------เก็บค่าจาก id------
const submit = document.getElementById('sub_btn');

//---------assign the events-------
submit.addEventListener('click',SaveDay);

//---------DAY------------
function Sunday(){
  let Sun = document.getElementById('Sunday').checked;
  if(Sun == true){
    Sun = 0;
  }
  else{
    Sun = 8;
  }
return Sun;  
}
function Monday(){
  let Mon = document.getElementById('Monday').checked;
  if(Mon == true){
    Mon = 1;
  }
  else{
    Mon = 8;
  }
return Mon;  
}function Tuesday(){
  let Tue = document.getElementById('Tuesday').checked;
  if(Tue == true){
    Tue = 2;
  }
  else{
    Tue = 8;
  }
return Tue;  
}function Wednesday(){
  let Wed = document.getElementById('Wednesday').checked;
  if(Wed == true){
    Wed = 3;
  }
  else{
    Wed = 8;
  }
return Wed;  
}function Thursday(){
  let Thu = document.getElementById('Thursday').checked;
  if(Thu == true){
    Thu = 4;
  }
  else{
    Thu = 8;
  }
return Thu;  
}function Firday(){
  let Fir = document.getElementById('Firday').checked;
  if(Fir == true){
    Fir = 5;
  }
  else{
    Fir = 8;
  }
return Fir;  
}
function Saturday(){
  let Sat = document.getElementById('Saturday').checked;
  if(Sat == true){
    Sat = 6;
  }
  else{
    Sat = 8;
  }
return Sat;  
}

// save day
function SaveDay(){
  const TimeMonth = document.getElementById("TimeMonth");
  const TimeYear = document.getElementById("TimeYear");
  const StartWork = document.getElementById("StartWork");
  const StopWork = document.getElementById("StopWork");
  const StartBreak = document.getElementById("StartBreak");
  const StopBreak = document.getElementById("StopBreak");
  if(TimeMonth.value == "เดือน" || TimeYear.value == "ปี"){
    alert("กรุณาระบุเดือน และปี");
    return;
  }
  if(StartWork.value == "Start Work" || StopWork.value == "Stop Work"){
    alert("กรุณาระบุเวลาเข้างาน และเวลาออกงาน");
    return;
  }
  if(StartBreak.value == "Start Break" || StopBreak.value == "Stop Break"){
    alert("กรุณาระบุเวลาเริ่มพัก และเวลาหยุดพัก");
    return;
  }
  

  let n = new Date(TimeMonth.value+","+TimeYear.value);
  console.log(TimeMonth.value+TimeYear.value);
  for(var i = 1;i <= numday;i++){
    n.setDate(i);
    var x = parseInt(n.getDay());
    var checkbtn = document.getElementById(i).disabled;
    if(checkbtn){
      console.log("No save");
    }
    else if(x == Sunday() || x == Monday() || x == Tuesday() || x == Wednesday() || x == Thursday() || x == Firday() || x == Saturday()){
      update(ref(db,"TimeฺBarber/"+pullnames+"/"+TimeYear.value+"/"+TimeMonth.value+"/"+i),
        {
          StartWork : StartWork.value,
          StopWork : StopWork.value,
          StartBreak : StartBreak.value,
          StopBreak : StopBreak.value
        })
    }
    else if(x != Sunday() && x != Monday() && x != Tuesday() && x != Wednesday() && x != Thursday() && x != Firday() && x != Saturday()){
      remove(ref(db,"TimeฺBarber/"+pullnames+"/"+TimeYear.value+"/"+TimeMonth.value+"/"+i),{})
      document.getElementById(i).classList.remove("btn-info");
      document.getElementById(i).classList.add("btn-success");
    }
    else{alert("error");}
    //console.log(Sunday()+" "+Monday()+" "+Tuesday()+" "+Wednesday()+" "+Thursday()+" "+Firday()+" "+Saturday());
  }
  editbtn();
  editbtnbarber();
}

//---------EditBTN---------
function editbtn(){
  const dbReff = ref(db,"TimeShop/"+years+"/"+name);
  var keyday = [];
  let i = 0;
  onValue(dbReff,(snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      keyday[i] = childKey; 
      i++;
    });
    while(i >= 0){
      for(let x=0; x<=numday ;x++){
        if(keyday[i] == x){
          document.getElementById(x).disabled=false;
          document.getElementById(x).classList.remove("btn-light");
          document.getElementById(x).classList.add("btn-success");
        }
      }
      i--;
    }
  }, {
    onlyOnce: true
  });
}
//---------EditBTNBarber---------
function editbtnbarber(){
  const dbReff = ref(db,"TimeฺBarber/"+pullnames+"/"+years+"/"+name);
  var keyday = [];
  let i = 0;
  onValue(dbReff,(snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      keyday[i] = childKey; 
      console.log(childKey);
      i++;
    });
    while(i >= 0){
      for(let x=0; x<=numday ;x++){
        if(keyday[i] == x){
          document.getElementById(x).classList.remove("btn-success");
          document.getElementById(x).classList.add("btn-info");
        }
      }
      i--;
    }
  }, {
    onlyOnce: true
  });
}


//---------ตรวจสอบวันที่---------
const btndetail = document.getElementById('btndetail');
btndetail.addEventListener('click',CloseOpentext);
function CloseOpentext(){
  console.log("CloseOpentext()"+pullnames+years+name);
  const dbReffs = ref(db,"TimeฺBarber/"+pullnames+"/"+years+"/"+name);
  onValue(dbReffs,(snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log(childKey);
      console.log(childData);
      if(childKey == dayb){
        console.log(childData);
        document.getElementById('opentime').innerText = "เข้างาน "+childData.StartWork+"น.";
        document.getElementById('closetime').innerText = "ออกงาน "+childData.StopWork+"น.";
        document.getElementById('Breakstart').innerText = "เริ่มพัก "+childData.StartBreak+"น.";
        document.getElementById('Breakstop').innerText = "หยุดพัก "+childData.StartBreak+"น.";
      }  
    });
  }, {
    onlyOnce: true
  });
}


//----DelDetail-----X----Close----
const Celday = document.getElementById('Celday');
const Celday1 = document.getElementById('Celday1');

Celday.addEventListener('click',(e)=>{
  document.getElementById('opentime').innerText = "";
  document.getElementById('closetime').innerText = "";  
  document.getElementById('Breakstart').innerText = "";
  document.getElementById('Breakstop').innerText = ""; 
});
Celday1.addEventListener('click',(e)=>{
  document.getElementById('opentime').innerText = "";
  document.getElementById('closetime').innerText = "";  
  document.getElementById('Breakstart').innerText = "";
  document.getElementById('Breakstop').innerText = "";  
});
Delday.addEventListener('click',(e)=>{
  document.getElementById('opentime').innerText = "";  
  document.getElementById('closetime').innerText = ""; 
  document.getElementById('Breakstart').innerText = "";
  document.getElementById('Breakstop').innerText = ""; 
});

setTimeout(()=>{
  console.log(pullnames);
},500);










