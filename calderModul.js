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

var sum;  
const d = new Date();
let years = d.getFullYear();
var numday = numdayy(d.getMonth());
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

function numdayy(a){
  let sum;
  if(a == 1){
    let feb = years % 4;
    if(feb == 0){
      sum = 29;
    }else{sum = 28;}
  }else if(a == 0 || a == 2 || a == 4 
    || a == 6 || a == 7 || a == 9 
    || a == 11){
    sum = 31;
  }else if(a == 3 || a == 5 || a == 8 
    || a == 10){
    sum = 30;
  }
  return sum;
}
         
  if(d.getDay() > 0){
    for(let i = 0;i<d.getDay();i++){
      sum += tdclass+tdend; 
    }
  }
  for(let i = 1; i<=numday; i++){
    sum += td+"<button type='button' class='btn btn-light btn-sm btn-circle opacity-75' style='font-size:15px' onclick='showdaycal(value,id)' id="+i+" value="+name+" data-bs-toggle='modal' data-bs-target='#staticBackdrop' disabled >"+i+"</button>"+tdend;
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
  document.getElementById('TimeMonth').value = name;
  document.getElementById('TimeYear').value = years;
  numday = numdayy(a);
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
  document.getElementById('TimeMonth').value = name;
  document.getElementById('TimeYear').value = years;
  numday = numdayy(a);
  dateday();
});

//----select month years
document.getElementById('TimeMonth').addEventListener('change',(e)=>{
  if(document.getElementById('TimeMonth').value == "เดือน" || document.getElementById('TimeYear').value == "ปี"){
    return;
  }
  name = document.getElementById('TimeMonth').value;
  years = document.getElementById('TimeYear').value;
  MonthYear.innerHTML = name+" "+years;
  dateday();
});
document.getElementById('TimeYear').addEventListener('change',(e)=>{
  if(document.getElementById('TimeMonth').value == "เดือน" || document.getElementById('TimeYear').value == "ปี"){
    return;
  }
  name = document.getElementById('TimeMonth').value;
  years = document.getElementById('TimeYear').value;
  MonthYear.innerHTML = name+" "+years;
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
    sum += td+"<button type='button' class='btn btn-light btn-sm btn-circle opacity-75' onclick='showdaycal(value,id)' id="+i+" value="+name+" data-bs-toggle='modal' data-bs-target='#staticBackdrop' disabled>"+i+"</button>"+tdend;
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
    //------แปลงเดือนเป็นตัวเลข-----
    let numm = nummonth(montha);
    let nameday = numdayfull(importyear,numm,dayb);
    remove(ref(db,"TimeฺBarber/"+pullnames+"/"+importyear+"/"+montha+"/"+dayb),{});
    remove(ref(db,"TimeQBarber/"+nameday+"/"+pullnames),{});
    delQbarber(nameday,pullnames);
    console.log("ลบ "+montha,dayb,importyear);
    console.log("ลบ "+"TimeQBarber/"+nameday+"/"+pullnames);
    document.getElementById(dayb).classList.remove("btn-info");
    document.getElementById(dayb).classList.add("btn-success","opacity-75");
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
  });

  let numm = nummonth(montha);
  let nameday = numdayfull(importyear,numm,dayb);
  saveTimeQ(nameday,pullnames);
  Timesum(nameday,pullnames,editStartWork.value,editStopWork.value,editStartBreak.value,editStopBreak.value);
  editbtnbarber();
});

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
  //------แปลงเดือนเป็นตัวเลข-----
  let numm = nummonth(TimeMonth.value);
  let n = new Date(TimeMonth.value+","+TimeYear.value);
  let nameday;
  for(var i = 1;i <= numday;i++){
    nameday = numdayfull(TimeYear.value,numm,i);
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
        });
      saveTimeQ(nameday,pullnames);  
      //---pushTimeWorkBarber----
      Timesum(nameday,pullnames,StartWork.value,StopWork.value,StartBreak.value,StopBreak.value);
    }
    else if(x != Sunday() && x != Monday() && x != Tuesday() && x != Wednesday() && x != Thursday() && x != Firday() && x != Saturday()){
      remove(ref(db,"TimeฺBarber/"+pullnames+"/"+TimeYear.value+"/"+TimeMonth.value+"/"+i),{});
      remove(ref(db,"TimeQBarber/"+nameday+"/"+pullnames),{});
      delQbarber(nameday,pullnames);
      document.getElementById(i).classList.remove("btn-info");
      document.getElementById(i).classList.add("btn-success","opacity-75");
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
          document.getElementById(x).classList.remove("btn-success","opacity-75");
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
      if(childKey == dayb){
        console.log(childData);
        document.getElementById('opentime').innerText = "เข้างาน "+childData.StartWork+"น.";
        document.getElementById('closetime').innerText = "ออกงาน "+childData.StopWork+"น.";
        document.getElementById('Breakstart').innerText = "เริ่มพัก "+childData.StartBreak+"น.";
        document.getElementById('Breakstop').innerText = "หยุดพัก "+childData.StopBreak+"น.";
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


//-----TimeWorkBarber-------
function Timesum(name,namebarber,StartWork,StopWork,StartBreak,StopBreak){
  console.log(`${name} ${namebarber} เริ่มงาน${StartWork} หยุดงาน${StopWork} เริ่มพัก${StartBreak} หยุดพัก${StopBreak}`);
  let TStart = 0;
  let TStop = 0;
  let TStartB = 0;
  let TStopB = 0;
  const arrayTime = ["00.00","00.30","01.00","01.30","02.00","02.30","03.00"
                  ,"03.30","04.00","04.30","05.00","00.30","06.00","06.30"
                  ,"07.00","07.30","08.00","08.30","09.00","09.30","10.00"
                  ,"10.30","11.00","11.30","12.00","12.30","13.00","13.30"
                  ,"14.00","14.30","15.00","15.30","16.00","16.30","17.00"
                  ,"17.30","18.00","18.30","19.00","19.30","20.00","20.30"
                  ,"21.00","21.30","22.00","22.30","23.00","23.30"];
  for(let x = 0; x<arrayTime.length; x++){
    if(StartWork == arrayTime[x]){
        TStart = x;
    }
  }
  for(let x = 0; x<arrayTime.length; x++){
    if(StopWork == arrayTime[x]){
        TStop = x;
    }
  }
  for(let x = 0; x<arrayTime.length; x++){
    if(StartBreak == arrayTime[x]){
        TStartB = x;
    }
  }
  for(let x = 0; x<arrayTime.length; x++){
    if(StopBreak == arrayTime[x]){
        TStopB = x;
    }
  }

  for(let x = TStart ;x<=TStop ;x++){
    update(ref(db,"TimeQBarber/"+name+"/"+namebarber+"/"),{
      [`t${x}`] : arrayTime[x].substring(0,2)+":"+arrayTime[x].substring(3,5)
    })
  }
  for(let x = TStartB ;x<TStopB ;x++){
    remove(ref(db,"TimeQBarber/"+name+"/"+namebarber+"/"+"t"+x),{
      [`t${x}`] : arrayTime[x].substring(0,2)+":"+arrayTime[x].substring(3,5)
    })
  }
}

//-----function แปลงเดือนเป็นตัวเลข
function nummonth(a){
  let numm;
    for(let x = 0; x<11; x++){
      var m = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      if(a === m[x]){
        numm = x;
        numm++;
      }
    }
    return numm;
}

function numdayfull(year,month,day){
  let namedayfulls;
  if(day<10 && month<10){
    namedayfulls = year+"-"+"0"+month+"-"+"0"+day;
  } else if(day<10 && month>10){
    namedayfulls = year+"-"+month+"-"+"0"+day;
  } else if(day>10 && month<10){
    namedayfulls = year+"-"+"0"+month+"-"+day;
  } else if(day<10 && month==10){
    namedayfulls = year+"-"+month+"-"+"0"+day;
  } else if(day==10 && month<10){
    namedayfulls = year+"-"+"0"+month+"-"+day;
  }else{
    namedayfulls = year+"-"+month+"-"+day;
  } 
  return namedayfulls;
}

function saveTimeQ(nameday,pullnames){
  const uname = [],bkey = []; 
  get(child(dbRef,"TimeQBarber/"+nameday+"/nBarber/")).then(function(snapshot){
  if(snapshot.val() == null){
    update(ref(db,"TimeQBarber/"+nameday+"/nBarber/"),{
      b1 : pullnames
    })
    console.log("ผ่าน");
    return;
  }else{      
    get(child(dbRef,"TimeQBarber/"+nameday+"/nBarber/")).then((snapshot) => {
      var childData = snapshot.val(); 
      Object.keys(childData).forEach(function(key){ 
        uname.push(childData[key]);
        bkey.push([key]);         
      });  
      if(uname.includes(pullnames)){
        return;
      }else{
        var keys = ["b1","b2","b3","b4","b5","b6","b7","b8","b9","b10"];
        for(let x = 0; x<keys.length; x++){ 
          if(!bkey.map(e => e[0]).includes(keys[x])){//(!bkey.includes(keys[x])){
            update(ref(db,"TimeQBarber/"+nameday+"/nBarber/"),{
              [keys[x]] : pullnames
            })
            console.log("ผ่าน");
            return;
          }else{
            console.log("ไม่ผ่าน");
          }
        }
      }
    }); 
    }
  })
}

function delQbarber(nameday,pullnames){
  const uname = [],bkey = []; 
  get(child(dbRef,"TimeQBarber/"+nameday+"/nBarber/")).then((snapshot) => {
    var childData = snapshot.val(); 
    Object.keys(childData).forEach(function(key){ 
      uname.push(childData[key]);
      bkey.push([key]);      
    }); 
      for(let x = 0;x<uname.length;x++){
        if(uname[x] == (pullnames)){//(!bkey.includes(keys[x])){
          remove(ref(db,"TimeQBarber/"+nameday+"/nBarber/"+bkey[x]),{})
          console.log("ผ่าน");
          return;
        }else{
          console.log("ไม่ผ่าน");
        }
      }        
  }); 
}





