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
const Userid = document.getElementById("Userid")
const Passid = document.getElementById("Passid")

//------------ Link Firebase เข้ากับแอพ------------
async function getEmployees(database){
  const empCol = collection(database,'employees')
  const empDocument =getDocs(empCol)
  return empDocument
}

//ตรวจสอบรหัส
function myFunction(){
    if(Userid == "admin" || Passid == "admin"){
      var x = 10;
      document.getElementById("x").innerHTML = x;
    }
}


  


