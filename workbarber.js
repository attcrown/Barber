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

const datenow = new Date();
let datenum = datenow.getDate();
let month = datenow.getMonth()+1;
if(month < 10){
    month = "0"+month;
}
if(datenum < 10){
    datenum = "0"+datenum;
}
let year = datenow.getFullYear();
let datesub = year+"-"+month+"-"+datenum;
document.getElementById('datenow').innerHTML = "Date "+datesub;
//--------เก็บค่าจาก id------
const dbRefuser = ref(db,'userLineliff/'); 
const dbReff = ref(db);


//----------show-------
showdata();
function showdata(){
  $('#table td').remove();
  var rowNum = 0; 
  onValue(dbRefuser,(snapshot)=>{ //--อ่านฐานข้อมูล----
    snapshot.forEach((childSnapshot)=>{
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      // if(childData.summinute != ""){
      if(childData.perple == pullnames && childData.summinute != "" && childData.date == datesub){
        rowNum += 1;       
        var iduser = childKey;        
        var row = "<tr><td>" + rowNum + "</td><td>" + childData.time + 
        "</td><td>" + childData.name + "</td><td>" + childData.perple + 
        "</td><td><button class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#exampleModal' id='"+childData.name+"' value="
        + iduser + " style='--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;' onclick='CancelQ(id,value)'>ยกเลิกคิว</button></td></tr>";
      }
      $(row).appendTo('#table');             
      });

      //--------Function Popup ปุ่มลบ
      document.getElementById('ConfirmDel').addEventListener('click',(e)=>{
        get(child(dbReff,"userLineliff/"+ deluserid)).then(function(snapshot){
          if(snapshot.exists){
            update(ref(db,"userLineliff/"+ deluserid),{
              summinute : ""
            }).then(function(){
              setTimeout(() => {
                document.location.reload();
              }, 500);
              return;
            });
          } else{alert("ไม่เจอข้อมูล UserID");}
        })
      });     
  }, 
  {
    onlyOnce: true
  });
}

//----namebarber Value-----
const btnaddtime = document.getElementById('btnaddtime');
const nameuser = document.getElementById('nameuser');
const yearq = document.getElementById('yearqbarber');
const monthq = document.getElementById('monthqbarber');
const dayq = document.getElementById('dayqbarber');
const timeq = document.getElementById('timeqbarber');
let sumday;
btnaddtime.addEventListener('click',(e)=>{
  const value = document.getElementById('namebarber');
  let sum = `<option value="${pullnames}">${pullnames}</option>`;
  value.innerHTML = sum;
  value.disabled = true;

  //---Qtime-----
  const dbReftime = ref(db,"TimeBarber/"+pullnames);//'TimeBarber/'+pullnames+"/2023"+"/February");
  let sum1 = `<option selected>ปี</option>`;
    onValue(dbReftime,(snapshot)=>{
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        sum1 += `<option value="${childKey}">${childKey}</option>` 
      });
      yearq.innerHTML = sum1;
    },{
        onlyOnce: true
      });
});

nameuser.addEventListener('input',(e)=>{
  yearq.disabled = false;
})

yearq.addEventListener('change',(e)=>{
  let sum2 = `<option selected>เดือน</option>`;
  onValue(ref(db,"TimeBarber/"+pullnames+"/"+yearq.value),(snapshot)=>{
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      console.log(childKey);
      sum2 += `<option value="${childKey}">${childKey}</option>` 
    });
    monthq.innerHTML = sum2;
  },{
      onlyOnce: true
    });
  monthq.disabled = false;
})

monthq.addEventListener('change',(e) => {
  let sum3 = `<option selected>วัน</option>`;
  onValue(ref(db,"TimeBarber/"+pullnames+"/"+yearq.value+"/"+monthq.value),(snapshot)=>{
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      console.log(childKey);
      sum3 += `<option value="${childKey}">${childKey}</option>` 
    });
    dayq.innerHTML = sum3;
  },{
      onlyOnce: true
    });
  dayq.disabled = false;
})

let havetimer;
havetimer = await havetimes();

async function havetimes(){
  let time = []; 
  await get(child(dbRef,"userLineliff")).then((snapshot) => {
    const childData = snapshot.val(); 
    Object.keys(childData).forEach(function(key) { 
          if(sumday == childData[key].date && childData[key].summinute != ""){
            time.push(childData[key].time.substring(0,2)+"."+childData[key].time.substring(3,5));
          }
    })
  });
  return time; 
}

dayq.addEventListener('change',async (e)=>{
  timeq.disabled = false;
  sumday = yearq.value+"-"+nummonth(monthq.value)+"-"+numday(dayq.value);
  havetimer = await havetimes();
  console.log(sumday);
  console.log(havetimer);
  get(child(dbRef,"TimeBarber/"+pullnames+"/"+yearq.value+"/"+monthq.value+"/"+dayq.value)).then((snapshot)=>{
  const data = snapshot.val();
  timeq.innerHTML = Timesum(data.StartWork,data.StopWork,data.StartBreak,data.StopBreak);
  })
});

//-----TimeWorkBarber-------
function Timesum(StartWork,StopWork,StartBreak,StopBreak){
  let TStart = 0;
  let TStop = 0;
  let TStartB = 0;
  let TStopB = 0;
  let sum44 = `<option selected>เลือกเวลา</option>`;
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
    if(x == TStartB && x<TStopB){
      TStartB++;
    }
    else if(havetimer.includes(arrayTime[x])){
      console.log("เวลาซ้ำ");
    }
    else{
      sum44 += `<option value="${arrayTime[x]}">${arrayTime[x]} น.</option>`;
    }
  } 
  return sum44;
}

//------save---------
const submit = document.getElementById('submit');
submit.addEventListener('click',(e)=>{
  let key = new Date().getTime();
  if(nameuser.value == "" || yearq.value == "ปี" || monthq.value == "เดือน"
  || dayq.value == "วัน" || timeq.value == "เลือกเวลา"){
    alert("กรุณาระบุข้อมูลให้ถูกต้อง");
  }else{
    set(ref(db,"userLineliff/"+key),{
      date : sumday,
      name : nameuser.value,
      perple : pullnames,
      summinute : key,
      time : timeq.value.substring(0,2)+":"+timeq.value.substring(3,5)
    }).then(() => {
      console.log("Data saved successfully!");
      setTimeout(()=>{
        document.location.reload();
      },300);
    })
    .catch((error) => {
      console.log("Error SAVE");
    });
  }
  
})

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
    if(numm < 10){
      numm = "0"+numm;
    }
    return numm;
}

function numday(a){
  if(a < 10){
    a = "0"+a;
  }
  return a;
}