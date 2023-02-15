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
const dbRef = ref(db);
const datenow = new Date();
let datenum = datenow.getDate();
let month = datenow.getMonth()+1;
let year = datenow.getFullYear();
if(month < 10){
  month = "0"+month;
}
if(datenum < 10){
  datenum = "0"+datenum;
}
let datesub = year+"-"+month+"-"+datenum;
//document.getElementById('datenow').innerHTML = "Date "+datesub;
const arrayTimeshow = ["00:00","00:30","01:00","01:30","02:00","02:30","03:00"
                  ,"03:30","04:00","04:30","05:00","05:30","06:00","06:30"
                  ,"07:00","07:30","08:00","08:30","09:00","09:30","10:00"
                  ,"10:30","11:00","11:30","12:00","12:30","13:00","13:30"
                  ,"14:00","14:30","15:00","15:30","16:00","16:30","17:00"
                  ,"17:30","18:00","18:30","19:00","19:30","20:00","20:30"
                  ,"21:00","21:30","22:00","22:30","23:00","23:30"];
const arrayTimeDayshow = ['01','02','03','04','05','06','07','08','09','10'
                          ,'11','12','13','14','15','16','17','18','19','20'
                          ,'21','22','23','24','25','26','27','28','29','30','31'];                  
const arrayTimeMonthshow = ['01','02','03','04','05','06','07','08','09'
                            ,'10','11','12'];

                           
async function showdataall(){
    document.getElementById("timeqq").innerText = "วันที่";
    document.getElementById("nameuserqq").innerText = "เวลา";
    document.getElementById("namebarberqq").innerText = "ลูกค้า";
    let check = [];
    let edname;
    for(let m = 0;m<arrayTimeMonthshow.length; m++){
      check[m] = [];
      for(let d = 0; d<arrayTimeDayshow.length; d++){
        check[m][d] = [];
        for(let t = 0;t<arrayTimeshow.length;t++){
          check[m][d][t] = [];
        }
      }
    }
    var rowNum = 0;
    var row;
    //let now= Number.parseInt(datesub.substring(8,10));
    await get(child(dbRef,"booking/")).then((snapshot) => {
      const childData = snapshot.val(); 
      Object.keys(childData).forEach(function(key) { 
        if(childData[key].summinute != "" && childData[key] != "" 
        && childData[key].name != undefined){
          if(childData[key].name.length > 6){
            edname = childData[key].name.substring(0,5) + "...";
          }else{edname = childData[key].name}
          for(let m = 0; m<arrayTimeMonthshow.length; m++){
            if(childData[key].date.substring(5,7) == arrayTimeMonthshow[m]){
              for(let i = 0; i<arrayTimeDayshow.length; i++){
                if(childData[key].date.substring(8,10) == arrayTimeDayshow[i]){
                  for(let o = 0; o<arrayTimeshow.length; o++){
                    if(childData[key].time == arrayTimeshow[o]){             
                      check[m][i][o].push(`<td>${childData[key].date} 
                      </td><td>${childData[key].time}</td><td>${edname} 
                      </td><td><button class='btn btn-success' data-bs-toggle='modal' 
                      data-bs-target='#exampleModal' 
                      id='${childData[key].name}' 
                      value='${key}' 
                      style='--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; 
                      --bs-btn-font-size: .75rem;'
                      onclick='CancelQ(id,value)'>ข้อมูล</button></td></tr>`);                  
                    }else{}                                          
                  }                
                }   
              }
            }           
          }
        }
      });
      //--------Function Popup ปุ่มลบ
    document.getElementById('ConfirmDel').addEventListener('click',(e)=>{
        get(child(dbRef,"booking/"+deluserid)).then(async function(snapshot){
            const datauserid = snapshot.val();
            if(snapshot.exists){
              await update(ref(db,"booking/"+ deluserid),{
                summinute : ""
              });
              await remove(ref(db,"Table/"+datauserid.perple+"/"+datauserid.date+"/"+datauserid.time),{            
              });
              location.reload();
              return;            
            } else{alert("ไม่เจอข้อมูล UserID");}
          })
        });               
      });
      function numberQQ(){
        $('#table td').remove();     
            for(let m =0; m<check.length; m++){
                if(check[m] != null && check[m] != ""){
                    for(let k =0; k<check[m].length; k++){
                        if(check[m][k] != null && check[m][k] != ""){
                            for(let p = 0; p <check[m][k].length; p++){              
                                if(check[m][k][p] != null && check[m][k][p] != ""){
                                    for(let q = 0; q <check[m][k][p].length; q++){
                                        rowNum++;
                                        row = `<tr><td>${rowNum}</td>`+check[m][k][p][q];
                                        $(row).appendTo('#table');
                                    }               
                                }
                            }
                        }        
                    }  
                }        
            }   
        }
    numberQQ();
}
showdataall(); 

//------save---------
const submit = document.getElementById('submit');
submit.addEventListener('click',(e)=>{
  let key = new Date().getTime();
  let sumtime = timeq.value.substring(0,2)+":"+timeq.value.substring(3,5);
  if(nameuser.value == "" || yearq.value == "ปี" || monthq.value == "เดือน"
  || dayq.value == "วัน" || timeq.value == "เลือกเวลา"){
    alert("กรุณาระบุข้อมูลให้ถูกต้อง");
  }else{
    set(ref(db,"booking/"+key),{
      date : sumday,
      name : nameuser.value,
      perple : value.value,
      summinute : key,
      time : sumtime,
      phoneNumber : phoneq.value
    }).catch((error) => {
      console.log("Error SAVE");
    });
    update(ref(db,"Table/"+value.value+"/"+sumday+"/"+sumtime),{
      perple : nameuser.value
    }).then(() => {
      console.log("Data saved successfully!");
      location.reload();
    }).catch((error) => {
      console.log("Error SAVE Table");
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

  //-----detail img------
document.getElementById('popuplink').addEventListener('click',(e)=>{
    get(child(dbRef,"booking/"+deluserid)).then(function(snapshot){
      const v = snapshot.val();
      console.log(v);
      document.getElementById('textbarberpopup').innerText = `ชื่อช่าง : ${v.perple}`;
      document.getElementById('popupdate').innerText = `เวลาการจอง : ${v.time}`;
      document.getElementById('popupdateq').innerText = `วันที่จอง : ${v.date}`;
      if(v.encodedImage != "" && v.encodedImage != undefined 
      && v.encodedImage != null && v.name == delname){
        document.getElementById('slipmoney').src = v.encodedImage;
      }else{
        document.getElementById('slipmoney').src = "images/Noimage.jpg";
      }
      if(v.phoneNumber == "" || v.phoneNumber == undefined){
          document.getElementById('phonenumber').innerText = `เบอร์โทรศัพท์ : ไม่มีข้อมูล`;
      }else{
          document.getElementById('phonenumber').innerText = `เบอร์โทรศัพท์ : ${v.phoneNumber}`;
      }
    })
  });
  
  document.getElementById('closepopup').addEventListener('click',(e)=>{
    document.getElementById('textbarberpopup').innerText = "";
    document.getElementById('slipmoney').src = "";
    document.getElementById('popupdate').innerText = "";
    document.getElementById('phonenumber').innerText = "";
    document.getElementById('popupdateq').innerText = "";
  })
  
  document.getElementById('btnclosepopup').addEventListener('click',(e)=>{
    document.getElementById('textbarberpopup').innerText = "";
    document.getElementById('slipmoney').src = "";
    document.getElementById('popupdate').innerText = "";
    document.getElementById('phonenumber').innerText = "";
    document.getElementById('popupdateq').innerText = "";
  })
  
  document.getElementById('ConfirmDel').addEventListener('click',(e)=>{
    document.getElementById('textbarberpopup').innerText = "";
    document.getElementById('slipmoney').src = "";
    document.getElementById('popupdate').innerText = "";
    document.getElementById('phonenumber').innerText = "";
    document.getElementById('popupdateq').innerText = "";
  })
  
  document.getElementById('closepopup2').addEventListener('click',(e)=>{
    document.getElementById('textbarberpopup').innerText = "";
    document.getElementById('slipmoney').src = "";
    document.getElementById('popupdate').innerText = "";
    document.getElementById('phonenumber').innerText = "";
    document.getElementById('popupdateq').innerText = "";
  })
  
  document.getElementById('btnclosepopup2').addEventListener('click',(e)=>{
    document.getElementById('textbarberpopup').innerText = "";
    document.getElementById('slipmoney').src = "";
    document.getElementById('popupdate').innerText = "";
    document.getElementById('phonenumber').innerText = "";
    document.getElementById('popupdateq').innerText = "";
  })