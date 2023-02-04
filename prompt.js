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
const baths = document.getElementById('bathprompt');
const phonenum = document.getElementById('phonenum');
//Prompt check Data and Edit text
get(child(dbRef,"Promptpay")).then((snapshot) => {
    if (snapshot.exists()) {
        baths.placeholder = `${snapshot.val().bath} ฿`;
        phonenum.placeholder = `${snapshot.val().numberPromptpay}`;
    } else {
        console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  //Save data
  const save = document.getElementById('submit');
  save.addEventListener('click',(e)=>{
    if(!Validation()){
        return;
    }
    set(ref(db,"Promptpay"),{
        bath : baths.value, //100
        numberPromptpay : phonenum.value //0861515202
    }).then(()=>{
        setTimeout(()=>{
          document.location.reload();
        },300);
    });
  })

  //----------alert------------
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
  }


  //----ตรวจสอบข้อมูล-----
  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }
  function Validation(){
    let bathsregex = /^[0-9]+$/;
    let numregex = /^[0-9]{10,10}$/;

    if(isEmptyOrSpaces(baths.value) || isEmptyOrSpaces(phonenum.value)){
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง",'danger');
      return false;
    }
    if(!bathsregex.test(baths.value)){
      alert("กรุณาใส่ราคาที่เป็นตัวเลข",'danger');
      return false;
    }
    if(!numregex.test(phonenum.value)){
      alert("กรุณาใส่เบอร์โทรที่เป็นตัวเลข 10 หลัก",'danger');
      return false;
    }
    return true;
  }

  //------Confirm Save-----
  const con = document.getElementById("confirmpop");
  con.addEventListener('click',(e)=>{
    if(baths.value == ""){
      document.getElementById('bathcon').innerText = "กรุณาใส่ราคาเงินมัดจำ";
    }else{document.getElementById('bathcon').innerText = "ราคามัดจำ "+baths.value+" บาท";}
    if(phonenum.value == ""){
      document.getElementById('numcon').innerText = "กรุณาใส่เบอร์โทรศัพท์";
    }else{document.getElementById('numcon').innerText = "เบอร์โทรศัพท์ "+phonenum.value;}
    
  })

  

 