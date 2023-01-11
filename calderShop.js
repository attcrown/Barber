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
    sum += td+"<button type='button' class='btn btn-light btn-sm' style='font-size:15px' onclick='showdaycal(value,id)' id="+i+" value="+name+" data-bs-toggle='modal' data-bs-target='#staticBackdrop'>"+i+"</button>"+tdend;
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
    sum += td+"<button type='button' class='btn btn-light btn-sm' onclick='showdaycal(value,id)' id="+i+" value="+name+" data-bs-toggle='modal' data-bs-target='#staticBackdrop'>"+i+"</button>"+tdend;
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
}

//-------delete day calder-------
const Delday = document.getElementById('Delday');
Delday.addEventListener('click',(e)=>{
    remove(ref(db,"TimeShop/"+importyear+"/"+montha+"/"+dayb),{})
    console.log("ลบ "+montha,dayb,importyear);
    document.getElementById(dayb).classList.remove("btn-success");
    document.getElementById(dayb).classList.add("btn-light");
});

//-------saveCalder----------
const Subday = document.getElementById('Subday');
Subday.addEventListener('click',(e)=>{
  set(ref(db,"TimeShop/"+importyear+"/"+montha+"/"+dayb),{
    shop : "open"
  })
  setTimeout
  editbtn();
});

//--------เก็บค่าจาก id------
const submit = document.getElementById('sub_btn');

//---------assign the events-------
submit.addEventListener('click',SaveDay);

// save day
const TimeMonth = document.getElementById("TimeMonth");
const TimeYear = document.getElementById("TimeYear");
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
  if(TimeMonth.value == "เดือน" || TimeYear.value == "ปี"){
    alert("กรุณาระบุเดือน และปี");
    return;
  }
  let n = new Date(name+","+years);
  for(var i = 1;i <= numday;i++){
    n.setDate(i);
    var x = parseInt(n.getDay());
    console.log(x);
    if(x == Sunday() || x == Monday() || x == Tuesday() || x == Wednesday() || x == Thursday() || x == Firday() || x == Saturday()){
      update(ref(db,"TimeShop/"+TimeYear.value+"/"+TimeMonth.value+"/"+i),
        {
          shop : "open"
        })
    }
    if(x != Sunday() && x != Monday() && x != Tuesday() && x != Wednesday() && x != Thursday() && x != Firday() && x != Saturday()){
      remove(ref(db,"TimeShop/"+TimeYear.value+"/"+TimeMonth.value+"/"+i),{})
      document.getElementById(i).classList.remove("btn-success");
      document.getElementById(i).classList.add("btn-light");
    }
    console.log(Sunday()+" "+Monday()+" "+Tuesday()+" "+Wednesday()+" "+Thursday()+" "+Firday()+" "+Saturday());
  }
  editbtn();
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
          document.getElementById(x).classList.remove("btn-light");
          document.getElementById(x).classList.add("btn-success");
        }
      }
      //console.log(i);
      i--;
    }
    //console.log(keyday);
  }, {
    onlyOnce: true
  });
}

//---------ตรวจสอบวันที่---------
const btndetail = document.getElementById('btndetail');
btndetail.addEventListener('click',CloseOpentext);
function CloseOpentext(){
  const dbReff = ref(db,"TimeShop/"+years+"/"+name);
  onValue(dbReff,(snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      if(childKey == dayb){
        console.log(childData);
        document.getElementById('opentime').innerText = "สถานะ "+childData.shop;
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
});
Celday1.addEventListener('click',(e)=>{
  document.getElementById('opentime').innerText = "";  
});
Delday.addEventListener('click',(e)=>{
  document.getElementById('opentime').innerText = "";  
});










